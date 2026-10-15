import { discountPercent, formatPrice, type Product } from '../../config/store';
import { useLanguage } from '../../i18n/LanguageContext';
import { useCart } from '../../store/CartContext';
import { Media } from '../Media';
import { productHref } from '../../lib/router';

/** Shop card: image, discount badge, name, price (+ struck old price), add-to-cart. */
export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { t, lang } = useLanguage();
  const { add, justAdded } = useCart();
  const off = discountPercent(product);
  const added = justAdded === product.id;
  const pct = lang === 'fa' ? `٪${formatPrice(off, 'fa')}` : `${off}%`;

  return (
    <article className="pcard tilt-shine" data-category={product.category}>
      {off > 0 && (
        <span className="pcard__off" aria-label={`${pct} ${t.product.off}`}>
          {pct}
        </span>
      )}
      <a className="pcard__img" href={productHref(product.id)} tabIndex={-1} aria-hidden="true">
        <Media file={product.image} ratio={1} size="1000×1000 PNG/WebP" alt="" priority={priority} className="media--cutout" />
      </a>
      <h3 className="pcard__name">
        <a href={productHref(product.id)}>{product.name[lang]}</a>
      </h3>
      <div className="pcard__price">
        {product.oldPrice && (
          <s className="pcard__old">
            {formatPrice(product.oldPrice, lang)}
          </s>
        )}
        <p>
          <strong>{formatPrice(product.price, lang)}</strong> <span>{t.product.currency}</span>
        </p>
      </div>
      <button
        type="button"
        className={`btn-lime pcard__add${added ? ' is-added' : ''}`}
        onClick={() => add(product.id)}
        aria-label={`${t.product.addToCart}: ${product.name[lang]}`}
      >
        {added ? t.product.added : t.product.addToCart}
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="20" r="1.4" fill="currentColor" />
          <circle cx="17" cy="20" r="1.4" fill="currentColor" />
        </svg>
      </button>
    </article>
  );
}
