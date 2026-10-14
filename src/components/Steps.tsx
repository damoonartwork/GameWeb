import { useRef, useState } from 'react';
import { brand } from '../config/brand';
import { formatIndex, useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { gsap, prefersReducedMotion, revealOnScroll } from '../lib/gsap';
import { SectionHead } from './ui';

/**
 * Reference "MINT YOUR NINJA IN 3 STEPS": three numbered cards (lime numerals) that rise in
 * sequence, followed by the outlined "grab your link" box with a lime copy button.
 */
export function Steps() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealOnScroll(
        q('.steps__grid')[0],
        gsap.from(q('.step'), { y: 60, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15 }),
      );
      revealOnScroll(q('.linkbox')[0], gsap.from(q('.linkbox, .steps__boxlabel'), { y: 30, autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }));
    },
    [lang],
    root,
  );

  const copy = async () => {
    if (!brand.email) return;
    try {
      await navigator.clipboard.writeText(brand.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the address is still visible to copy by hand */
    }
  };

  return (
    <section ref={root} className="steps section" aria-labelledby="steps-title">
      <SectionHead id="steps-title" label={t.steps.label} title={t.steps.title} text={t.steps.text} scrub />
      <ol className="steps__grid">
        {t.steps.items.map((s, i) => (
          <li key={i} className="step">
            <span className="step__num">{formatIndex(i + 1, lang)}</span>
            <h3 className="step__title">{s.title}</h3>
            <p className="step__text">{s.text}</p>
          </li>
        ))}
      </ol>
      <p className="steps__boxlabel">{t.steps.boxLabel}</p>
      <div className="linkbox">
        <span className={brand.email ? 'linkbox__value' : 'linkbox__value is-empty'} dir="ltr">
          {brand.email || t.steps.boxEmpty}
        </span>
        <button type="button" className="btn-lime" onClick={copy} disabled={!brand.email} aria-live="polite">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M4 16V5a1 1 0 0 1 1-1h11" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          {copied ? t.steps.copied : t.steps.copy}
        </button>
      </div>
    </section>
  );
}
