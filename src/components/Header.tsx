import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { site } from '../config/site';
import { SocialLinks } from './SocialIcons';

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/process', label: 'Process' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Logo />
        <nav aria-label="Main" className="main-nav">
          <ul>
            {navItems.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} end={n.to === '/'}>
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/contact" className="btn btn-primary btn-sm header-cta">
          Book a Free Consultation <ArrowRight size={16} />
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {createPortal(<AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile">
              <ul>
                {navItems.map((n, i) => (
                  <motion.li key={n.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                    <NavLink to={n.to} end={n.to === '/'}>
                      <span className="num">0{i + 1}</span> {n.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mobile-menu__foot">
              <Link to="/contact" className="btn btn-primary">
                Book a Free Consultation <ArrowRight size={18} />
              </Link>
              <a href={`tel:${site.phoneE164}`} className="btn btn-ghost">
                <Phone size={18} /> {site.phoneDisplay}
              </a>
              <SocialLinks />
            </div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </header>
  );
}
