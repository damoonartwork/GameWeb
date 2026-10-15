import { useRef, type ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { Media } from './Media';
import { assetUrl, type AssetKey } from '../config/assets';

/*
 * Scenery: the hero ground (image slot) and the layered landscape interlude before the team
 * section (image slots with vector fallbacks).
 */

/**
 * Ground strip at the bottom of the hero: your own artwork (`hero-ground`), full width,
 * sitting in front of the character's feet. Until the file exists it shows an empty labelled slot.
 */
export function Ground() {
  const { t } = useLanguage();
  return (
    <div className="ground">
      <Media slot="heroGround" alt={t.a11y.scenery} fill priority className="media--cutout ground__media" />
    </div>
  );
}

/**
 * One landscape layer: your image if `src/assets/images/<file>` exists, otherwise the built-in
 * vector fallback. The wrapper keeps the class the scroll timeline animates, so swapping art
 * never touches the motion.
 */
function Layer({ slot, className, children }: { slot: AssetKey; className: string; children: ReactNode }) {
  const url = assetUrl(slot);
  return (
    <div className={`land__layer ${className}${url ? ' has-img' : ''}`} aria-hidden="true">
      {url ? <img src={url} alt="" loading="lazy" decoding="async" draggable={false} /> : children}
    </div>
  );
}

/**
 * Pinned landscape interlude (reference: after the roadmap). Scrubbed:
 * cliffs slide in from both sides → layered hills rise → the sun climbs with birds →
 * the front hill swells until the screen is green, then the page carries on.
 * Every layer is an image slot (land-*.png); missing ones fall back to the vector drawing.
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
        .fromTo(q('.land__sun'), { yPercent: 120, scale: 0.7 }, { yPercent: 0, scale: 1, duration: 1.1, ease: 'power2.out' }, 0.1)
        .fromTo(q('.land__hills--back'), { yPercent: 60 }, { yPercent: 0, duration: 1 }, 0.2)
        .fromTo(q('.land__hills--mid'), { yPercent: 80 }, { yPercent: 0, duration: 1 }, 0.3)
        .fromTo(q('.land__hills--front'), { yPercent: 100 }, { yPercent: 0, duration: 1 }, 0.4)
        .fromTo(q('.land__birds'), { xPercent: -30 }, { xPercent: 40, duration: 2 }, 0.3)
        .to(q('.land__hills--front'), { scaleY: 3.2, transformOrigin: '50% 100%', duration: 0.9, ease: 'power2.in' }, 1.5)
        .to(q('.land__sun, .land__birds, .land__cliff'), { yPercent: -20, autoAlpha: 0, duration: 0.6 }, 1.7);
    },
    [lang],
    root,
  );

  return (
    <div ref={root} className="land" role="img" aria-label={t.a11y.scenery}>
      <Layer slot="landCliffLeft" className="land__cliff land__cliff--l">
        <svg viewBox="0 0 400 700" preserveAspectRatio="xMinYMax meet">
          <path d="M0 700V120l40-90 50 60 30-80 60 140 40-30 60 210 50 90 70 280Z" fill="#7d838a" />
          <path d="M40 30 70 260 30 700H0V120ZM120 10l20 300-30 390h-30l20-420ZM220 140l10 260-40 300h-40l60-330Z" fill="#a9aeb3" />
        </svg>
      </Layer>
      <Layer slot="landCliffRight" className="land__cliff land__cliff--r">
        <svg viewBox="0 0 400 700" preserveAspectRatio="xMaxYMax meet">
          <path d="M400 700V80l-50 40-40-90-60 160-40-20-50 200-60 110-100 220Z" fill="#7d838a" />
          <path d="M350 120l-10 250 30 330h30V80ZM250 190l-10 220 30 290h40l-40-300Z" fill="#a9aeb3" />
        </svg>
      </Layer>
      <Layer slot="landSun" className="land__sun">
        <span className="land__sun-disc" />
      </Layer>
      <Layer slot="landBirds" className="land__birds">
        <svg viewBox="0 0 200 80">
          {[
            [20, 40, 1],
            [60, 22, 1.3],
            [100, 48, 0.9],
            [130, 30, 1.1],
            [160, 55, 0.8],
          ].map(([x, y, sc], i) => (
            <path
              key={i}
              d="M0 6 Q6 0 12 6 Q18 0 24 6"
              transform={`translate(${x} ${y}) scale(${sc})`}
              fill="none"
              stroke="#0d1a12"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </Layer>
      <Layer slot="landHillsBack" className="land__hills land__hills--back">
        <svg viewBox="0 0 1440 500" preserveAspectRatio="none">
          <path d="M0 300 C200 120 360 120 520 300 S860 140 1000 280 S1300 120 1440 260 V500 H0Z" fill="var(--hill-back)" />
        </svg>
      </Layer>
      <Layer slot="landHillsMid" className="land__hills land__hills--mid">
        <svg viewBox="0 0 1440 500" preserveAspectRatio="none">
          <path d="M0 260 C300 140 520 380 760 330 S1180 180 1440 120 V500 H0Z" fill="var(--hill-mid)" />
        </svg>
      </Layer>
      <Layer slot="landHillsFront" className="land__hills land__hills--front">
        <svg viewBox="0 0 1440 500" preserveAspectRatio="none">
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
      </Layer>
    </div>
  );
}
