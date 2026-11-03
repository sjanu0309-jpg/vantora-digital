import { site } from '../config/site';

export interface LeadPayload {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  country: string;
  industry: string;
  service: string;
  budget: string;
  website: string;
  details: string;
  contactPreference: string;
  /** honeypot — must be empty */
  website_hp: string;
  pageUrl: string;
  leadSource: string;
  elapsedMs: number;
}

export type SubmitResult = { ok: true; leadId?: string } | { ok: false; error: string };

/**
 * Sends the enquiry to the Google Apps Script Web App.
 * Uses `text/plain` so the browser sends a "simple" CORS request (no preflight,
 * which Apps Script cannot answer). Apps Script responds via a redirect to
 * googleusercontent.com, which returns the JSON with permissive CORS headers.
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; leadId?: string; error?: string } | null;
    if (res.ok && data?.ok) return { ok: true, leadId: data.leadId };
    return { ok: false, error: data?.error || 'The server could not process your request.' };
  } catch (e) {
    return { ok: false, error: (e as Error).name === 'AbortError' ? 'The request timed out.' : 'Please check your internet connection.' };
  } finally {
    clearTimeout(timer);
  }
}
