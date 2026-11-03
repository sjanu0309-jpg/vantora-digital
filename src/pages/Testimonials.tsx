import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { TestimonialsBlock } from '../components/Sections';
import { CtaSection } from '../components/CtaSection';
import { Reveal } from '../components/Reveal';
import { SocialIcon } from '../components/SocialIcons';
import { site } from '../config/site';
import { useSeo } from '../hooks/useSeo';

export default function Testimonials() {
  useSeo('Testimonials', 'Genuine client feedback for VANTORA DIGITAL. Read and leave reviews on our Google Business Profile, Facebook and LinkedIn.');
  const profiles = [
    { name: 'google' as const, label: 'Google Business Profile', text: 'Read our reviews or share your experience on Google.', url: site.social.googleBusiness, cta: 'Open Google profile' },
    { name: 'facebook' as const, label: 'Facebook', text: 'Follow our latest work and leave a recommendation.', url: site.social.facebook, cta: 'Visit Facebook page' },
    { name: 'linkedin' as const, label: 'LinkedIn', text: 'Connect with VANTORA DIGITAL on LinkedIn.', url: site.social.linkedin, cta: 'Find us on LinkedIn' },
    ...(site.social.instagram ? [{ name: 'instagram' as const, label: 'Instagram', text: 'See our creative work and reels.', url: site.social.instagram, cta: 'Visit Instagram' }] : []),
  ];
  return (
    <>
      <PageHero eyebrow="Testimonials" title={['Real words from', <span className="grad" key="g">real clients.</span>]} text="We only publish genuine feedback shared with permission by our clients." crumbs={[{ label: 'Testimonials' }]} />
      <section className="section light">
        <div className="container">
          <SectionHeading eyebrow="Client feedback" title={<>What our <span className="grad">clients say</span></>} />
          <TestimonialsBlock />
        </div>
      </section>
      <section className="section dark">
        <div className="container">
          <SectionHeading eyebrow="Find us online" title={<>Our official <span className="grad">profiles</span></>} text="Verified places to see our work, read reviews and connect with us." />
          <ul className="profile-grid">
            {profiles.map((p, i) => (
              <Reveal as="li" key={p.label} delay={i * 0.08} className="profile-card glass">
                <span className="profile-card__icon"><SocialIcon name={p.name} /></span>
                <h3>{p.label}</h3>
                <p>{p.text}</p>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="link-arrow">{p.cta} →</a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
