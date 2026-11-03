import { Megaphone, Layers, Clapperboard, PenTool, UsersRound, ChartNoAxesCombined } from 'lucide-react';
import type { ServiceIconName } from '../data/services';

const map = { meta: Megaphone, social: Layers, video: Clapperboard, content: PenTool, avatar: UsersRound, leads: ChartNoAxesCombined };

/** Floating glass "3D" icon tile. */
export function ServiceIcon({ name, size = 'md' }: { name: ServiceIconName; size?: 'md' | 'lg' }) {
  const Icon = map[name];
  return (
    <span className={`svc-icon svc-icon--${size}`} aria-hidden="true">
      <span className="svc-icon__glow" />
      <Icon strokeWidth={1.6} />
    </span>
  );
}
