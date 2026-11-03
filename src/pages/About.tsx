import { Check, Eye, Target, Lightbulb, ShieldCheck, Sparkles, TrendingUp, HeartHandshake } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, MaskText } from '../components/Reveal';
import { CtaSection } from '../components/CtaSection';
import { ProcessTimeline } from '../components/Sections';
import { asset, founder } from '../config/site';
import { useSeo } from '../hooks/useSeo';

const values = [
  { icon: ShieldCheck, title: 'Honesty', text: 'Transparent communication, realistic expectations and no fake promises.' },
  { icon: Sparkles, title: 'Creativity', text: 'Fresh ideas and modern design that help brands stand out.' },
  { icon: TrendingUp, title: 'Growth', text: 'Every decision is guided by what grows your business.' },
  { icon: HeartHandshake, title: 'Partnership', text: 'We work as an extension of your team, not just a vendor.' },
];

const reasons = [
  'A dedicated team that understands both creativity and performance',
  'Clear strategy before spending a single rupee on ads',
  'Modern, premium creative work for every platform',
  'Transparent reporting you can actually understand',
  'Flexible solutions for small, growing and established businesses',
  'Fast communication via phone, email and WhatsApp',
];

export default function About() {
  useSeo('About Us', 'Learn about VANTORA DIGITAL — a creative digital marketing agency that believes every business deserves to grow digitally. Our story, vision, mission and values.');
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={['We believe every business', <span className="grad" key="g">deserves to grow digitally.</span>]}
        text="VANTORA DIGITAL is a creative digital marketing agency helping businesses build a powerful online presence through strategic marketing, creative storytelling and performance-driven advertising."
        crumbs={[{ label: 'About Us' }]}
        image={asset('images/studio-growth.webp')}
      />

      <section className="section light" aria-labelledby="story-title">
        <div className="container intro-grid">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 id="story-title" className="display-2"><MaskText lines={['Built for businesses', <>ready to <span className="grad">grow.</span></>]} /></h2>
            <Reveal delay={0.1}>
              <p className="lead">
                Many great businesses struggle online — not because their products or services are weak, but because
                their digital presence doesn't reflect their true value. VANTORA DIGITAL was created to change that.
              </p>
              <p>
                We bring together strategy, creative content and targeted advertising so businesses can reach the right
                customers, communicate clearly and turn attention into real enquiries. Our name reflects our promise:
                <strong> Digital Life Growth</strong> — helping brands build a stronger, longer-lasting digital life.
              </p>
            </Reveal>
          </div>
          <Reveal className="intro-media">
            <div className="media-frame">
              <img src={asset('images/brand-partnership.webp')} alt="Business handshake beside a checklist: brand strategy, creative content, Meta advertising, lead generation and business growth" loading="lazy" width={552} height={467} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section dark" aria-labelledby="vm-title">
        <div className="container">
          <SectionHeading id="vm-title" eyebrow="Vision & Mission" title={<>What drives <span className="grad">us</span></>} />
          <div className="vm-grid">
            <Reveal className="vm-card glass">
              <Eye aria-hidden="true" />
              <h3>Our Vision</h3>
              <p>To become a trusted digital growth partner for businesses — known for premium creative work, honest strategy and measurable progress.</p>
            </Reveal>
            <Reveal delay={0.1} className="vm-card glass">
              <Target aria-hidden="true" />
              <h3>Our Mission</h3>
              <p>To help businesses establish a powerful online presence by combining strategic thinking, engaging content and performance-driven marketing.</p>
            </Reveal>
            <Reveal delay={0.2} className="vm-card glass">
              <Lightbulb aria-hidden="true" />
              <h3>Our Philosophy</h3>
              <p>Marketing should be both beautiful and useful. Creativity earns attention; strategy turns that attention into growth.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section light alt" aria-labelledby="values-title">
        <div className="container">
          <SectionHeading id="values-title" eyebrow="Our Values" title={<>The principles behind <span className="grad">our work</span></>} />
          <ul className="values-grid">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.08} className="value-card">
                <span className="why-item__icon"><v.icon aria-hidden="true" strokeWidth={1.6} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section dark" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeading id="approach-title" eyebrow="Our Approach" title={<>From discovery to <span className="grad">growth</span></>} />
          <ProcessTimeline />
        </div>
      </section>

      {founder.name && (
        <section className="section light" aria-labelledby="founder-title">
          <div className="container founder">
            {founder.photo && <img src={asset(founder.photo)} alt={founder.name} width={360} height={420} loading="lazy" />}
            <div>
              <span className="eyebrow">Meet the Founder</span>
              <h2 id="founder-title" className="display-3">{founder.name}</h2>
              <p className="founder__role">{founder.designation}</p>
              <p>{founder.bio}</p>
            </div>
          </div>
        </section>
      )}

      <section className="section light" aria-labelledby="reasons-title">
        <div className="container intro-grid">
          <Reveal className="intro-media">
            <div className="media-frame">
              <img src={asset('images/target-strategy.webp')} alt="A dart hitting the bullseye above blocks showing audience, promotion, growth, video and image icons" loading="lazy" width={552} height={466} />
            </div>
          </Reveal>
          <div>
            <span className="eyebrow">Why work with us</span>
            <h2 id="reasons-title" className="display-2"><MaskText lines={['Reasons businesses', <>choose <span className="grad">VANTORA</span></>]} /></h2>
            <ul className="tick-list">
              {reasons.map((r, i) => (
                <Reveal as="li" key={r} delay={i * 0.05}><Check size={16} aria-hidden="true" /> {r}</Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
