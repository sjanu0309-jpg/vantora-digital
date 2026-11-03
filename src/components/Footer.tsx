import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { asset, site, whatsappLink } from '../config/site';
import { services } from '../data/services';
import { SocialLinks } from './SocialIcons';
import { navItems } from './Header';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" aria-label={`${site.name} — home`}>
            <img src={asset('images/vantora-logo.webp')} width={120} height={120} alt="VANTORA DIGITAL logo — Digital Life Growth" loading="lazy" />
          </Link>
          <p className="footer-tag">{site.tagline}</p>
          <p>
            VANTORA DIGITAL is a creative digital marketing agency helping businesses build a powerful online presence through
            strategy, creative content and performance-driven advertising.
          </p>
          <SocialLinks />
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            {navItems.map((n) => (
              <li key={n.to}><Link to={n.to}>{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            {services.map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul className="footer-contact">
            <li><Phone size={16} aria-hidden="true" /><a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a></li>
            <li><Mail size={16} aria-hidden="true" /><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><Globe size={16} aria-hidden="true" /><a href={site.domain}>vantoradigital.info</a></li>
            <li><MapPin size={16} aria-hidden="true" /><span>{site.country} · Serving clients worldwide</span></li>
          </ul>
          <a className="btn btn-whatsapp btn-sm" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <ul>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms-and-conditions">Terms &amp; Conditions</Link></li>
        </ul>
      </div>
    </footer>
  );
}
