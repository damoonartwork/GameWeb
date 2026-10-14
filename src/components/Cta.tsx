import { useEffect, useRef } from 'react';
import { brand } from '../config/brand';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { dur, ease, gsap, isTouch, prefersReducedMotion, revealOnScroll } from '../lib/gsap';
import { Media } from './Media';
import { SplitText } from './SplitText';
import { useAnchorClick } from './Navigation';

/** Ink-inverted closing section: masked headline, floating artwork, magnetic primary action. */
export function Cta() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const magnet = useRef<HTMLAnchorElement>(null);
  const onAnchor = useAnchorClick();
  const primaryHref = brand.ctaHref || (brand.email ? `mailto:${brand.email}` : '#work');

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealOnScroll(
        q('.cta__title')[0],
        gsap
          .timeline()
          .from(q('.cta__title .sc, .cta__title .sw-i'), { yPercent: 115, duration: dur.l, ease: ease.out, stagger: 0.025 })
          .from(q('.cta__label, .cta__text, .cta__actions > *'), { y: 24, autoAlpha: 0, duration: dur.m, ease: ease.soft, stagger: 0.08 }, 0.4)
          .from(q('.cta__art .media'), { clipPath: 'inset(50% 50% 50% 50% round 50%)', duration: dur.xl, ease: ease.inOut }, 0.1),
        'top 75%',
      );
      gsap.to(q('.cta__art'), { yPercent: -25, rotate: lang === 'fa' ? 8 : -8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    },
    [lang],
    root,
  );

  // Magnetic pull on the primary button (pointer devices only).
  useEffect(() => {
    const el = magnet.current;
    if (!el || isTouch() || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <section ref={root} id="contact" className="cta" tabIndex={-1} aria-labelledby="cta-title">
      <div className="cta__inner section">
        <p className="label cta__label">
          <span className="dot" aria-hidden="true" />
          {t.cta.label}
        </p>
        <h2 id="cta-title" className="display cta__title" aria-label={t.cta.title.join(' ')}>
          {t.cta.title.map((line, i) => (
            <SplitText key={`${lang}-${i}`} text={line} split="chars" className="display__line" />
          ))}
        </h2>
        <div className="cta__art">
          <Media slot="cta" alt={t.cta.alt} />
        </div>
        <p className="cta__text">{t.cta.text}</p>
        <div className="cta__actions">
          <a
            ref={magnet}
            className="cta__primary"
            href={primaryHref}
            onClick={primaryHref.startsWith('#') ? onAnchor : undefined}
          >
            <span>{t.cta.primary}</span>
          </a>
          <a className="btn btn--light" href="#work" onClick={onAnchor}>
            <span className="btn__label" data-text={t.cta.secondary}>
              {t.cta.secondary}
            </span>
            <span className="btn__arrow flip-x" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
