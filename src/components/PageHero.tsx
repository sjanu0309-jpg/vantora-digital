import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { MaskText, Reveal } from './Reveal';

export function PageHero({
  eyebrow, title, text, crumbs, children, image,
}: {
  eyebrow: string; title: ReactNode[]; text?: ReactNode; crumbs: { to?: string; label: string }[]; children?: ReactNode; image?: string;
}) {
  return (
    <section className="page-hero dark">
      <div className="page-hero__bg" aria-hidden="true">
        {image && <img src={image} alt="" />}
        <div className="grid-lines" />
        <div className="orb orb-1" /><div className="orb orb-2" />
      </div>
      <div className="container page-hero__inner">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            <li><Link to="/">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.label}>
                <ChevronRight size={14} aria-hidden="true" />
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="display-1"><MaskText lines={title} /></h1>
        {text && <Reveal delay={0.2}><p className="lead">{text}</p></Reveal>}
        {children && <Reveal delay={0.3}>{children}</Reveal>}
      </div>
    </section>
  );
}
