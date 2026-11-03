import { useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, Phone, Clock, Loader2, CheckCircle2, AlertTriangle, Send, CalendarDays } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { SocialLinks } from '../components/SocialIcons';
import { FaqList } from '../components/FaqList';
import { site, whatsappLink } from '../config/site';
import { services } from '../data/services';
import { industries } from '../data/industries';
import { generalFaqs } from '../data/faqs';
import { submitLead, type LeadPayload } from '../lib/submitLead';
import { trackEvent } from '../lib/analytics';
import { useSeo } from '../hooks/useSeo';

type Fields = Omit<LeadPayload, 'website_hp' | 'pageUrl' | 'leadSource' | 'clientId' | 'elapsedMs'>;
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  fullName: '', businessName: '', email: '', phone: '', country: 'India', industry: '', service: '',
  budget: '', website: '', details: '', contactPreference: 'WhatsApp',
};

const budgets = ['Below ₹10,000', '₹10,000 – ₹25,000', '₹25,000 – ₹50,000', '₹50,000 – ₹1,00,000', 'Above ₹1,00,000', 'Not sure yet'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.fullName.trim().length < 2) e.fullName = 'Please enter your full name.';
  if (!f.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address (e.g. name@company.com).';
  const digits = f.phone.replace(/\D/g, '');
  if (!f.phone.trim()) e.phone = 'Please enter your contact number.';
  else if (!PHONE_RE.test(f.phone.trim()) || digits.length < 7 || digits.length > 15) e.phone = 'Please enter a valid phone number, including country code if outside India.';
  if (f.website.trim() && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+[^\s]*$/i.test(f.website.trim())) e.website = 'Please enter a valid website address.';
  if (f.details.length > 3000) e.details = 'Please keep project details under 3000 characters.';
  return e;
}

function leadSummary(f: Fields) {
  return [
    `Hi ${site.name}, I'd like a free consultation.`,
    `Name: ${f.fullName}`,
    f.businessName && `Business: ${f.businessName}`,
    `Email: ${f.email}`,
    `Phone: ${f.phone}`,
    f.service && `Service: ${f.service}`,
    f.budget && `Budget: ${f.budget}`,
    f.details && `Details: ${f.details}`,
  ].filter(Boolean).join('\n');
}

