import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { asset } from '../config/site';
import { useMedia } from '../hooks/useMedia';

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

export function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const mobile = useMedia('(max-width: 767px)');
  const [mode, setMode] = useState<'loading' | '3d' | 'fallback'>('loading');

  useEffect(() => {
    if (!stage.current) return;
    if (!hasWebGL()) { setMode('fallback'); return; }
    let handle: { dispose: () => void; setActive: (a: boolean) => void } | null = null;
    let cancelled = false;
    let io: IntersectionObserver | null = null;
    import('../three/heroScene')
      .then(({ createHeroScene }) => {
        if (cancelled || !stage.current) return;
        handle = createHeroScene(stage.current, { mobile, reducedMotion: reduce });
        setMode('3d');
        io = new IntersectionObserver(([e]) => handle?.setActive(e.isIntersecting));
        io.observe(stage.current);
      })
      .catch(() => setMode('fallback'));
    return () => {
      cancelled = true;
      io?.disconnect();
      handle?.dispose();
    };
  }, [mobile, reduce]);

  const ease = [0.22, 1, 0.36, 1] as const;
  const line = (d: number) => ({
    initial: reduce ? false : { y: '110%' },
    animate: { y: '0%' },
    transition: { duration: 1, delay: d, ease },
  });

  return (
    <section className="hero dark" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="grid-lines" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>
      <div className={`hero__stage is-${mode}`} ref={stage} aria-hidden="true">
        {mode !== '3d' && (
          <img className="hero__fallback" src={asset('images/vantora-logo.webp')} alt="" width={520} height={520} fetchPriority="high" />
        )}
      </div>
      <div className="container hero__inner">
        <motion.span className="eyebrow" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          Your Digital Growth Partner
        </motion.span>
        <h1 id="hero-title" className="hero__title">
          <span className="mask-line"><motion.span className="mask-inner" {...line(0.2)}>We don't just market.</motion.span></span>
          <span className="mask-line"><motion.span className="mask-inner" {...line(0.35)}>We create</motion.span></span>
          <span className="mask-line"><motion.span className="mask-inner grad" {...line(0.5)}>digital growth.</motion.span></span>
        </h1>
        <motion.p className="lead hero__lead" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75 }}>
          Transform your business into a powerful digital brand through strategic marketing, creative storytelling and
          performance-driven advertising.
        </motion.p>
        <motion.div className="hero__actions" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
          <Link to="/contact" className="btn btn-primary btn-lg">Get Free Consultation <ArrowRight size={18} /></Link>
          <Link to="/portfolio" className="btn btn-ghost btn-lg">Explore Our Work</Link>
        </motion.div>
      </div>
      <a href="#intro" className="scroll-cue" aria-label="Scroll to next section">
        <span className="scroll-cue__mouse"><span /></span>
        <span className="scroll-cue__text">Scroll</span>
        <ArrowDown size={14} aria-hidden="true" />
      </a>
    </section>
  );
}
