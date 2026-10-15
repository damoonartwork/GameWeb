import { useRef } from 'react';
import { formatIndex, useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { useTilt } from '../hooks/useTilt';
import { gsap, prefersReducedMotion, revealOnScroll } from '../lib/gsap';
import { SectionHead } from './ui';

/**
 * Reference "MINT YOUR NINJA IN 3 STEPS": three numbered cards (lime numerals) that rise in sequence.
 */
export function Steps() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealOnScroll(
        q('.steps__grid')[0],
        gsap.from(q('.step'), { y: 60, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15 }),
      );
    },
    [lang],
    root,
  );

  useTilt(root, '.step', [lang], 7);

  return (
    <section ref={root} className="steps section" aria-labelledby="steps-title">
      <SectionHead id="steps-title" label={t.steps.label} title={t.steps.title} text={t.steps.text} scrub />
      <ol className="steps__grid">
        {t.steps.items.map((s, i) => (
          <li key={i} className="step tilt-shine">
            <span className="step__num">{formatIndex(i + 1, lang)}</span>
            <h3 className="step__title">{s.title}</h3>
            <p className="step__text">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
