import { useEffect, useMemo, useRef, useState } from 'react';
import { fileUrl } from '../../config/assets';
import { productDetails } from '../../config/productDetails';
import { brand } from '../../config/brand';
import { categories, discountPercent, formatPrice, productById, products } from '../../config/store';
import { formatIndex, useLanguage } from '../../i18n/LanguageContext';
import { useGsap } from '../../hooks/useGsap';
import { useTilt } from '../../hooks/useTilt';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { goHome } from '../../lib/router';
import { jumpTo } from '../../lib/scroll';
import { useCart } from '../../store/CartContext';
import { Media } from '../Media';
import { ProductCard } from './ProductCard';

/**
 * Product detail page (`#/product/<id>`): gallery, price + quantity + add to cart,
 * description, highlights, specs and related products from the same category.
 */
export function ProductPage({ id }: { id: string }) {
  const { t, lang } = useLanguage();
  const product = productById(id);
  const root = useRef<HTMLElement>(null);
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);

  // gallery: main image + any product-<id>-2, -3 … files that exist
  const gallery = useMemo(() => {
    if (!product) return [];
    const list = [product.image];
    for (let i = 2; i <= 8; i++) if (fileUrl(`${product.image}-${i}`)) list.push(`${product.image}-${i}`);
    return list;
  }, [product]);

  const category = categories.find((c) => c.id === product?.category);
  const details = product ? productDetails[product.id] : undefined;
  const related = useMemo(
    () => (product ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : []),
    [product],
  );

  // new product → top of page, reset local state, update the tab title
  useEffect(() => {
    jumpTo(0);
    setQty(1);
    setActive(0);
    setAdded(false);
  }, [id]);
  useEffect(() => {
    const name = lang === 'fa' ? brand.nameFa : brand.name;
    if (product) document.title = `${product.name[lang]} — ${name}`;
  }, [product, lang]);

  useGsap(
    () => {
      if (prefersReducedMotion() || !product) return;
      const q = gsap.utils.selector(root);
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from(q('.pdp__gallery'), { y: 40, autoAlpha: 0, duration: 0.9 })
        .from(q('.pdp__info > *'), { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.06 }, 0.15);
    },
    [id, lang],
    root,
  );
  useTilt(root, '.pcard', [id, lang], 6);

  if (!product) {
    return (
      <section ref={root} className="pdp pdp--missing section">
        <h1 className="display">{t.pdp.notFound}</h1>
        <button type="button" className="btn-lime" onClick={() => goHome('#shop')}>
          {t.pdp.backToShop}
        </button>
      </section>
    );
  }

  const off = discountPercent(product);
  const pct = lang === 'fa' ? `٪${formatPrice(off, 'fa')}` : `${off}%`;
  const description =
    details?.description[lang] ?? t.pdp.fallback.replace('{category}', category?.name[lang] ?? '');

  const addToCart = () => {
    for (let i = 0; i < qty; i++) add(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article ref={root} className="pdp section" aria-labelledby="pdp-title">
      <nav className="pdp__crumbs" aria-label={t.pdp.breadcrumb}>
        <button type="button" onClick={() => goHome()}>
          {t.pdp.home}
        </button>
        <span aria-hidden="true">/</span>
        <button type="button" onClick={() => goHome('#shop')}>
          {category?.name[lang]}
        </button>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name[lang]}</span>
      </nav>

      <div className="pdp__top">
        <div className="pdp__gallery">
          <div className="pdp__stage">
            {off > 0 && <span className="pcard__off pdp__off">{pct}</span>}
            <Media
              key={gallery[active]}
              file={gallery[active]}
              ratio={1}
              size="1000×1000 PNG/WebP"
              alt={product.name[lang]}
              priority
              className="media--cutout"
            />
          </div>
          {gallery.length > 1 && (
            <div className="pdp__thumbs" role="tablist" aria-label={t.pdp.gallery}>
              {gallery.map((g, i) => (
                <button
                  key={g}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`${t.pdp.image} ${formatIndex(i + 1, lang, 1)}`}
                  className="pdp__thumb"
                  onClick={() => setActive(i)}
                >
                  <Media file={g} ratio={1} size="" alt="" className="media--cutout" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pdp__info">
          <p className="eyebrow">{category?.name[lang]}</p>
          <h1 id="pdp-title" className="display pdp__title">
            {product.name[lang]}
          </h1>
          <p className="pdp__lead">{description}</p>

          <div className="pdp__price">
            {product.oldPrice && (
              <p className="pdp__old">
                <s>{formatPrice(product.oldPrice, lang)}</s>
                <span className="pdp__save">
                  {pct} {t.product.off}
                </span>
              </p>
            )}
            <p className="pdp__now">
              <strong>{formatPrice(product.price, lang)}</strong> {t.product.currency}
            </p>
          </div>

          <div className="pdp__buy">
            <div className="pdp__qty" role="group" aria-label={t.pdp.quantity}>
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label={t.cart.decrease} disabled={qty <= 1}>
                −
              </button>
              <span aria-live="polite">{formatIndex(qty, lang, 1)}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label={t.cart.increase}>
                +
              </button>
            </div>
            <button type="button" className={`btn-lime btn-lime--lg pdp__add${added ? ' is-added' : ''}`} onClick={addToCart}>
              {added ? t.product.added : t.product.addToCart}
            </button>
            {added && (
              <button type="button" className="pdp__view-cart" onClick={() => setOpen(true)}>
                {t.pdp.viewCart}
              </button>
            )}
          </div>

          {details && details.highlights.length > 0 && (
            <ul className="pdp__highlights">
              {details.highlights.map((h, i) => (
                <li key={i}>{h[lang]}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {details && details.specs.length > 0 && (
        <section className="pdp__specs" aria-labelledby="pdp-specs">
          <h2 id="pdp-specs" className="display pdp__h2">
            {t.pdp.specs}
          </h2>
          <dl>
            {details.specs.map((sp, i) => (
              <div key={i} className="pdp__spec">
                <dt>{sp.label[lang]}</dt>
                <dd>{sp.value[lang]}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {related.length > 0 && (
        <section className="pdp__related" aria-labelledby="pdp-related">
          <h2 id="pdp-related" className="display pdp__h2">
            {t.pdp.related}
          </h2>
          <div className="shop__grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
