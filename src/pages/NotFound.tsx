import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { asset } from '../config/site';
import { useSeo } from '../hooks/useSeo';

export default function NotFound() {
  useSeo('Page Not Found', 'The page you are looking for could not be found.', { noindex: true });
  return (
    <section className="notfound dark">
      <div className="hero__bg" aria-hidden="true"><div className="grid-lines" /><div className="orb orb-1" /></div>
      <div className="container notfound__inner">
        <img src={asset('images/vantora-logo-160.webp')} alt="" width={96} height={96} />
        <p className="notfound__code">404</p>
        <h1 className="display-2">This page took a different growth path.</h1>
        <p className="lead">The page you're looking for doesn't exist or has moved.</p>
        <div className="hero__actions">
          <Link to="/" className="btn btn-primary">Back to Home <ArrowRight size={18} /></Link>
          <Link to="/contact" className="btn btn-ghost">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
