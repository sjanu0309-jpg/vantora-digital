import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { site } from '../config/site';
import { useSeo } from '../hooks/useSeo';

const updated = '3 November 2026';

export function Privacy() {
  useSeo('Privacy Policy', 'How VANTORA DIGITAL collects, uses and protects the information you share through our website.');
  return (
    <>
      <PageHero eyebrow="Legal" title={['Privacy Policy']} text={`Last updated: ${updated}`} crumbs={[{ label: 'Privacy Policy' }]} />
      <section className="section light">
        <div className="container prose">
          <p>This Privacy Policy explains how {site.name} ("we", "us", "our") collects, uses and protects personal information when you visit <a href={site.domain}>vantoradigital.info</a> or contact us.</p>
          <h2>1. Information we collect</h2>
          <p>When you submit our enquiry form, we collect the details you provide: your name, business name, email address, phone number, country, industry, required service, marketing budget, website, project details and preferred contact method.</p>
          <p>If you have accepted analytics cookies, we may also collect anonymous usage data such as pages visited and device type.</p>
          <h2>2. How we use your information</h2>
          <ul>
            <li>To respond to your enquiry and arrange your consultation</li>
            <li>To prepare proposals and provide our services</li>
            <li>To improve our website and services</li>
          </ul>
          <p>We do not sell your personal information.</p>
          <h2>3. Where your data is stored</h2>
          <p>Enquiry submissions are stored securely in a Google Spreadsheet controlled by {site.name}, using Google's infrastructure. Access is limited to our team.</p>
          <h2>4. Cookies and analytics</h2>
          <p>We use Google Analytics only after you accept analytics cookies. You can decline, and the website will continue to work normally.</p>
          <h2>5. Third-party links</h2>
          <p>Our website links to third-party platforms such as Facebook, LinkedIn, Google and WhatsApp. Their own privacy policies apply when you use them.</p>
          <h2>6. Data retention</h2>
          <p>We keep enquiry information only as long as needed to respond, provide services or meet legal obligations.</p>
          <h2>7. Your rights</h2>
          <p>You may ask us to access, correct or delete the personal information we hold about you by emailing <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
          <h2>8. Contact</h2>
          <p>{site.name}<br />Email: <a href={`mailto:${site.email}`}>{site.email}</a><br />Phone: <a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a></p>
        </div>
      </section>
    </>
  );
}

export function Terms() {
  useSeo('Terms and Conditions', 'Terms and conditions for using the VANTORA DIGITAL website and services.');
  return (
    <>
      <PageHero eyebrow="Legal" title={['Terms & Conditions']} text={`Last updated: ${updated}`} crumbs={[{ label: 'Terms & Conditions' }]} />
      <section className="section light">
        <div className="container prose">
          <p>By using <a href={site.domain}>vantoradigital.info</a>, you agree to these terms. Please read them carefully.</p>
          <h2>1. Website use</h2>
          <p>The content on this website is for general information about {site.name} and our services. You agree not to misuse the website or attempt to disrupt its operation.</p>
          <h2>2. Services and proposals</h2>
          <p>Specific services, deliverables, timelines and fees are agreed separately in a written proposal or agreement. Information on this website does not form a contract.</p>
          <h2>3. No guaranteed results</h2>
          <p>Marketing results depend on many factors outside our control, including market conditions, budgets and platform policies. We do not guarantee specific rankings, leads, sales or returns.</p>
          <h2>4. Advertising spend</h2>
          <p>Advertising budgets paid to platforms such as Meta are separate from our service fees and are paid directly by the client unless agreed otherwise in writing.</p>
          <h2>5. Intellectual property</h2>
          <p>The {site.name} name, logo, website design and content belong to {site.name}. Concept projects shown in our portfolio are demonstration work. Final deliverables for clients are transferred as agreed in each project contract.</p>
          <h2>6. Limitation of liability</h2>
          <p>To the extent permitted by law, {site.name} is not liable for indirect or consequential losses arising from use of this website.</p>
          <h2>7. Changes</h2>
          <p>We may update these terms from time to time. The latest version will always be available on this page.</p>
          <h2>8. Contact</h2>
          <p>Questions about these terms? <Link to="/contact">Contact us</Link> or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        </div>
      </section>
    </>
  );
}
