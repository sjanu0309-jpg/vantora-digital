import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'center',
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  align?: 'center' | 'left';
  id?: string;
}) {
  return (
    <Reveal className={`section-heading ${align === 'left' ? 'is-left' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      {text && <p className="lead">{text}</p>}
    </Reveal>
  );
}
