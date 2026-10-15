import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { gsap, isTouch, prefersReducedMotion } from '../lib/gsap';
import { Media } from './Media';
import { ArrowIcon, ScrubHeading } from './ui';

/**
 * Reference "ABOUT FATNINJA": scrubbed headline, three character cards that fan out
 * (rotate/spread) as they scroll in, speech-bubble tags above them, then a second scrubbed statement.
 */
export function About() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const s = lang === 'fa' ? -1 : 1;
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: q('.fan')[0], start: 'top 95%', end: 'center 55%', scrub: 0.6 },
      });
      tl.fromTo(q('.fan__card--1'), { xPercent: 95 * s, rotate: 0, y: 80 }, { xPercent: 0, rotate: -8 * s, y: 0 }, 0)
        .fromTo(q('.fan__card--2'), { rotate: 0, y: 120 }, { rotate: 3 * s, y: -18 }, 0)
        .fromTo(q('.fan__card--3'), { xPercent: -95 * s, rotate: 0, y: 80 }, { xPercent: 0, rotate: 9 * s, y: 0 }, 0)
        .fromTo(q('.fan__tag'), { autoAlpha: 0, scale: 0.6, y: 20 }, { autoAlpha: 1, scale: 1, y: 0, stagger: 0.15 }, 0.4);
      // Idle bob on the tags.
      gsap.to(q('.fan__tag--1'), { y: -8, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
      gsap.to(q('.fan__tag--2'), { y: -10, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.4 });
    },
    [lang],
    root,
  );

  // Hover (as in the reference): the card under the cursor straightens, grows and comes forward;
  // its neighbours lean a little further away. Animates the inner wrapper so the scroll-driven
  // fan rotation on the outer card is never disturbed.
  useEffect(() => {
    const el = root.current;
    if (!el || isTouch() || prefersReducedMotion()) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.fan__card'));
    const inners = cards.map((c) => c.querySelector<HTMLElement>('.fan__inner')!);
    const focus = (i: number | null) => {
      cards.forEach((card, j) => {
        const outer = Number(gsap.getProperty(card, 'rotate')) || 0;
        const active = i === j;
        gsap.to(inners[j], {
          rotate: i === null ? 0 : active ? -outer : outer * 0.45,
          scale: i === null ? 1 : active ? 1.08 : 0.96,
          y: active ? -14 : 0,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        card.style.zIndex = active ? '5' : '';
      });
    };
    const offs = cards.map((card, i) => {
      const enter = () => focus(i);
      card.addEventListener('pointerenter', enter);
      return () => card.removeEventListener('pointerenter', enter);
    });
    const fan = el.querySelector<HTMLElement>('.fan')!;
    const leave = () => focus(null);
    fan.addEventListener('pointerleave', leave);
    return () => {
      offs.forEach((o) => o());
      fan.removeEventListener('pointerleave', leave);
      inners.forEach((n) => gsap.set(n, { rotate: 0, scale: 1, y: 0 }));
    };
  }, [lang]);

  return (
    <section ref={root} id="about" className="about section" tabIndex={-1} aria-labelledby="about-title">
      <p className="eyebrow">{t.about.label}</p>
      <ScrubHeading text={t.about.statement} id="about-title" className="about__statement" />
      <div className="fan">
        <span className="fan__tag fan__tag--1">{t.about.tags[0]}</span>
        <span className="fan__tag fan__tag--2">{t.about.tags[1]}</span>
        {t.about.cards.map((c, i) => (
          <article key={i} className={`fan__card fan__card--${i + 1}`}>
            <div className="fan__inner char-card">
              <Media slot={(['about1', 'about2', 'about3'] as const)[i]} alt={c.alt} />
              <div className="glass-chip glass-chip--sm">
                <div>
                  <span className="glass-chip__label">{c.label}:</span>
                  <strong className="glass-chip__value">{c.value}</strong>
                </div>
                <span className="round-lime" aria-hidden="true">
                  <ArrowIcon className="flip-x" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <ScrubHeading text={t.about.statement2} as="p" className="about__statement about__statement--2" />
    </section>
  );
}
