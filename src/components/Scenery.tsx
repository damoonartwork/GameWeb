import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { gsap, prefersReducedMotion } from '../lib/gsap';

/*
 * Decorative vector scenery (not artwork): the pixel-edged grass under the hero and the
 * hills/cliffs/moon transition before the team section, both modelled on the reference.
 * Pure SVG so they stay crisp, weigh nothing and can be recoloured from CSS tokens.
 */

/** Deterministic pixel-step edge, so SSR/rerenders produce the same shape. */
function pixelEdge(width: number, base: number, step: number, amp: number, seed: number) {
  let d = `M0 ${base}`;
  let s = seed;
  for (let x = 0; x <= width; x += step) {
    s = (s * 9301 + 49297) % 233280;
    const y = base + Math.round(((s / 233280) * 2 - 1) * amp);
    d += ` H${x} V${y}`;
  }
  return d;
}

function bladeFringe(width: number, top: number, seed: number) {
  // Dark grass blades hanging into the page background.
  let d = `M0 ${top}`;
  let s = seed;
  for (let x = 0; x <= width; x += 9) {
    s = (s * 9301 + 49297) % 233280;
    const h = 8 + Math.round((s / 233280) * 22);
    d += ` L${x + 4} ${top + h} L${x + 9} ${top}`;
  }
  return `${d} V0 H0 Z`;
}

function Rock({ className, variant = 0 }: { className: string; variant?: number }) {
  const shapes = [
    'M6 40 18 14 44 6 70 12 86 34 80 44 10 46Z',
    'M4 30 14 12 34 4 56 10 62 28 54 34 8 34Z',
    'M2 22 10 8 26 4 40 10 42 22 34 26 6 26Z',
  ];
  return (
    <svg className={`rock ${className}`} viewBox="0 0 90 48" aria-hidden="true">
      <path d={shapes[variant % 3]} fill="#9aa0a6" />
      <path d={shapes[variant % 3]} fill="#c9cdd1" transform="translate(4 -3) scale(.82)" opacity=".85" />
    </svg>
  );
}

export function Ground() {
  const W = 1440;
  return (
    <div className="ground" aria-hidden="true">
      <Rock className="rock--1" variant={0} />
      <Rock className="rock--2" variant={2} />
      <Rock className="rock--3" variant={1} />
      <Rock className="rock--4" variant={0} />
      <svg className="ground__svg" viewBox={`0 0 ${W} 150`} preserveAspectRatio="none">
        <path d={`${pixelEdge(W, 26, 12, 7, 7)} V150 H0 Z`} fill="var(--grass-light)" />
        <path d={`${pixelEdge(W, 58, 16, 9, 21)} V150 H0 Z`} fill="var(--grass)" />
        <path d={`${pixelEdge(W, 92, 10, 8, 3)} V150 H0 Z`} fill="var(--grass-light)" opacity=".55" />
        <path d={`${pixelEdge(W, 118, 14, 5, 11)} V150 H0 Z`} fill="var(--grass)" />
      </svg>
      <svg className="ground__fringe" viewBox={`0 0 ${W} 40`} preserveAspectRatio="none">
        <path d={bladeFringe(W, 0, 5)} fill="var(--grass-deep)" />
      </svg>
    </div>
  );
}

/**
 * Pinned landscape interlude (reference: after the roadmap). Scrubbed:
 * cliffs slide in from both sides → layered hills rise → the moon climbs with birds →
 * the front hill swells until the screen is green, then the page carries on.
 */
export function Landscape() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=160%', pin: true, scrub: 0.8, anticipatePin: 1 },
      });
      tl.fromTo(q('.land__cliff--l'), { xPercent: -60, yPercent: 30 }, { xPercent: 0, yPercent: 0, duration: 1, ease: 'power2.out' }, 0)
        .fromTo(q('.land__cliff--r'), { xPercent: 60, yPercent: 30 }, { xPercent: 0, yPercent: 0, duration: 1, ease: 'power2.out' }, 0)
        .fromTo(q('.land__moon'), { yPercent: 120, scale: 0.7 }, { yPercent: 0, scale: 1, duration: 1.1, ease: 'power2.out' }, 0.1)
        .fromTo(q('.land__hills--back'), { yPercent: 60 }, { yPercent: 0, duration: 1 }, 0.2)
        .fromTo(q('.land__hills--mid'), { yPercent: 80 }, { yPercent: 0, duration: 1 }, 0.3)
        .fromTo(q('.land__hills--front'), { yPercent: 100 }, { yPercent: 0, duration: 1 }, 0.4)
        .fromTo(q('.land__birds'), { xPercent: -30 }, { xPercent: 40, duration: 2 }, 0.3)
        .to(q('.land__hills--front'), { scaleY: 3.2, transformOrigin: '50% 100%', duration: 0.9, ease: 'power2.in' }, 1.5)
        .to(q('.land__moon, .land__cliff'), { yPercent: -20, autoAlpha: 0, duration: 0.6 }, 1.7);
    },
    [lang],
    root,
  );

  return (
    <div ref={root} className="land" role="img" aria-label={t.a11y.scenery}>
      <svg className="land__cliff land__cliff--l" viewBox="0 0 400 700" preserveAspectRatio="xMinYMax meet" aria-hidden="true">
        <path d="M0 700V120l40-90 50 60 30-80 60 140 40-30 60 210 50 90 70 280Z" fill="#7d838a" />
        <path d="M40 30 70 260 30 700H0V120ZM120 10l20 300-30 390h-30l20-420ZM220 140l10 260-40 300h-40l60-330Z" fill="#a9aeb3" />
      </svg>
      <svg className="land__cliff land__cliff--r" viewBox="0 0 400 700" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">
        <path d="M400 700V80l-50 40-40-90-60 160-40-20-50 200-60 110-100 220Z" fill="#7d838a" />
        <path d="M350 120l-10 250 30 330h30V80ZM250 190l-10 220 30 290h40l-40-300Z" fill="#a9aeb3" />
      </svg>
      <div className="land__moon" aria-hidden="true">
        <svg className="land__birds" viewBox="0 0 200 80">
          {[
            [20, 40, 1],
            [60, 22, 1.3],
            [100, 48, 0.9],
            [130, 30, 1.1],
            [160, 55, 0.8],
          ].map(([x, y, s], i) => (
            <path
              key={i}
              d="M0 6 Q6 0 12 6 Q18 0 24 6"
              transform={`translate(${x} ${y}) scale(${s})`}
              fill="none"
              stroke="#0d1a12"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>
      <svg className="land__hills land__hills--back" viewBox="0 0 1440 500" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 300 C200 120 360 120 520 300 S860 140 1000 280 S1300 120 1440 260 V500 H0Z" fill="var(--hill-back)" />
      </svg>
      <svg className="land__hills land__hills--mid" viewBox="0 0 1440 500" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 260 C300 140 520 380 760 330 S1180 180 1440 120 V500 H0Z" fill="var(--hill-mid)" />
      </svg>
      <svg className="land__hills land__hills--front" viewBox="0 0 1440 500" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 200 C320 300 560 420 860 400 S1260 260 1440 160 V500 H0Z" fill="var(--hill-front)" />
        {[
          [120, 300],
          [260, 360],
          [300, 390],
          [470, 420],
          [1080, 360],
          [1220, 300],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#f4f8e8" />
        ))}
      </svg>
    </div>
  );
}
