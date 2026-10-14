import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { dur, ease, gsap, isTouch, prefersReducedMotion } from '../lib/gsap';
import { Media } from './Media';
import { SplitText } from './SplitText';
import { useAnchorClick } from './Navigation';
import { RotatingBadge } from './RotatingBadge';

/**
 * Hero: three oversized type lines with the main artwork layered *between* them
 * (solid type behind the image, an outline copy of line 2 in front of it), two satellite
 * artworks, a rotating badge, and the intro/CTA row.
 */
export function Hero({ introReady }: { introReady: boolean }) {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const introPlayed = useRef(false);
  const onAnchor = useAnchorClick();

  useGsap(
    () => {
      const reduced = prefersReducedMotion();
      const q = gsap.utils.selector(root);
      const letters = q('.hero__line .sc, .hero__line .sw-i');

      // ---- Intro (runs once; a language switch afterwards shows the final state directly) ----
      if (!introPlayed.current && !reduced) {
        gsap.set(letters, { yPercent: 115 });
        gsap.set(q('.hero__main .media'), { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(q('.hero__main .media__inner'), { scale: 1.35 });
        gsap.set(q('.hero__side .media'), { clipPath: 'inset(50% 50% 50% 50%)' });
        gsap.set(q('.hero__outline'), { autoAlpha: 0 });
        gsap.set(q('.hero__eyebrow, .hero__sub .sw-i, .hero__cta, .hero__scroll'), { yPercent: 110, autoAlpha: 0 });
        gsap.set(q('.badge'), { scale: 0, rotate: -90 });
      }

      if (introReady && !introPlayed.current) {
        introPlayed.current = true;
        if (!reduced) {
          const tl = gsap.timeline({ defaults: { ease: ease.out } });
          tl.to(letters, { yPercent: 0, duration: dur.l, stagger: { each: 0.028, from: 'start' } }, 0)
            .to(q('.hero__main .media'), { clipPath: 'inset(0% 0% 0% 0%)', duration: dur.xl, ease: ease.inOut }, 0.1)
            .to(q('.hero__main .media__inner'), { scale: 1, duration: 2, ease: ease.out }, 0.25)
            .to(q('.hero__side .media'), { clipPath: 'inset(0% 0% 0% 0%)', duration: dur.l, ease: ease.inOut, stagger: 0.15 }, 0.55)
            .to(q('.hero__outline'), { autoAlpha: 1, duration: dur.m }, 0.9)
            .to(q('.hero__eyebrow, .hero__sub .sw-i, .hero__cta, .hero__scroll'), { yPercent: 0, autoAlpha: 1, duration: dur.m, stagger: 0.03 }, 0.7)
            .to(q('.badge'), { scale: 1, rotate: 0, duration: dur.l, ease: 'back.out(1.6)' }, 1);
        }
      }

      if (reduced) return;

      // ---- Scroll: the composition pulls apart as the hero leaves ----
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      const sign = lang === 'fa' ? -1 : 1;
      gsap.to(q('.hero__line--0'), { xPercent: -8 * sign, ease: 'none', scrollTrigger: st });
      gsap.to(q('.hero__line--1, .hero__outline'), { xPercent: 10 * sign, ease: 'none', scrollTrigger: st });
      gsap.to(q('.hero__line--2'), { xPercent: -5 * sign, ease: 'none', scrollTrigger: st });
      gsap.to(q('.hero__main'), { yPercent: -18, ease: 'none', scrollTrigger: st });
      gsap.to(q('.hero__side--1'), { yPercent: -45, rotate: -8, ease: 'none', scrollTrigger: st });
      gsap.to(q('.hero__side--2'), { yPercent: -80, rotate: 10, ease: 'none', scrollTrigger: st });
    },
    [introReady, lang],
    root,
  );

  // Pointer depth: each layer follows the cursor at its own depth (desktop only).
  useEffect(() => {
    if (prefersReducedMotion() || isTouch() || !root.current) return;
    const layers = Array.from(root.current.querySelectorAll<HTMLElement>('[data-depth]')).map((el) => ({
      depth: Number(el.dataset.depth),
      x: gsap.quickTo(el, 'x', { duration: 1.1, ease: ease.soft }),
      y: gsap.quickTo(el, 'y', { duration: 1.1, ease: ease.soft }),
    }));
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      for (const l of layers) {
        l.x(nx * l.depth);
        l.y(ny * l.depth);
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [lang]);

  return (
    <section ref={root} id="top" className="hero" aria-labelledby="hero-title">
      <p className="hero__eyebrow">
        <span className="dot" aria-hidden="true" />
        {t.hero.eyebrow}
      </p>

      <h1 id="hero-title" className="hero__title" aria-label={t.hero.lines.join(' ')}>
        {t.hero.lines.map((line, i) => (
          <SplitText key={`${lang}-${i}`} text={line} split="chars" className={`hero__line hero__line--${i}`} />
        ))}
        {/* Outline copy of line 2: shares its grid cell but stacks *above* the main artwork. */}
        <span className="hero__outline" aria-hidden="true">
          {t.hero.lines[1]}
        </span>
      </h1>

      <div className="hero__main" data-depth="-18">
        <Media slot="heroMain" alt={t.hero.alts.main} priority />
      </div>

      <div className="hero__side hero__side--1" data-depth="34">
        <Media slot="heroSide1" alt={t.hero.alts.side1} priority />
      </div>
      <div className="hero__side hero__side--2" data-depth="52">
        <Media slot="heroSide2" alt={t.hero.alts.side2} priority />
      </div>

      <div className="hero__badge" data-depth="24">
        <RotatingBadge text={t.hero.badge} />
      </div>

      <div className="hero__bottom">
        <SplitText as="p" text={t.hero.sub} className="hero__sub" />
        <a href="#work" className="btn hero__cta" onClick={onAnchor}>
          <span className="btn__label" data-text={t.hero.cta}>
            {t.hero.cta}
          </span>
          <span className="btn__arrow" aria-hidden="true">
            ↓
          </span>
        </a>
        <span className="hero__scroll" aria-hidden="true">
          <span className="hero__scroll-line" />
          {t.hero.scroll}
        </span>
      </div>
    </section>
  );
}
