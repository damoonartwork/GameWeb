import { useRef } from 'react';
import { formatIndex, useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { dur, ease, gsap, prefersReducedMotion, revealOnScroll } from '../lib/gsap';
import { Media } from './Media';
import { SplitText } from './SplitText';

/**
 * Identity statement that "inks in" word by word as you scroll through it,
 * two layered artworks moving at different depths, and three pillars with drawn rules.
 */
export function About() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);

      gsap.fromTo(
        q('.about__statement .sw-i'),
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: q('.about__statement')[0], start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      );

      revealOnScroll(q('.about__label')[0], gsap.from(q('.about__label'), { autoAlpha: 0, y: 16, duration: dur.m, ease: ease.soft }));

      const imgA = q('.about__img--a')[0];
      const imgB = q('.about__img--b')[0];
      revealOnScroll(
        imgA,
        gsap
          .timeline()
          .from(imgA.querySelector('.media'), { clipPath: 'inset(0% 0% 100% 0%)', duration: dur.xl, ease: ease.inOut })
          .from(imgA.querySelector('.media__inner'), { scale: 1.4, duration: 2, ease: ease.out }, 0)
          .from(imgB.querySelector('.media'), { clipPath: 'inset(100% 0% 0% 0%)', duration: dur.l, ease: ease.inOut }, 0.4),
        'top 80%',
      );
      gsap.to(imgA, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to(imgB, { yPercent: -35, rotate: lang === 'fa' ? -6 : 6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });

      q('.pillar').forEach((p, i) => {
        revealOnScroll(
          p,
          gsap
            .timeline({ delay: i * 0.12 })
            .from(p.querySelector('.pillar__rule'), { scaleX: 0, duration: dur.l, ease: ease.inOut })
            .from(p.querySelectorAll('.pillar__num, .pillar__title, .pillar__text'), { y: 30, autoAlpha: 0, duration: dur.m, ease: ease.out, stagger: 0.08 }, 0.3),
          'top 90%',
        );
      });
    },
    [lang],
    root,
  );

  return (
    <section ref={root} id="about" className="about section" tabIndex={-1} aria-labelledby="about-label">
      <div className="about__grid">
        <div className="about__text">
          <p id="about-label" className="label about__label">
            <span className="dot" aria-hidden="true" />
            {t.about.label}
          </p>
          <SplitText as="p" text={t.about.statement} mask={false} className="about__statement" />
        </div>
        <div className="about__art">
          <div className="about__img about__img--a">
            <Media slot="about1" alt={t.about.alts.a} />
          </div>
          <div className="about__img about__img--b">
            <Media slot="about2" alt={t.about.alts.b} />
          </div>
        </div>
      </div>
      <ul className="pillars">
        {t.about.pillars.map((p, i) => (
          <li className="pillar" key={i}>
            <span className="pillar__rule" aria-hidden="true" />
            <span className="pillar__num" aria-hidden="true">
              ({formatIndex(i + 1, lang)})
            </span>
            <h3 className="pillar__title">{p.title}</h3>
            <p className="pillar__text">{p.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
