/**
 * VANTORA DIGITAL — Meta Conversions API relay (Cloudflare Worker)
 *
 * The website sends each Pixel event here with the same event_id, and this
 * Worker forwards it to Meta server-side so Meta can deduplicate the two.
 *
 * Settings (Worker → Settings → Variables and Secrets):
 *   PIXEL_ID          1438216061823650           (Text)
 *   META_ACCESS_TOKEN <token from Events Manager> (Secret — never put it in the website code)
 *   ALLOWED_ORIGINS   https://vantoradigital.info,https://www.vantoradigital.info (Text)
 *   TEST_EVENT_CODE   TEST12345  (optional Text — only while testing in Events Manager → Test events)
 */

const GRAPH_VERSION = 'v21.0';
const ALLOWED_EVENTS = new Set(['PageView', 'Lead', 'Contact', 'ViewContent', 'Schedule']);

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || 'https://vantoradigital.info,https://www.vantoradigital.info')
      .split(',').map((s) => s.trim());
    const okOrigin = allowed.includes(origin);
    const cors = {
      'Access-Control-Allow-Origin': okOrigin ? origin : allowed[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin',
    };

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });
    if (!okOrigin) return new Response('Forbidden', { status: 403, headers: cors });
    if (!env.PIXEL_ID || !env.META_ACCESS_TOKEN) return new Response('Not configured', { status: 500, headers: cors });

    let body;
    try {
      const text = await request.text();
      if (text.length > 8000) throw new Error('too large');
      body = JSON.parse(text);
    } catch {
      return new Response('Bad request', { status: 400, headers: cors });
    }

    const eventName = String(body.event_name || '');
    if (!ALLOWED_EVENTS.has(eventName) || !body.event_id) {
      return new Response('Bad event', { status: 400, headers: cors });
    }

    // Only accept event_source_url from our own site.
    let sourceUrl = String(body.event_source_url || origin);
    try { if (!allowed.includes(new URL(sourceUrl).origin)) sourceUrl = origin; } catch { sourceUrl = origin; }

    const userData = {
      client_ip_address: request.headers.get('CF-Connecting-IP') || undefined,
      client_user_agent: request.headers.get('User-Agent') || undefined,
      fbp: typeof body.fbp === 'string' ? body.fbp : undefined,
      fbc: typeof body.fbc === 'string' ? body.fbc : undefined,
    };

    const customData = {};
    if (body.custom_data && typeof body.custom_data === 'object') {
      for (const [k, v] of Object.entries(body.custom_data)) {
        if (['string', 'number', 'boolean'].includes(typeof v)) customData[k] = v;
      }
    }

    const payload = {
      data: [{
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: String(body.event_id).slice(0, 100),
        action_source: 'website',
        event_source_url: sourceUrl,
        user_data: userData,
        custom_data: customData,
      }],
    };
    if (env.TEST_EVENT_CODE) payload.test_event_code = env.TEST_EVENT_CODE;

    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${env.PIXEL_ID}/events?access_token=${encodeURIComponent(env.META_ACCESS_TOKEN)}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) },
    );
    const out = await res.text();
    return new Response(out, { status: res.status, headers: { ...cors, 'Content-Type': 'application/json' } });
  },
};
