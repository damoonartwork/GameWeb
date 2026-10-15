import { useMemo, useRef } from 'react';
import { digitalTiles, formatPrice, productById } from '../../config/store';
import { useLanguage } from '../../i18n/LanguageContext';
import { useGsap } from '../../hooks/useGsap';
import { useTilt } from '../../hooks/useTilt';
import { gsap, prefersReducedMotion, revealOnScroll } from '../../lib/gsap';
import { scrollToTarget } from '../../lib/scroll';
import { useCart, useShopFilter } from '../../store/CartContext';
import { Media } from '../Media';
import { fileUrl } from '../../config/assets';
import { SectionHead } from '../ui';
import { productHref } from '../../lib/router';

/** Reference "محصولات دیجیتال": gift-card shaped tiles + a wide banner leading to all gift cards. */
export function Digital() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const { add, justAdded } = useCart();
  const { setFilter } = useShopFilter();

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealOnScroll(
        q('.gifts')[0],
        gsap.from(q('.gift'), { y: 70, rotate: (i) => (i % 2 ? 4 : -4), autoAlpha: 0, duration: 0.9, ease: 'back.out(1.4)', stagger: 0.08 }),
      );
      revealOnScroll(q('.gift-banner')[0], gsap.from(q('.gift-banner'), { y: 50, autoAlpha: 0, duration: 0.9, ease: 'power3.out' }));
    },
    [lang],
    root,
  );
  useTilt(root, '.gift', [lang], 10);

  // Banner: 7 tilted columns, each holding all gift cards in its own random order.
  const columns = useMemo(
    () =>
      Array.from({ length: 7 }, () => {
        const c = [...digitalTiles];
        for (let i = c.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [c[i], c[j]] = [c[j], c[i]];
        }
        return c;
      }),
    [],
  );

  return (
    <section ref={root} id="digital" className="digital section" tabIndex={-1} aria-labelledby="digital-title">
      <SectionHead id="digital-title" label={t.digital.label} title={t.digital.title} text={t.digital.text} scrub />
      <ul className="gifts">
        {digitalTiles.map(({ id, color }) => {
          const p = productById(id);
          if (!p) return null;
          return (
            <li key={id}>
              <article className="gift" style={{ ['--gift' as string]: color }}>
                <span className="gift__hole" aria-hidden="true" />
                <div className="gift__art">
                  <Media file={p.image} ratio={1} size="800×800 PNG/WebP" alt={p.name[lang]} className="media--cutout" />
                </div>
                <div className="gift__foot">
                  <h3 className="gift__name">
                    <a href={productHref(p.id)}>{p.name[lang]}</a>
                  </h3>
                  <p className="gift__price">
                    {t.product.from} {formatPrice(p.price, lang)} {t.product.currency}
                  </p>
                  <button type="button" className="gift__add" onClick={() => add(p.id)} aria-label={`${t.product.addToCart}: ${p.name[lang]}`}>
                    {justAdded === p.id ? t.product.added : t.product.addToCart}
                  </button>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      <div className="gift-banner">
        <div className="gift-banner__cards" aria-hidden="true">
          {columns.map((col, c) => (
            <div key={c} className={`gift-banner__col gift-banner__col--${c % 2 ? 'down' : 'up'}`}>
              {/* the column's cards twice, so the -50% loop is seamless */}
              <div className="gift-banner__strip" style={{ animationDuration: `${22 + (c % 3) * 4}s` }}>
                {col.concat(col).map(({ id, color }, i) => {
                  // Same artwork as the tiles above (gift-*.png); just the colour block until it exists.
                  const p = productById(id);
                  const url = p ? fileUrl(p.image) : null;
                  return (
                    <span key={i} className="gift-banner__card" style={{ ['--gift' as string]: color }} data-id={id}>
                      {url && <img src={url} alt="" loading="lazy" decoding="async" draggable={false} />}
                      {p && <span className="gift-banner__label">{p.name[lang]}</span>}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="gift-banner__copy">
          <h3 className="display">{t.digital.bannerTitle}</h3>
          <p>{t.digital.bannerText}</p>
          <button
            type="button"
            className="btn-lime"
            onClick={() => {
              setFilter({ category: 'digital', maxPrice: 0 });
              scrollToTarget('#shop');
            }}
          >
            {t.digital.bannerCta}
          </button>
        </div>
      </div>
    </section>
  );
}
