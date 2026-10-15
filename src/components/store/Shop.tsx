import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { budgets, categories, formatPrice, products } from '../../config/store';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTilt } from '../../hooks/useTilt';
import { gsap, prefersReducedMotion, ScrollTrigger } from '../../lib/gsap';
import { useShopFilter } from '../../store/CartContext';
import { SectionHead } from '../ui';
import { ProductCard } from './ProductCard';

/** Cards per row at each breakpoint — must match .shop__grid columns in global.css. */
function useColumns() {
  const get = () => (window.matchMedia('(max-width: 700px)').matches ? 2 : window.matchMedia('(max-width: 1100px)').matches ? 3 : 4);
  const [cols, setCols] = useState(get);
  useEffect(() => {
    const on = () => setCols(get());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return cols;
}

/**
 * Full product grid with category tabs and budget chips (shared filter with Categories + Budget).
 * Shows one row at first; "Show more" reveals the rest.
 */
export function Shop() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const { filter, setFilter } = useShopFilter();
  const cols = useColumns();
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(
    () =>
      products.filter(
        (p) => (filter.category === 'all' || p.category === filter.category) && (!filter.maxPrice || p.price <= filter.maxPrice),
      ),
    [filter],
  );

  const shown = expanded ? visible : visible.slice(0, cols);
  const hidden = visible.length - shown.length;

  // a new filter starts collapsed again
  useEffect(() => setExpanded(false), [filter]);

  // Re-deal the grid whenever the filter changes.
  useLayoutEffect(() => {
    const cards = root.current?.querySelectorAll('.shop__grid .pcard');
    if (cards?.length && !prefersReducedMotion()) {
      gsap.fromTo(cards, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out', stagger: 0.04, overwrite: true });
    }
    ScrollTrigger.refresh();
  }, [filter]);
  // only the newly revealed cards animate in when expanding; heights change either way
  useLayoutEffect(() => {
    if (expanded && !prefersReducedMotion()) {
      const cards = Array.from(root.current?.querySelectorAll('.shop__grid .pcard') ?? []).slice(cols);
      if (cards.length) gsap.fromTo(cards, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out', stagger: 0.03 });
    }
    ScrollTrigger.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);
  useTilt(root, '.pcard', [lang, filter, expanded, cols], 6);

  const millions = (n: number) => formatPrice(n / 1_000_000, lang);

  return (
    <section ref={root} id="shop" className="shop section" tabIndex={-1} aria-labelledby="shop-title">
      <SectionHead id="shop-title" label={t.shop.label} title={t.shop.title} text={t.shop.text} />
      <div className="shop__filters">
        <div className="chips" role="group" aria-label={t.nav.categories}>
          {[{ id: 'all', label: t.shop.all }, ...categories.map((c) => ({ id: c.id, label: c.name[lang] }))].map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={filter.category === c.id}
              onClick={() => setFilter({ category: c.id })}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="chips chips--sm" role="group" aria-label={t.budget.title}>
          {[0, ...budgets].map((b) => (
            <button key={b} type="button" className="chip" aria-pressed={filter.maxPrice === b} onClick={() => setFilter({ maxPrice: b })}>
              {b ? `${t.shop.upTo} ${millions(b)} ${t.budget.million}` : t.shop.anyPrice}
            </button>
          ))}
        </div>
      </div>
      {visible.length ? (
        <div className="shop__grid">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : null}
      {visible.length > cols && (
        <div className="shop__more">
          <button type="button" className="shop__more-btn" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
            {expanded ? t.shop.less : `${t.shop.more} (${formatPrice(hidden, lang)})`}
            <span className={`shop__more-arrow${expanded ? ' is-up' : ''}`} aria-hidden="true">
              ⌄
            </span>
          </button>
        </div>
      )}
      {visible.length ? null : (
        <div className="shop__empty">
          <p>{t.shop.empty}</p>
          <button type="button" className="btn-lime" onClick={() => setFilter({ category: 'all', maxPrice: 0 })}>
            {t.shop.reset}
          </button>
        </div>
      )}
    </section>
  );
}
