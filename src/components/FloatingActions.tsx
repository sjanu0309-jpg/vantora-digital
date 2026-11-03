import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { whatsappLink } from '../config/site';

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div className="floating">
      <button
        className={`fab fab-top ${show ? 'is-visible' : ''}`}
        aria-label="Back to top"
        tabIndex={show ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={20} />
      </button>
      <a className="fab fab-wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with VANTORA DIGITAL on WhatsApp">
        <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" fill="currentColor">
          <path d="M16 3a13 13 0 00-11.2 19.6L3 29l6.6-1.7A13 13 0 1016 3zm0 23.7c-2 0-4-.5-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1116 26.7zm5.9-8c-.3-.2-1.9-1-2.2-1s-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 01-4.4-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 00-.9.4 3.7 3.7 0 00-1.1 2.7 6.4 6.4 0 001.3 3.4 14.6 14.6 0 005.6 5c2.1.9 2.9 1 4 .8a3.4 3.4 0 002.2-1.6 2.8 2.8 0 00.2-1.6c0-.1-.3-.2-.6-.4z" />
        </svg>
      </a>
    </div>
  );
}
