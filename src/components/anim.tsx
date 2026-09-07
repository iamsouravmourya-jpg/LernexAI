import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Reveal — scroll-triggered slide-up / fade-in / slide-left / slide-right / scale with optional delay.
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  variant?: 'up' | 'fade' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const base = `reveal-${variant}`;

  return (
    <div
      ref={ref}
      className={`${base} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * TextFill — scroll-linked gradient color fill on a heading.
 */
export function TextFill({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className={`text-fill ${visible ? 'is-visible' : ''} ${className}`}>
      {text}
    </span>
  );
}

/**
 * MagneticButton — CTA that drifts toward the cursor on hover.
 */
export function MagneticButton({
  children,
  onClick,
  className = '',
  primary = true,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  primary?: boolean;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    };
    const handleLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-300 ease-out will-change-transform';
  const style = primary
    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-ink-950 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40'
    : 'bg-white dark:bg-white/5 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 dark:hover:border-cyan-400/40 hover:text-cyan-600 dark:hover:text-cyan-300 shadow-sm dark:shadow-none backdrop-blur-sm';

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`${base} ${style} ${className}`}
    >
      {children}
    </button>
  );
}

/**
 * TiltCard — 3D interactive tilt on mouse move.
 */
export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * -2 * maxTilt;
      const ry = (px - 0.5) * 2 * maxTilt;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    };
    const handleLeave = () => {
      el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [maxTilt]);

  return (
    <div ref={ref} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}

/**
 * SpotlightGrid — bento grid with cursor glow tracking.
 */
export function SpotlightGrid({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div ref={ref} className={`spotlight-grid ${className}`}>
      {children}
    </div>
  );
}

/**
 * Marquee — infinite horizontal text scroller.
 */
export function Marquee({
  items,
  speed = 'normal',
  reverse = false,
  className = '',
}: {
  items: string[];
  speed?: 'normal' | 'slow';
  reverse?: boolean;
  className?: string;
}) {
  const animClass = reverse
    ? 'animate-marquee-reverse'
    : speed === 'slow'
    ? 'animate-marquee-slow'
    : 'animate-marquee';
  const doubled = [...items, ...items];
  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div className={`flex shrink-0 ${animClass} gap-12 pr-12`}>
        {doubled.map((item, i) => (
          <span key={i} className="whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-slate-500">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * MeshGradientBackground — slow-floating gradient orbs.
 */
export function MeshGradientBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="mesh-orb-1 absolute -left-20 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="mesh-orb-2 absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-[140px]" />
      <div className="mesh-orb-3 absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-teal-500/10 blur-[100px]" style={{ animationDelay: '5s' }} />
    </div>
  );
}

/**
 * StaggeredHeadline — word-by-word slide-up on load.
 */
export function StaggeredHeadline({
  text,
  className = '',
  delayPerWord = 80,
  startDelay = 200,
}: {
  text: string;
  className?: string;
  delayPerWord?: number;
  startDelay?: number;
}) {
  const words = text.split(' ');
  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span
            className="word-slide"
            style={{ animationDelay: `${startDelay + i * delayPerWord}ms` }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </h1>
  );
}

/**
 * Counter — animated number count-up when scrolled into view.
 */
export function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  className = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(value * eased));
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

/**
 * ScrollProgress — top-of-page gradient progress bar.
 */
export function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

/**
 * Parallax — subtle vertical parallax on scroll.
 */
export function Parallax({
  children,
  speed = 0.3,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * GradientText — reusable gradient-clipped text.
 */
export function GradientText({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

/**
 * PageEffects — lightweight ambient motion layer shared by the entire page.
 */
export function PageEffects() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--cursor-x', `${event.clientX}px`);
        el.style.setProperty('--cursor-y', `${event.clientY}px`);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div ref={ref} className="page-effects" aria-hidden="true">
      <div className="cursor-aura" />
      <div className="motion-rail motion-rail-left" />
      <div className="motion-rail motion-rail-right" />
    </div>
  );
}
