import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Palette, TrendingUp, Handshake } from 'lucide-react';
import { Hero } from '../components/Hero';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, MaskText } from '../components/Reveal';
import { ServicesGrid, ProcessTimeline, IndustriesGrid, ProjectCard, TestimonialsBlock } from '../components/Sections';
import { CtaSection } from '../components/CtaSection';
import { FaqList } from '../components/FaqList';
import { projects } from '../data/portfolio';
import { generalFaqs } from '../data/faqs';
import { asset, site } from '../config/site';
import { useSeo } from '../hooks/useSeo';

const why = [
  { icon: Compass, title: 'Strategy-Driven Marketing', text: 'Every campaign starts with research, clear goals and a plan built around your customers.' },
  { icon: Palette, title: 'Creative Brand Experiences', text: 'Modern, scroll-stopping content that makes your brand look premium and memorable.' },
  { icon: TrendingUp, title: 'Performance-Focused Campaigns', text: 'We track what matters — enquiries, cost and growth — and keep optimising.' },
  { icon: Handshake, title: 'Business Growth Partnerships', text: 'Transparent communication and long-term thinking. We grow when you grow.' },
];

export default function Home() {
  useSeo('', site.description);
  return (
    <>
      <Hero />

      {/* 02 — Brand introduction */}
      <section id="intro" className="section light intro" aria-labelledby="intro-title">
        <div className="container intro-grid">
          <Reveal className="intro-media">
            <div className="media-frame">
              <img src={asset('images/studio-growth.webp')} alt="Laptop showing a rising growth chart beside the VANTORA DIGITAL logo" loading="lazy" width={553} height={466} />
            </div>
            <div className="intro-chip glass">
              <img src={asset('images/vantora-logo-160.webp')} alt="" width={44} height={44} />
              <div><strong>Digital Life Growth</strong><span>Strategy · Creative · Performance</span></div>
            </div>
          </Reveal>
          <div>
            <span className="eyebrow">About VANTORA DIGITAL</span>
            <h2 id="intro-title" className="display-2">
              <MaskText lines={['More than marketing.', <>We build <span className="grad">digital growth.</span></>]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="lead">
                VANTORA DIGITAL is a creative digital marketing agency helping businesses establish a powerful online
                presence. We combine strategic thinking, engaging content and performance-driven marketing to connect
                brands with their ideal customers.
              </p>
              <ul className="pill-list">
                {['Brand Strategy', 'Creative Content', 'Meta Advertising', 'Lead Generation', 'Business Growth'].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <Link to="/about" className="btn btn-dark">Discover Our Story <ArrowRight size={18} /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — Services */}
      <section className="section light alt" aria-labelledby="svc-title">
        <div className="container">
          <SectionHeading id="svc-title" eyebrow="Our Services" title={<>Complete digital <span className="grad">growth solutions</span></>} text="End-to-end digital marketing services to grow your brand and generate more business." />
          <ServicesGrid />
        </div>
      </section>

      {/* 04 — Why choose */}
      <section className="section dark why" aria-labelledby="why-title">
        <div className="container why-grid">
          <div className="why-head">
            <span className="eyebrow">Why choose VANTORA?</span>
            <h2 id="why-title" className="display-2"><MaskText lines={['Creativity', <span className="grad" key="s">meets strategy.</span>]} /></h2>
            <Reveal delay={0.1}><p className="lead">We blend creative thinking with data-informed marketing to build campaigns that look exceptional and work hard for your business.</p></Reveal>
          </div>
          <ul className="why-list">
            {why.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 0.08} className="why-item glass">
                <span className="why-item__icon"><w.icon aria-hidden="true" strokeWidth={1.6} /></span>
                <div><h3>{w.title}</h3><p>{w.text}</p></div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — Process */}
      <section className="section dark process" aria-labelledby="proc-title">
        <div className="container">
          <SectionHeading id="proc-title" eyebrow="Our Process" title={<>A simple &amp; proven <span className="grad">growth process</span></>} text="A clear, result-driven process to grow your business online." />
          <ProcessTimeline />
        </div>
      </section>

      {/* 06 — Portfolio preview */}
      <section className="section dark portfolio-preview" aria-labelledby="work-title">
        <div className="container">
          <div className="split-head">
            <SectionHeading id="work-title" align="left" eyebrow="Our Work" title={<>A glimpse of our <span className="grad">creative work</span></>} text="Concept and demonstration projects that show our creative direction across industries." />
            <Link to="/portfolio" className="btn btn-ghost">View Full Portfolio <ArrowRight size={18} /></Link>
          </div>
          <div className="project-grid">
            {projects.slice(0, 6).map((p, i) => <ProjectCard p={p} i={i} key={p.slug} />)}
          </div>
        </div>
      </section>

      {/* 07 — Testimonials */}
      <section className="section light" aria-labelledby="t-title">
        <div className="container">
          <SectionHeading id="t-title" eyebrow="Testimonials" title={<>What our <span className="grad">clients say</span></>} />
          <TestimonialsBlock />
        </div>
      </section>

      {/* 08 — Industries */}
      <section className="section light alt" aria-labelledby="ind-title">
        <div className="container">
          <SectionHeading id="ind-title" eyebrow="Industries We Serve" title={<>Digital growth for <span className="grad">diverse businesses</span></>} text="We work with businesses across many sectors — each with a strategy shaped around its customers." />
          <IndustriesGrid />
        </div>
      </section>

      {/* FAQ */}
      <section className="section light" aria-labelledby="faq-title">
        <div className="container faq-wrap">
          <SectionHeading id="faq-title" align="left" eyebrow="FAQs" title={<>Questions, <span className="grad">answered</span></>} text={<>Can't find what you're looking for? <Link to="/contact">Contact us</Link> — we're happy to help.</>} />
          <FaqList items={generalFaqs} />
        </div>
      </section>

      {/* 09 — Final CTA */}
      <CtaSection />
    </>
  );
}
