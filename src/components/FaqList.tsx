import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="faq">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={f.q}>
            <h3>
              <button aria-expanded={isOpen} aria-controls={`${base}-${i}`} id={`${base}-b${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{f.q}</span>
                <Plus aria-hidden="true" className="faq-icon" />
              </button>
            </h3>
            <div className="faq-panel" id={`${base}-${i}`} role="region" aria-labelledby={`${base}-b${i}`} hidden={!isOpen}>
              <p>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
