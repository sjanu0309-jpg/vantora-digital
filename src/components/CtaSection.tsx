import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { GrowthArrow } from './GrowthArrow';
import { Reveal, MaskText } from './Reveal';
import { whatsappLink } from '../config/site';

export function CtaSection({
  title = <>Ready to <span className="grad">Grow</span> Your Business <span className="grad">Digitally?</span></>,
  text = "Let's create a digital strategy that moves your business forward.",
}: { title?: React.ReactNode; text?: string }) {
  return (
    <section className="cta-section dark" aria-labelledby="cta-title">
      <div className="container cta-grid">
        <div>
          <span className="eyebrow">Free consultation</span>
          <h2 id="cta-title" className="display-2"><MaskText lines={[title]} /></h2>
          <Reveal><p className="lead">{text}</p></Reveal>
          <Reveal delay={0.1} className="cta-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">Book Your Free Consultation <ArrowRight size={18} /></Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">WhatsApp Us</a>
          </Reveal>
          <ul className="checks">
            {['More Visibility', 'Quality Leads', 'Higher Conversions', 'Business Growth'].map((c) => (
              <li key={c}><CheckCircle2 size={18} aria-hidden="true" /> {c}</li>
            ))}
          </ul>
        </div>
        <GrowthArrow />
      </div>
    </section>
  );
}
