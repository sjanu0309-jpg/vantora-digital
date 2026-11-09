declare global {
  interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void; fbq?: (...args: unknown[]) => void }
}

let loaded = false;
/** Google Analytics 4 — loaded only after consent and only if VITE_GA_ID is set. */
export function loadAnalytics(id: string) {
  if (loaded || !id) return;
  loaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
}

/* ---------- Meta Pixel + Conversions API (deduplicated) ---------- */

/** Cloudflare Worker URL that forwards events to Meta Conversions API (optional). */
const CAPI_URL = import.meta.env.VITE_META_CAPI_URL as string | undefined;

function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

/** _fbc from the cookie, or built from ?fbclid= when the cookie isn't set yet. */
function getFbc(): string | undefined {
  const c = readCookie('_fbc');
  if (c) return c;
  const fbclid = new URLSearchParams(location.search).get('fbclid');
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

/** Sends one event to both Meta Pixel (browser) and Conversions API (server) with the same eventID. */
function sendMetaEvent(eventName: string, customData: Record<string, unknown> = {}) {
  const eventId = newEventId();
  window.fbq?.('track', eventName, customData, { eventID: eventId });
  if (!CAPI_URL) return;
  // Small delay so fbevents.js can set the _fbp cookie on the very first page load.
  setTimeout(() => {
    try {
      fetch(CAPI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' }, // simple request: no CORS preflight
        keepalive: true,
        body: JSON.stringify({
          event_name: eventName,
          event_id: eventId,
          event_source_url: location.href,
          fbp: readCookie('_fbp'),
          fbc: getFbc(),
          custom_data: customData,
        }),
      }).catch(() => {});
    } catch { /* ignore */ }
  }, 800);
}

/** Meta Pixel standard events matching our GA4 event names. */
const META_EVENTS: Record<string, string> = { generate_lead: 'Lead' };

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  window.gtag?.('event', name, params);
  const metaEvent = META_EVENTS[name];
  if (metaEvent) sendMetaEvent(metaEvent, params);
}

/** Meta PageView — called on first load and on every client-side route change. */
export function trackPageView() {
  sendMetaEvent('PageView');
}
