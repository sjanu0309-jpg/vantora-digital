import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site, asset } from '../config/site';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Page-specific title, description, canonical URL and Open Graph tags. */
export function useSeo(title: string, description: string, opts: { noindex?: boolean } = {}) {
  const { pathname } = useLocation();
  useEffect(() => {
    const full = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`;
    const url = `${site.domain}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', opts.noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', `${site.domain}/og-image.jpg`);
    setMeta('name', 'twitter:title', full);
    setMeta('name', 'twitter:description', description);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, pathname, opts.noindex]);
}

export { asset };
