import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Search, Target, Sparkles, Rocket, LineChart, Star, Quote } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { services } from '../data/services';
import { industries } from '../data/industries';
import { testimonials } from '../data/testimonials';
import type { Project } from '../data/portfolio';
import { asset, site } from '../config/site';
import { Reveal } from './Reveal';
import { ServiceIcon } from './ServiceIcon';
import { TiltCard } from './TiltCard';
import { SocialIcon } from './SocialIcons';

export function ServicesGrid() {
  return (
    <ul className="services-grid">
      {services.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={(i % 3) * 0.08}>
          <TiltCard className="service-card">
            <span className="service-card__num">0{i + 1}</span>
            <ServiceIcon name={s.icon} />
            <h3>{s.name}</h3>
            <p>{s.short}</p>
            <Link to={`/services/${s.slug}`} className="link-arrow" aria-label={`Learn more about ${s.name}`}>
              Learn More <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </TiltCard>
        </Reveal>
      ))}
    </ul>
  );
}

export const processSteps = [
  { icon: Search, title: 'Discover', text: 'Understand your business, audience and goals.' },
  { icon: Target, title: 'Strategise', text: 'Develop a clear, result-driven marketing strategy.' },
  { icon: Sparkles, title: 'Create', text: 'Produce content and advertising creatives.' },
  { icon: Rocket, title: 'Launch', text: 'Execute campaigns and generate enquiries.' },
  { icon: LineChart, title: 'Optimise', text: 'Analyse performance and improve results.' },
];

export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <ol className="timeline" ref={ref}>
      <span className="timeline__track" aria-hidden="true">
        <motion.span className="timeline__fill" style={{ ['--p' as string]: reduce ? 1 : scale } as React.CSSProperties} />
      </span>
      {processSteps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.1} className="timeline__step">
          <span className="timeline__icon"><s.icon aria-hidden="true" strokeWidth={1.6} /></span>
          <span className="timeline__num">Step 0{i + 1}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function IndustriesGrid() {
  return (
    <ul className="industries">
      {industries.map((ind, i) => (
        <Reveal as="li" key={ind.name} delay={(i % 3) * 0.08}>
          <TiltCard className="industry-card" max={5}>
            <img src={asset(ind.image)} alt="" loading="lazy" width={600} height={260} />
            <div className="industry-card__body">
              <h3>{ind.name}</h3>
              <p>{ind.text}</p>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </ul>
  );
}

export function ProjectCard({ p, i = 0 }: { p: Project; i?: number }) {
  return (
    <Reveal as="article" delay={(i % 3) * 0.08} className="project-card">
      <Link to={`/portfolio/${p.slug}`} aria-label={`${p.title} — view project`}>
        <div className="project-card__media">
          <img src={asset(p.image)} alt={`${p.title} — ${p.category}`} loading="lazy" />
          <span className="badge">{p.type}</span>
          <span className="project-card__go" aria-hidden="true"><ArrowUpRight /></span>
        </div>
        <div className="project-card__body">
          <span className="project-card__cat">{p.category} · {p.industry}</span>
          <h3>{p.title}</h3>
          <p>{p.summary}</p>
        </div>
      </Link>
    </Reveal>
  );
}

export function TestimonialsBlock() {
  if (testimonials.length === 0) {
    return (
      <Reveal className="reviews-empty">
        <div className="reviews-empty__quote" aria-hidden="true"><Quote /></div>
        <div>
          <h3>Client stories are on their way</h3>
          <p>
            We only publish genuine, approved feedback from real clients. Meanwhile, you can read and leave reviews on
            our official profiles.
          </p>
          <div className="reviews-empty__links">
            <a className="btn btn-primary btn-sm" href={site.social.googleBusiness} target="_blank" rel="noopener noreferrer">
              <SocialIcon name="google" /> Google reviews
            </a>
            <a className="btn btn-ghost btn-sm" href={site.social.facebook} target="_blank" rel="noopener noreferrer">
              <SocialIcon name="facebook" /> Facebook
            </a>
          </div>
        </div>
      </Reveal>
    );
  }
  return (
    <ul className="testimonials">
      {testimonials.map((t, i) => (
        <Reveal as="li" key={t.name + i} delay={(i % 3) * 0.08} className="testimonial">
          <Quote className="testimonial__q" aria-hidden="true" />
          {t.rating && (
            <div className="stars" aria-label={`Rated ${t.rating} out of 5`}>
              {Array.from({ length: 5 }, (_, k) => <Star key={k} size={16} fill={k < t.rating! ? 'currentColor' : 'none'} aria-hidden="true" />)}
            </div>
          )}
          <blockquote><p>{t.text}</p></blockquote>
          <div className="testimonial__who">
            {t.photo && <img src={asset(t.photo)} alt="" width={48} height={48} loading="lazy" />}
            <div>
              <strong>{t.name}</strong>
              {t.business && <span>{t.business}</span>}
            </div>
            {t.source && <a href={t.source.url} target="_blank" rel="noopener noreferrer" className="testimonial__src">View on {t.source.label}</a>}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
