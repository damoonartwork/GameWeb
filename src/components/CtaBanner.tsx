import { useRef } from 'react';
import { brand } from '../config/brand';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { gsap, prefersReducedMotion, revealOnScroll } from '../lib/gsap';
import { Media } from './Media';
import { useAnchorClick } from './Navigation';

/** Reference "MINT YOUR NINJA TODAY!": glowing green banner, copy on one side, characters breaking the frame. */
export function CtaBanner() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const onAnchor = useAnchorClick();
  const href = brand.ctaHref || '#shop';

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealOnScroll(
        q('.banner')[0],
        gsap
          .timeline()
          .from(q('.banner'), { y: 80, autoAlpha: 0, scale: 0.96, duration: 1, ease: 'power3.out' })
          .from(q('.banner__copy > *'), { y: 30, autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }, 0.3)
          // rises out of the banner floor: the mask clips it at the bottom, so it emerges from below
          .from(q('.banner__art'), { yPercent: 75, duration: 1.5, ease: 'power3.out' }, 0.15),
        'top 85%',
      );
      gsap.to(q('.banner__glow'), { xPercent: lang === 'fa' ? -12 : 12, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    },
    [lang],
    root,
  );

  return (
    <section ref={root} id="contact" className="cta section" tabIndex={-1} aria-labelledby="cta-title">
      <div className="banner">
        <span className="banner__bg" aria-hidden="true">
          <span className="banner__glow" />
        </span>
        <div className="banner__copy">
          <p className="eyebrow">{t.cta.label}</p>
          <h2 id="cta-title" className="display banner__title">
            {t.cta.title}
          </h2>
          <p className="banner__text">{t.cta.text}</p>
          <a className="btn-lime" href={href} onClick={href.startsWith('#') ? onAnchor : undefined}>
            {t.cta.button}
          </a>
        </div>
        {/* mask = the banner's own shape, open upward: clips the art at the bottom and sides only */}
        <div className="banner__mask">
          <div className="banner__art">
            <Media slot="cta" alt={t.cta.alt} className="media--cutout" fill />
          </div>
        </div>
      </div>
    </section>
  );
}
