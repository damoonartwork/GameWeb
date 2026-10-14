import { useRef } from 'react';
import { projects } from '../config/projects';
import { formatIndex, useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { dur, ease, gsap, prefersReducedMotion, revealOnScroll } from '../lib/gsap';
import { Media } from './Media';
import { SplitText } from './SplitText';

const variants = ['lg', 'sm', 'md', 'sm', 'lg'] as const;

/**
 * Featured work. Desktop: the section pins and the cards travel horizontally with the scroll
 * (direction follows the language: RTL travels the other way). Each card's artwork unmasks as it
 * enters and drifts inside its frame. Mobile/tablet: a staggered vertical stack with reveals.
 */
export function Projects() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      const q = gsap.utils.selector(root);
      if (prefersReducedMotion()) return;

      revealOnScroll(
        q('.projects__head')[0],
        gsap
          .timeline()
          .from(q('.projects__head .sc, .projects__head .sw-i'), { yPercent: 115, duration: dur.l, ease: ease.out, stagger: 0.02 })
          .from(q('.projects__intro, .projects__label'), { autoAlpha: 0, y: 20, duration: dur.m, ease: ease.soft }, 0.3),
      );

      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        const track = q('.projects__track')[0] as HTMLElement;
        const viewport = q('.projects__viewport')[0] as HTMLElement;
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        const sign = lang === 'fa' ? 1 : -1;
        const scrollTween = gsap.to(track, {
          x: () => distance() * sign,
          ease: 'none',
          scrollTrigger: {
            trigger: q('.projects__pin')[0],
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.to(q('.projects__progress span'), {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: q('.projects__pin')[0], start: 'top top', end: () => `+=${distance()}`, scrub: true },
        });

        q('.project').forEach((card, i) => {
          const media = card.querySelector('.media');
          const inner = card.querySelector('.media__inner');
          const startPos = sign < 0 ? 'left 95%' : 'right 5%';
          if (i > 0) {
            gsap.fromTo(
              media,
              { clipPath: sign < 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                ease: 'none',
                scrollTrigger: { trigger: card, containerAnimation: scrollTween, start: startPos, end: sign < 0 ? 'left 55%' : 'right 45%', scrub: true },
              },
            );
          }
          gsap.fromTo(
            inner,
            { xPercent: -6 * sign, scale: 1.12 },
            {
              xPercent: 6 * sign,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: scrollTween, start: sign < 0 ? 'left right' : 'right left', end: sign < 0 ? 'right left' : 'left right', scrub: true },
            },
          );
        });
      });

      mm.add('(max-width: 899px)', () => {
        q('.project').forEach((card) => {
          revealOnScroll(
            card,
            gsap
              .timeline()
              .from(card.querySelector('.media'), { clipPath: 'inset(100% 0% 0% 0%)', duration: dur.l, ease: ease.inOut })
              .from(card.querySelector('.media__inner'), { scale: 1.3, duration: dur.xl, ease: ease.out }, 0)
              .from(card.querySelectorAll('.project__meta > *'), { y: 24, autoAlpha: 0, stagger: 0.08, duration: dur.m, ease: ease.soft }, 0.4),
            'top 88%',
          );
        });
      });

      return () => mm.revert();
    },
    [lang],
    root,
  );

  return (
    <section ref={root} id="work" className="projects" tabIndex={-1} aria-labelledby="projects-title">
      <div className="projects__pin">
        <div className="projects__viewport">
          <div className="projects__track">
            <header className="projects__head">
              <p className="label projects__label">
                <span className="dot" aria-hidden="true" />
                {t.projects.label}
              </p>
              <h2 id="projects-title" className="display projects__title" aria-label={t.projects.title.join(' ')}>
                {t.projects.title.map((line, i) => (
                  <SplitText key={`${lang}-${i}`} text={line} split="chars" className="display__line" />
                ))}
              </h2>
              <p className="projects__intro">{t.projects.intro}</p>
              <p className="projects__hint" aria-hidden="true">
                {t.projects.drag} <span className="projects__hint-arrow">→</span>
              </p>
            </header>

            {projects.map((p, i) => {
              const copy = t.projects.items[i];
              if (!copy) return null;
              const Tag = p.href ? 'a' : 'div';
              return (
                <article key={p.slot} className={`project project--${variants[i % variants.length]}`}>
                  <Tag className="project__link" {...(p.href ? { href: p.href } : {})}>
                    <span className="project__index" aria-hidden="true">
                      {formatIndex(i + 1, lang)}
                    </span>
                    <div className="project__frame">
                      <Media slot={p.slot} alt={copy.alt} />
                      {p.href && (
                        <span className="project__view" aria-hidden="true">
                          {t.projects.view} <span className="flip-x">↗</span>
                        </span>
                      )}
                    </div>
                    <div className="project__meta">
                      <span className="project__cat">{copy.category}</span>
                      <h3 className="project__title">
                        <span className="u-line">{copy.title}</span>
                      </h3>
                      <p className="project__desc">{copy.description}</p>
                    </div>
                  </Tag>
                </article>
              );
            })}
          </div>
        </div>
        <div className="projects__progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
