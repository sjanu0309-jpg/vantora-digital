declare global {
  interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void }
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

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  window.gtag?.('event', name, params);
}
