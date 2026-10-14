import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { gsap, prefersReducedMotion, revealOnScroll } from '../lib/gsap';
import { Media } from './Media';
import { useAnchorClick } from './Navigation';
import { ArrowIcon, SectionHead } from './ui';

/**
 * Reference "UNLOCK THE PERKS": two staggered columns of dark cards (bento/masonry),
 * artwork anchored to the bottom of each card, and a CTA card. Cards rise in one by one;
 * hover lifts the card, lights its border and nudges the artwork.
 */
export function Features() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const onAnchor = useAnchorClick();
  const slots = ['feature1', 'feature2', 'feature3'] as const;

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>('.perk', root.current).forEach((card) => {
        const tl = gsap.timeline().from(card, { y: 80, autoAlpha: 0, duration: 1, ease: 'power3.out' });
        const art = card.querySelector('.perk__art');
        if (art) tl.from(art, { y: 60, scale: 0.92, duration: 1.2, ease: 'power3.out' }, 0.1);
        revealOnScroll(card, tl, 'top 92%');
      });
    },
    [lang],
    root,
  );

  const [a, b, c] = t.features.items;
  return (
    <section ref={root} id="features" className="features section" tabIndex={-1} aria-labelledby="features-title">
      <SectionHead id="features-title" label={t.features.label} title={t.features.title} text={t.features.text} scrub />
      <div className="perks">
        <div className="perks__col">
          <article className="perk perk--tall">
            <h3 className="perk__title">{a.title}</h3>
            <p className="perk__text">{a.text}</p>
            <div className="perk__art">
              <Media slot={slots[0]} alt={a.alt} className="media--cutout" />
            </div>
          </article>
          <article className="perk">
            <h3 className="perk__title">{c.title}</h3>
            <p className="perk__text">{c.text}</p>
            <div className="perk__art perk__art--sm">
              <Media slot={slots[2]} alt={c.alt} className="media--cutout" />
            </div>
          </article>
        </div>
        <div className="perks__col perks__col--offset">
          <article className="perk perk--tall">
            <h3 className="perk__title">{b.title}</h3>
            <p className="perk__text">{b.text}</p>
            <div className="perk__art">
              <Media slot={slots[1]} alt={b.alt} className="media--cutout" />
            </div>
          </article>
          <article className="perk perk--cta">
            <h3 className="perk__title">{t.features.cardCta.title}</h3>
            <p className="perk__text">{t.features.cardCta.text}</p>
            <a href="#contact" className="btn-lime" onClick={onAnchor}>
              {t.features.cardCta.button} <ArrowIcon className="flip-x" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
