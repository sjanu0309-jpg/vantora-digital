import { Link } from 'react-router-dom';
import { asset, site } from '../config/site';

export function Logo({ size = 46, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <Link to="/" className="logo" aria-label={`${site.name} — home`}>
      <img src={asset('images/vantora-logo-160.webp')} width={size} height={size} alt="" />
      {withText && (
        <span className="logo-text">
          <strong>VANTORA <em>DIGITAL</em></strong>
          <small>{site.tagline}</small>
        </span>
      )}
    </Link>
  );
}
