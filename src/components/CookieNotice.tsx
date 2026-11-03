import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../config/site';
import { loadAnalytics } from '../lib/analytics';

const KEY = 'vantora-consent';
const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const write = (v: string) => { try { localStorage.setItem(KEY, v); } catch { /* storage unavailable */ } };

/** Cookie notice — shown only when analytics is configured (VITE_GA_ID). */
export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!site.gaId) return;
    const c = read();
    if (c === 'accepted') loadAnalytics(site.gaId);
    else if (!c) setVisible(true);
  }, []);
  if (!visible) return null;
  const choose = (v: 'accepted' | 'declined') => {
    write(v);
    if (v === 'accepted') loadAnalytics(site.gaId);
    setVisible(false);
  };
  return (
    <div className="cookie" role="dialog" aria-live="polite" aria-label="Cookie notice">
      <p>
        We use analytics cookies to understand how visitors use our website and improve it. See our{' '}
        <Link to="/privacy-policy">Privacy Policy</Link>.
      </p>
      <div>
        <button className="btn btn-ghost btn-sm" onClick={() => choose('declined')}>Decline</button>
        <button className="btn btn-primary btn-sm" onClick={() => choose('accepted')}>Accept</button>
      </div>
    </div>
  );
}
