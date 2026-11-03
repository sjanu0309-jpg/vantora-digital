import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { getService, services } from '../data/services';
import { projects } from '../data/portfolio';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, MaskText } from '../components/Reveal';
import { ServiceIcon } from '../components/ServiceIcon';
import { ProjectCard } from '../components/Sections';
import { FaqList } from '../components/FaqList';
import { CtaSection } from '../components/CtaSection';
import { useSeo } from '../hooks/useSeo';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug = '' } = useParams();
  const s = getService(slug);
  useSeo(s ? s.name : 'Service not found', s ? `${s.name} by VANTORA DIGITAL — ${s.summary}` : 'Page not found', { noindex: !s });
  if (!s) return <NotFound />;
  const related = projects.filter((p) => p.category === s.portfolioCategory);
  const shown = (related.length ? related : projects).slice(0, 3);
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHero eyebrow={s.name} title={[s.heroLine]} text={s.summary} crumbs={[{ to: '/services', label: 'Services' }, { label: s.name }]}>
        <div className="hero__actions">
          <Link to={`/contact?service=${encodeURIComponent(s.name)}`} className="btn btn-primary btn-lg">Get Free Consultation <ArrowRight size={18} /></Link>
          <a href="#deliverables" className="btn btn-ghost btn-lg">What's Included</a>
        </div>
      </PageHero>

      <section className="section light" aria-labelledby="svc-intro">
        <div className="container intro-grid">
          <Reveal className="svc-feature">
            <ServiceIcon name={s.icon} size="lg" />
          </Reveal>
          <div>
            <span className="eyebrow">Overview</span>
            <h2 id="svc-intro" className="display-2"><MaskText lines={[s.name]} /></h2>
            <Reveal delay={0.1}><p className="lead">{s.intro}</p></Reveal>
          </div>
        </div>
      </section>

      <section id="deliverables" className="section light alt" aria-labelledby="deliv-title">
        <div className="container">
          <SectionHeading id="deliv-title" eyebrow="Deliverables" title={<>What's <span className="grad">included</span></>} />
          <ul className="deliverables">
            {s.deliverables.map((d, i) => (
              <Reveal as="li" key={d} delay={(i % 3) * 0.06}><span className="tick"><Check size={16} aria-hidden="true" /></span>{d}</Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section dark" aria-labelledby="benefit-title">
        <div className="container">
          <SectionHeading id="benefit-title" eyebrow="Benefits" title={<>How it helps <span className="grad">your business</span></>} />
          <ul className="values-grid">
            {s.benefits.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 0.08} className="value-card glass">
                <span className="value-num">0{i + 1}</span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section light" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeading id="approach-title" eyebrow="Our Approach" title={<>Step by step, <span className="grad">with clarity</span></>} />
          <ol className="approach">
            {s.approach.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.08}>
                <span className="approach__n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section dark" aria-labelledby="rel-title">
        <div className="container">
          <SectionHeading id="rel-title" eyebrow="Related Work" title={<>Concept <span className="grad">examples</span></>} text="Demonstration projects that show our creative direction for this service." />
          <div className="project-grid">{shown.map((p, i) => <ProjectCard p={p} i={i} key={p.slug} />)}</div>
        </div>
      </section>

      <section className="section light alt" aria-labelledby="sfaq">
        <div className="container faq-wrap">
          <SectionHeading id="sfaq" align="left" eyebrow="FAQs" title={<>{s.name} <span className="grad">FAQs</span></>} />
          <FaqList items={s.faqs} />
        </div>
      </section>

      <section className="section light" aria-labelledby="more-svc">
        <div className="container">
          <SectionHeading id="more-svc" eyebrow="Explore more" title={<>Other <span className="grad">services</span></>} />
          <ul className="mini-services">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={`/services/${o.slug}`}><ServiceIcon name={o.icon} /><span>{o.name}</span><ArrowRight size={16} aria-hidden="true" /></Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection title={<>Ready to start with <span className="grad">{s.name}?</span></>} text="Book a free consultation and we'll recommend the right plan for your business." />
    </>
  );
}
