import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Info } from 'lucide-react';
import { getProject, projects } from '../data/portfolio';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { ProjectCard } from '../components/Sections';
import { CtaSection } from '../components/CtaSection';
import { asset } from '../config/site';
import { useSeo } from '../hooks/useSeo';
import NotFound from './NotFound';

export default function ProjectDetail() {
  const { slug = '' } = useParams();
  const p = getProject(slug);
  useSeo(p ? p.title : 'Project not found', p ? p.summary : 'Page not found', { noindex: !p });
  if (!p) return <NotFound />;
  const more = projects.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <PageHero eyebrow={`${p.category} · ${p.industry}`} title={[p.title]} text={p.summary} crumbs={[{ to: '/portfolio', label: 'Portfolio' }, { label: p.title }]} />
      <section className="section light">
        <div className="container project-detail">
          <Reveal className="project-detail__media">
            <div className="device device--desktop">
              <div className="device__bar"><span /><span /><span /></div>
              <img src={asset(p.image)} alt={`${p.title} preview`} />
            </div>
            <div className="device device--phone">
              <img src={asset(p.image)} alt="" />
            </div>
          </Reveal>
          <div className="project-detail__info">
            {p.type === 'Concept project' && (
              <p className="notice notice--light"><Info size={18} aria-hidden="true" /><span>This is a <strong>concept project</strong> created to demonstrate our creative approach. It is not a completed client campaign.</span></p>
            )}
            <dl className="facts">
              <div><dt>Category</dt><dd>{p.category}</dd></div>
              <div><dt>Industry</dt><dd>{p.industry}</dd></div>
              <div><dt>Type</dt><dd>{p.type}</dd></div>
            </dl>
            <h2 className="display-3">Objective</h2>
            <p>{p.objective}</p>
            <h2 className="display-3">Deliverables</h2>
            <ul className="tick-list">{p.deliverables.map((d) => <li key={d}><Check size={16} aria-hidden="true" /> {d}</li>)}</ul>
            <h2 className="display-3">Creative approach</h2>
            <p>{p.approach}</p>
            {p.metrics && p.metrics.length > 0 && (
              <>
                <h2 className="display-3">Verified results</h2>
                <div className="metrics">{p.metrics.map((m) => <div key={m.label}><strong>{m.value}</strong><span>{m.label}</span></div>)}</div>
              </>
            )}
            <div className="hero__actions">
              <Link to="/contact" className="btn btn-primary">Start a Similar Project <ArrowRight size={18} /></Link>
              <Link to="/portfolio" className="btn btn-dark-ghost"><ArrowLeft size={18} /> All Projects</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section dark">
        <div className="container">
          <h2 className="display-3 center">More projects</h2>
          <div className="project-grid">{more.map((x, i) => <ProjectCard p={x} i={i} key={x.slug} />)}</div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
