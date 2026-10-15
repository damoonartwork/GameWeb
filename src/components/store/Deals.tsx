import { useEffect, useRef, useState } from 'react';
import { deals, dealsEndAt } from '../../config/store';
import { formatIndex, useLanguage } from '../../i18n/LanguageContext';
import { useGsap } from '../../hooks/useGsap';
import { useTilt } from '../../hooks/useTilt';
import { gsap, prefersReducedMotion, revealOnScroll } from '../../lib/gsap';
import { useAnchorClick } from '../Navigation';
import { ProductCard } from './ProductCard';

function endTime() {
  if (dealsEndAt) return new Date(dealsEndAt).getTime();
  const d = new Date();
  d.setHours(24, 0, 0, 0); // midnight tonight
  return d.getTime();
}

/** Flash-deals band (reference: "نخل تایم"): countdown + horizontally scrolling discounted products. */
export function Deals() {
  const { t, lang, dir } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const onAnchor = useAnchorClick();
  const [left, setLeft] = useState(() => Math.max(0, endTime() - Date.now()));
  const items = deals();

  useEffect(() => {
    let end = endTime();
    const id = window.setInterval(() => {
      let ms = end - Date.now();
      if (ms <= 0 && !dealsEndAt) {
        end = endTime(); // daily deals roll over at midnight
        ms = end - Date.now();
      }
      setLeft(Math.max(0, ms));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealOnScroll(
        q('.deals')[0],
        gsap
          .timeline()
          .from(q('.deals'), { y: 60, autoAlpha: 0, duration: 0.9, ease: 'power3.out' })
          .from(q('.deals .pcard'), { y: 40, autoAlpha: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07 }, 0.3),
      );
    },
    [lang],
    root,
  );
  useTilt(root, '.pcard', [lang], 6);

  const scroll = (step: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    // "next" moves in reading direction: right in LTR, left in RTL
    const amount = el.clientWidth * 0.8 * step * (dir === 'rtl' ? -1 : 1);
    el.scrollBy({ left: amount, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const s = Math.floor(left / 1000);
  const parts = [
    [Math.floor(s / 3600), t.deals.units.h],
    [Math.floor((s % 3600) / 60), t.deals.units.m],
    [s % 60, t.deals.units.s],
  ] as const;

  return (
    <section ref={root} id="deals" className="deals-section section" tabIndex={-1} aria-labelledby="deals-title">
      <div className="deals">
        <header className="deals__head">
          <div>
            <p className="eyebrow">{t.deals.label}</p>
            <h2 id="deals-title" className="display deals__title">
              <span className="deals__pct" aria-hidden="true">%</span>
              {t.deals.title}
            </h2>
          </div>
          <div className="deals__timer" role="timer" aria-label={t.deals.endsIn}>
            <span className="deals__timer-label">{t.deals.endsIn}</span>
            {parts.map(([v, u], i) => (
              <span key={i} className="deals__time">
                <strong>{formatIndex(v, lang)}</strong>
                <small>{u}</small>
              </span>
            ))}
          </div>
          <a href="#shop" className="deals__all" onClick={onAnchor}>
            {t.deals.viewAll} <span className="flip-x" aria-hidden="true">→</span>
          </a>
        </header>
        <div className="deals__body">
          <button type="button" className="deals__nav deals__nav--prev" onClick={() => scroll(-1)} aria-label={t.deals.prev}>
            <span className="flip-x" aria-hidden="true">‹</span>
          </button>
          <div ref={track} className="deals__track" tabIndex={0}>
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <button type="button" className="deals__nav deals__nav--next" onClick={() => scroll(1)} aria-label={t.deals.next}>
            <span className="flip-x" aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </section>
  );
}
