import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { ProjectCard } from '../components/Sections';
import { CtaSection } from '../components/CtaSection';
import { portfolioCategories, projects } from '../data/portfolio';
import { asset } from '../config/site';
import { useSeo } from '../hooks/useSeo';

export default function Portfolio() {
  useSeo('Portfolio — Our Work', 'Explore VANTORA DIGITAL creative work: social media campaigns, Meta advertising, brand identity, creative design, video production and landing pages.');
  const [cat, setCat] = useState('All');
  const list = useMemo(() => (cat === 'All' ? projects : projects.filter((p) => p.category === cat)), [cat]);
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={['Creative work that', <span className="grad" key="g">builds brands.</span>]}
        text="A showcase of our creative direction across campaigns, content, video and landing pages."
        crumbs={[{ label: 'Portfolio' }]}
        image={asset('images/video-production.webp')}
      />
      <section className="section dark portfolio-page" aria-label="Portfolio gallery">
        <div className="container">
          <p className="notice"><Info size={18} aria-hidden="true" /><span>Projects marked <strong>Concept project</strong> are demonstration work created by VANTORA DIGITAL to show our creative style. They are not presented as completed client work.</span></p>
          <div className="filters" role="toolbar" aria-label="Filter projects by category">
            {portfolioCategories.map((c) => {
              const n = c === 'All' ? projects.length : projects.filter((p) => p.category === c).length;
              return (
                <button key={c} aria-pressed={cat === c} className={cat === c ? 'is-active' : ''} onClick={() => setCat(c)}>
                  {c} <span>{n}</span>
                </button>
              );
            })}
          </div>
          <p className="sr-only" aria-live="polite">{list.length} projects shown</p>
          <motion.div layout className="project-grid masonry">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}>
                  <ProjectCard p={p} i={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && (
            <div className="empty-state">
              <p>New <strong>{cat}</strong> projects are coming soon.</p>
              <button className="btn btn-ghost btn-sm" onClick={() => setCat('All')}>Show all projects</button>
            </div>
          )}
        </div>
      </section>
      <CtaSection title={<>Want work like this for <span className="grad">your brand?</span></>} />
    </>
  );
}
