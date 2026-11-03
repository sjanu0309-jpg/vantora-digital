import { site } from '../config/site';

const paths = {
  facebook: 'M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z',
  linkedin: 'M6.9 8.6H3.6V20h3.3V8.6zM5.3 3.5a1.9 1.9 0 100 3.8 1.9 1.9 0 000-3.8zM20.4 13.6c0-3.1-1.7-5.2-4.5-5.2-1.5 0-2.6.8-3 1.6V8.6H9.7V20H13v-5.9c0-1.5.6-2.6 2-2.6s1.9 1.1 1.9 2.6V20h3.4l.1-6.4z',
  instagram: 'M12 7.3a4.7 4.7 0 100 9.4 4.7 4.7 0 000-9.4zm0 7.7a3 3 0 110-6 3 3 0 010 6zm6-7.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0zM21 8c-.1-1.6-.4-3-1.6-4.2S16.6 2.1 15 2c-1.7-.1-6.4-.1-8 0-1.6.1-3 .4-4.2 1.6S1.1 6.4 1 8c-.1 1.7-.1 6.4 0 8 .1 1.6.4 3 1.6 4.2S5.4 21.9 7 22c1.7.1 6.4.1 8 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.7.1-6.3.2-8zm-2.2 9.8a3.2 3.2 0 01-1.8 1.8c-1.3.5-4.3.4-5.6.4s-4.4.1-5.6-.4a3.2 3.2 0 01-1.8-1.8c-.5-1.3-.4-4.3-.4-5.6s-.1-4.4.4-5.6a3.2 3.2 0 011.8-1.8C7 4.3 10 4.4 11.4 4.4s4.4-.1 5.6.4a3.2 3.2 0 011.8 1.8c.5 1.3.4 4.3.4 5.6s.1 4.4-.4 5.6z',
  google: 'M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 01-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3zM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0012 22zM6.4 14a6 6 0 010-3.9V7.5H3.1a10 10 0 000 9L6.4 14zM12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 003.1 7.5L6.4 10C7.2 7.7 9.4 6 12 6z',
};

export function SocialIcon({ name }: { name: keyof typeof paths }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d={paths[name]} />
    </svg>
  );
}

export function SocialLinks({ className = '' }: { className?: string }) {
  const items = [
    { key: 'facebook' as const, url: site.social.facebook, label: 'Facebook' },
    { key: 'instagram' as const, url: site.social.instagram, label: 'Instagram' },
    { key: 'linkedin' as const, url: site.social.linkedin, label: 'LinkedIn' },
    { key: 'google' as const, url: site.social.googleBusiness, label: 'Google Business Profile' },
  ].filter((i) => i.url);
  return (
    <ul className={`socials ${className}`}>
      {items.map((i) => (
        <li key={i.key}>
          <a href={i.url} target="_blank" rel="noopener noreferrer" aria-label={`${site.shortName} on ${i.label}`}>
            <SocialIcon name={i.key} />
          </a>
        </li>
      ))}
    </ul>
  );
}
