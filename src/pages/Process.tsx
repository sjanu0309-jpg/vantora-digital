import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { ProcessTimeline, processSteps } from '../components/Sections';
import { CtaSection } from '../components/CtaSection';
import { Reveal } from '../components/Reveal';
import { asset } from '../config/site';
import { useSeo } from '../hooks/useSeo';

const detail = [
  ['A free consultation call', 'Business, audience and competitor review', 'Goal setting and success measures'],
  ['Customer avatars and positioning', 'Channel and campaign plan', 'Content pillars and budget recommendations'],
  ['Ad creatives, reels and posts', 'Copywriting and landing pages', 'Your review and approval'],
  ['Campaign setup and tracking', 'Publishing and lead capture', 'Fast follow-up flows'],
  ['Performance reporting', 'A/B testing and refinements', 'Scaling what works'],
];

export default function Process() {
  useSeo('Our Process', 'Discover, Strategise, Create, Launch, Optimise — the simple, proven five-step process VANTORA DIGITAL uses to grow businesses online.');
  return (
    <>
      <PageHero eyebrow="Our Process" title={['A simple & proven', <span className="grad" key="g">growth process.</span>]} text="Five clear stages that take your business from idea to measurable digital growth." crumbs={[{ label: 'Our Process' }]} image={asset('images/campaign-dashboard.webp')} />
      <section className="section dark">
        <div className="container">
          <SectionHeading eyebrow="Overview" title={<>Five steps to <span className="grad">growth</span></>} />
          <ProcessTimeline />
        </div>
      </section>
      <section className="section light">
        <div className="container">
          <ol className="process-detail">
            {processSteps.map((s, i) => (
              <Reveal as="li" key={s.title} className="process-row">
                <div className="process-row__n">0{i + 1}</div>
                <div className="process-row__head">
                  <span className="why-item__icon"><s.icon aria-hidden="true" strokeWidth={1.6} /></span>
                  <h2 className="display-3">{s.title}</h2>
                  <p>{s.text}</p>
                </div>
                <ul>{detail[i].map((d) => <li key={d}>{d}</li>)}</ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
