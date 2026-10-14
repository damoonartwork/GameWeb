import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { dur, ease, gsap, prefersReducedMotion, revealOnScroll } from '../lib/gsap';
import { Media } from './Media';
import { SplitText } from './SplitText';

/**
 * Signature sequence (pinned, scrubbed):
 *  1. the title halves sit either side of a small framed artwork
 *  2. the frame opens to full-bleed while the halves slide apart
 *  3. two portrait artworks rise over it with captions, then the pin releases.
 * Mobile keeps the same story with a shorter pin; reduced motion shows the final composition.
 */
export function Showcase() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ desktop: '(min-width: 900px)', mobile: '(max-width: 899px)' }, (ctx) => {
        const desktop = ctx.conditions?.desktop;
        const sign = lang === 'fa' ? -1 : 1;
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: q('.showcase__stage')[0],
            start: 'top top',
            end: desktop ? '+=220%' : '+=150%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });
        tl.fromTo(
          q('.showcase__main .media'),
          { clipPath: desktop ? 'inset(28% 34% 28% 34% round 24px)' : 'inset(30% 18% 30% 18% round 18px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1, ease: 'power2.inOut' },
        )
          .fromTo(q('.showcase__main .media__inner'), { scale: 1.5 }, { scale: 1, duration: 1, ease: 'power2.inOut' }, 0)
          .to(q('.showcase__half--a'), { xPercent: -60 * sign, duration: 1, ease: 'power2.inOut' }, 0)
          .to(q('.showcase__half--b'), { xPercent: 60 * sign, duration: 1, ease: 'power2.inOut' }, 0)
          .to(q('.showcase__title'), { autoAlpha: 0, duration: 0.3 }, 0.7)
          .fromTo(q('.showcase__card--1'), { yPercent: 140, rotate: -6 }, { yPercent: 0, rotate: -3, duration: 0.8, ease: 'power3.out' }, 1)
          .fromTo(q('.showcase__card--2'), { yPercent: 170, rotate: 8 }, { yPercent: 0, rotate: 4, duration: 0.8, ease: 'power3.out' }, 1.15)
          .fromTo(q('.showcase__caption'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.1 }, 1.3)
          .to({}, { duration: 0.3 }); // short hold before the pin releases
      });

      revealOnScroll(
        q('.showcase__intro')[0],
        gsap.from(q('.showcase__intro > *'), { y: 30, autoAlpha: 0, duration: dur.m, ease: ease.out, stagger: 0.1 }),
      );

      return () => mm.revert();
    },
    [lang],
    root,
  );

  return (
    <section ref={root} id="showcase" className="showcase" tabIndex={-1} aria-labelledby="showcase-title">
      <div className="showcase__intro section">
        <p className="label">
          <span className="dot" aria-hidden="true" />
          {t.showcase.label}
        </p>
        <p className="showcase__text">{t.showcase.text}</p>
      </div>
      <div className="showcase__stage">
        <div className="showcase__main">
          <Media slot="showcaseMain" alt={t.showcase.alts.main} fill />
          <span className="showcase__caption showcase__caption--main">{t.showcase.captions[0]}</span>
        </div>
        <h2 id="showcase-title" className="showcase__title display" aria-label={t.showcase.title.join(' ')}>
          <span className="showcase__half showcase__half--a">
            <SplitText text={t.showcase.title[0]} mask={false} />
          </span>
          <span className="showcase__half showcase__half--b">
            <SplitText text={t.showcase.title[1]} mask={false} />
          </span>
        </h2>
        <figure className="showcase__card showcase__card--1">
          <Media slot="showcase1" alt={t.showcase.alts.a} />
          <figcaption className="showcase__caption">{t.showcase.captions[1]}</figcaption>
        </figure>
        <figure className="showcase__card showcase__card--2">
          <Media slot="showcase2" alt={t.showcase.alts.b} />
          <figcaption className="showcase__caption">{t.showcase.captions[2]}</figcaption>
        </figure>
      </div>
    </section>
  );
}
