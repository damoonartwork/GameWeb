import { useRef } from 'react';
import { formatIndex, useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/gsap';
import { SectionHead } from './ui';

/**
 * Reference roadmap: a vertical track down the centre with numbered steel badges, phases
 * alternating sides. The track fills as you scroll; each phase brightens from dim grey and its
 * badge lights up when it reaches the middle of the screen.
 */
export function Roadmap() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q('.road__fill'),
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: q('.road')[0], start: 'top 55%', end: 'bottom 55%', scrub: true } },
      );
      q('.phase').forEach((el) => {
        gsap.fromTo(
          el.querySelector('.phase__body'),
          { autoAlpha: 0.15, y: 30 },
          { autoAlpha: 1, y: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 55%', scrub: true } },
        );
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          toggleClass: { targets: el, className: 'is-active' },
        });
      });
    },
    [lang],
    root,
  );

  return (
    <section ref={root} id="process" className="roadmap section" tabIndex={-1} aria-labelledby="road-title">
      <SectionHead id="road-title" label={t.roadmap.label} title={t.roadmap.title} />
      <ol className="road">
        <span className="road__track" aria-hidden="true">
          <span className="road__fill" />
        </span>
        {t.roadmap.items.map((p, i) => (
          <li key={i} className={`phase ${i % 2 ? 'phase--end' : 'phase--start'}`}>
            <span className="phase__badge" aria-hidden="true">
              {formatIndex(i + 1, lang, 1)}
            </span>
            <div className="phase__body">
              <p className="phase__label">
                {t.roadmap.phase} {formatIndex(i + 1, lang, 1)}
              </p>
              <h3 className="phase__title">{p.title}</h3>
              <ul className="phase__points">
                {p.points.map((pt, j) => (
                  <li key={j}>{pt}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