export default function Contact() {
  useSeo('Contact Us', `Contact VANTORA DIGITAL for a free consultation. Call ${site.phoneDisplay}, email ${site.email} or send an enquiry online.`);
  const [params] = useSearchParams();
  const preService = params.get('service') ?? '';
  const [f, setF] = useState<Fields>(() => ({ ...empty, service: services.some((s) => s.name === preService) ? preService : '' }));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'offline'>('idle');
  const [message, setMessage] = useState('');
  const [hp, setHp] = useState('');
  const startedAt = useRef(Date.now());
  const lastSubmit = useRef<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const summary = useMemo(() => leadSummary(f), [f]);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending' || status === 'success') return; // prevent duplicates
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const fingerprint = JSON.stringify(f);
    if (fingerprint === lastSubmit.current && status !== 'error') return;
    lastSubmit.current = fingerprint;

    if (!site.formEndpoint) {
      setStatus('offline');
      return;
    }
    setStatus('sending');
    const res = await submitLead({
      ...f,
      website_hp: hp,
      pageUrl: window.location.href,
      leadSource: 'Website contact form',
      elapsedMs: Date.now() - startedAt.current,
    });
    if (res.ok) {
      setStatus('success');
      setMessage(res.leadId ? `Your reference: ${res.leadId}` : '');
      trackEvent('generate_lead', { service: f.service || 'unspecified' });
    } else {
      setStatus('error');
      setMessage(res.error);
    }
  };

  const field = (k: keyof Fields, label: string, opts: { required?: boolean; type?: string; autoComplete?: string; placeholder?: string; inputMode?: 'email' | 'tel' | 'url'; className?: string } = {}) => (
    <div className={`field ${opts.className ?? ''} ${errors[k] ? 'has-error' : ''}`}>
      <label htmlFor={k}>{label}{opts.required ? <span aria-hidden="true"> *</span> : <span className="opt"> (optional)</span>}</label>
      <input
        id={k}
        name={k}
        type={opts.type ?? 'text'}
        value={f[k]}
        onChange={set(k)}
        required={opts.required}
        aria-required={opts.required}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `${k}-err` : undefined}
        autoComplete={opts.autoComplete}
        inputMode={opts.inputMode}
        placeholder={opts.placeholder}
        maxLength={200}
      />
      {errors[k] && <p className="field-error" id={`${k}-err`}>{errors[k]}</p>}
    </div>
  );

  return (
    <>
      <PageHero eyebrow="Contact Us" title={["Let's build something", <span className="grad" key="g">that grows.</span>]} text="Tell us about your business and goals. We'll get back to you to arrange your free consultation." crumbs={[{ label: 'Contact' }]} />

      <section className="section light contact" aria-label="Contact details and enquiry form">
        <div className="container contact-grid">
          <aside className="contact-info">
            <Reveal className="contact-card dark-card">
              <h2 className="display-3">Get in touch</h2>
              <p>Prefer a quick chat? Call, email or WhatsApp us directly.</p>
              <ul>
                <li><span className="ci"><Phone size={18} aria-hidden="true" /></span><div><small>Call us</small><a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a></div></li>
                <li><span className="ci"><Mail size={18} aria-hidden="true" /></span><div><small>Email us</small><a href={`mailto:${site.email}`}>{site.email}</a></div></li>
                <li><span className="ci"><Clock size={18} aria-hidden="true" /></span><div><small>Response</small><span>We reply to every enquiry as soon as possible.</span></div></li>
              </ul>
              <a className="btn btn-whatsapp" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              {site.bookingUrl && (
                <a className="btn btn-ghost" href={site.bookingUrl} target="_blank" rel="noopener noreferrer"><CalendarDays size={18} aria-hidden="true" /> Book a call slot</a>
              )}
              <div className="contact-social"><small>Follow us</small><SocialLinks /></div>
            </Reveal>
          </aside>

          <Reveal className="form-card">
            {status === 'success' ? (
              <div className="form-state success" role="status">
                <CheckCircle2 size={56} aria-hidden="true" />
                <h2 className="display-3">Thank you, {f.fullName.split(' ')[0]}!</h2>
                <p>Your inquiry has been received. Our team will contact you soon via your preferred method.</p>
                {message && <p className="ref">{message}</p>}
                <a className="btn btn-whatsapp" href={whatsappLink(summary)} target="_blank" rel="noopener noreferrer">Follow up on WhatsApp</a>
              </div>
            ) : status === 'offline' ? (
              <div className="form-state" role="status">
                <Send size={48} aria-hidden="true" />
                <h2 className="display-3">Send your inquiry directly</h2>
                <p>Online form delivery is being set up. Your details are ready — send them to us instantly on WhatsApp or by email.</p>
                <div className="hero__actions center">
                  <a className="btn btn-whatsapp" href={whatsappLink(summary)} target="_blank" rel="noopener noreferrer">Send via WhatsApp</a>
                  <a className="btn btn-dark" href={`mailto:${site.email}?subject=${encodeURIComponent('Website inquiry — ' + (f.businessName || f.fullName))}&body=${encodeURIComponent(summary)}`}>Send via Email</a>
                </div>
                <button className="btn-text" onClick={() => setStatus('idle')}>← Edit my details</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-note">
                <h2 className="display-3">Tell us about your project</h2>
                <p id="form-note" className="form-note">Fields marked * are required.</p>
                {/* Honeypot — hidden from people, visible to bots */}
                <div className="hp" aria-hidden="true">
                  <label htmlFor="company_website">Leave this field empty</label>
                  <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                </div>
                <div className="form-grid">
                  {field('fullName', 'Full Name', { required: true, autoComplete: 'name' })}
                  {field('businessName', 'Business Name', { autoComplete: 'organization' })}
                  {field('email', 'Email Address', { required: true, type: 'email', autoComplete: 'email', inputMode: 'email' })}
                  {field('phone', 'Contact Number', { required: true, type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '+91 98765 43210' })}
                  {field('country', 'Country', { autoComplete: 'country-name' })}
                  <div className="field">
                    <label htmlFor="industry">Industry <span className="opt">(optional)</span></label>
                    <select id="industry" name="industry" value={f.industry} onChange={set('industry')}>
                      <option value="">Select your industry</option>
                      {industries.map((i) => <option key={i.name}>{i.name}</option>)}
                      <option>Education</option>
                      <option>Professional Services</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="service">Required Service <span className="opt">(optional)</span></label>
                    <select id="service" name="service" value={f.service} onChange={set('service')}>
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s.slug}>{s.name}</option>)}
                      <option>Complete Digital Growth Package</option>
                      <option>Not sure — need advice</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="budget">Monthly Marketing Budget <span className="opt">(optional)</span></label>
                    <select id="budget" name="budget" value={f.budget} onChange={set('budget')}>
                      <option value="">Select a range</option>
                      {budgets.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  {field('website', 'Website URL', { type: 'url', autoComplete: 'url', inputMode: 'url', placeholder: 'https://', className: 'span-2' })}
                  <div className={`field span-2 ${errors.details ? 'has-error' : ''}`}>
                    <label htmlFor="details">Project Details <span className="opt">(optional)</span></label>
                    <textarea id="details" name="details" rows={5} value={f.details} onChange={set('details')} maxLength={3000} placeholder="Tell us about your business, goals and what you'd like help with." aria-invalid={!!errors.details} aria-describedby={errors.details ? 'details-err' : undefined} />
                    {errors.details && <p className="field-error" id="details-err">{errors.details}</p>}
                  </div>
                  <fieldset className="field span-2 radios">
                    <legend>Preferred Contact Method</legend>
                    {['WhatsApp', 'Phone Call', 'Email'].map((m) => (
                      <label key={m} className={f.contactPreference === m ? 'is-checked' : ''}>
                        <input type="radio" name="contactPreference" value={m} checked={f.contactPreference === m} onChange={set('contactPreference')} />
                        {m}
                      </label>
                    ))}
                  </fieldset>
                </div>
                {status === 'error' && (
                  <div className="form-alert" role="alert">
                    <AlertTriangle size={20} aria-hidden="true" />
                    <div>
                      <strong>We couldn't send your inquiry.</strong> {message}
                      <br />Please try again, or <a href={whatsappLink(summary)} target="_blank" rel="noopener noreferrer">send it on WhatsApp</a>.
                    </div>
                  </div>
                )}
                <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                  {status === 'sending' ? <><Loader2 className="spin" size={18} aria-hidden="true" /> Sending…</> : <>Send My Inquiry <Send size={18} aria-hidden="true" /></>}
                </button>
                <p className="form-privacy">By submitting, you agree to be contacted about your inquiry. We respect your privacy — see our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section light alt">
        <div className="container faq-wrap">
          <div className="section-heading is-left"><span className="eyebrow">FAQs</span><h2>Before you <span className="grad">reach out</span></h2></div>
          <FaqList items={generalFaqs} />
        </div>
      </section>
    </>
  );
}
