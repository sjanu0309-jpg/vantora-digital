/** Animated "3D" upward growth arrow (SVG + CSS, lightweight). */
export function GrowthArrow() {
  return (
    <div className="growth-arrow" aria-hidden="true">
      <svg viewBox="0 0 400 400">
        <defs>
          <linearGradient id="ga-body" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#0B3B78" />
            <stop offset=".55" stopColor="#087BFF" />
            <stop offset="1" stopColor="#20D4FF" />
          </linearGradient>
          <linearGradient id="ga-side" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#071426" />
            <stop offset="1" stopColor="#0B3B78" />
          </linearGradient>
          <filter id="ga-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g className="ga-bars">
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={70 + i * 62} y={300 - (i + 1) * 46} width="38" height={(i + 1) * 46 + 40} rx="6" fill="url(#ga-body)" opacity={0.25 + i * 0.12} style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </g>
        <g className="ga-arrow" filter="url(#ga-glow)">
          <path d="M40 330 L170 210 L220 250 L320 120 L300 108 L360 70 L352 140 L334 128 L224 275 L172 236 L58 345 Z" fill="url(#ga-side)" transform="translate(8 10)" />
          <path className="ga-path" d="M40 330 L170 210 L220 250 L320 120 L300 108 L360 70 L352 140 L334 128 L224 275 L172 236 L58 345 Z" fill="url(#ga-body)" stroke="#D8DEE8" strokeOpacity=".5" strokeWidth="1.5" />
        </g>
        <circle className="ga-spark" cx="360" cy="70" r="6" fill="#20D4FF" />
      </svg>
    </div>
  );
}
