import { SectionHeading } from '../components/SectionHeading';
import { PageHero } from '../components/PageHero';
import { ServicesGrid, ProcessTimeline, IndustriesGrid } from '../components/Sections';
import { CtaSection } from '../components/CtaSection';
import { FaqList } from '../components/FaqList';
import { generalFaqs } from '../data/faqs';
import { asset } from '../config/site';
import { useSeo } from '../hooks/useSeo';

export default function Services() {
  useSeo('Services', 'Meta advertising, social media management, video & creative production, content & copywriting, customer avatar & strategy, and lead generation & landing pages.');
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={['Complete digital', <span className="grad" key="g">growth solutions.</span>]}
        text="From strategy to creative to advertising — everything your business needs to grow online, under one roof."
        crumbs={[{ label: 'Services' }]}
        image={asset('images/meta-ads.webp')}
      />
      <section className="section light alt" aria-labelledby="all-svc">
        <div className="container">
          <SectionHeading id="all-svc" eyebrow="What we do" title={<>Six services. <span className="grad">One growth goal.</span></>} text="Choose a single service or combine them into a complete growth plan." />
          <ServicesGrid />
        </div>
      </section>
      <section className="section dark" aria-labelledby="svc-proc">
        <div className="container">
          <SectionHeading id="svc-proc" eyebrow="How we work" title={<>Our <span className="grad">process</span></>} />
          <ProcessTimeline />
        </div>
      </section>
      <section className="section light" aria-labelledby="svc-ind">
        <div className="container">
          <SectionHeading id="svc-ind" eyebrow="Industries" title={<>Industries <span className="grad">we serve</span></>} />
          <IndustriesGrid />
        </div>
      </section>
      <section className="section light alt" aria-labelledby="svc-faq">
        <div className="container faq-wrap">
          <SectionHeading id="svc-faq" align="left" eyebrow="FAQs" title={<>Common <span className="grad">questions</span></>} />
          <FaqList items={generalFaqs} />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
