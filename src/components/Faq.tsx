import { useRef, useState } from 'react';
import { useLanguage, formatIndex } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { gsap, prefersReducedMotion, revealOnScroll, ScrollTrigger } from '../lib/gsap';
import { SectionHead } from './ui';

/** Reference FAQ: numbered outlined rows with a lime "+" that turns into "×"; answers slide open. */
export function Faq() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealOnScroll(q('.faq__list')[0], gsap.from(q('.faq__item'), { y: 40, autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }));
    },
    [lang],
    root,
  );

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    const items = root.current!.querySelectorAll<HTMLElement>('.faq__answer');
    const reduced = prefersReducedMotion();
    items.forEach((el, j) => {
      const show = j === next;
      gsap.to(el, {
        height: show ? 'auto' : 0,
        duration: reduced ? 0 : 0.5,
        ease: 'power3.inOut',
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
    setOpen(next);
  };

  return (
    <section ref={root} id="faq" className="faq section" tabIndex={-1} aria-labelledby="faq-title">
      <SectionHead id="faq-title" label={t.faq.label} title={t.faq.title} text={t.faq.text} scrub />
      <ul className="faq__list">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
              <h3>
                <button
                  type="button"
                  className="faq__q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => toggle(i)}
                >
                  <span>
                    {formatIndex(i + 1, lang, 1)}. {item.q}
                  </span>
                  <span className="faq__icon" aria-hidden="true" />
                </button>
              </h3>
              <div className="faq__answer" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} aria-hidden={!isOpen}>
                <p>{item.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
