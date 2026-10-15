import { useEffect, useRef } from 'react';
import { formatPrice, productById } from '../../config/store';
import { formatIndex, useLanguage } from '../../i18n/LanguageContext';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { lockScroll, scrollToTarget } from '../../lib/scroll';
import { useCart } from '../../store/CartContext';
import { Media } from '../Media';

/** Slide-in cart panel from the reading-end side. Esc / backdrop closes; focus is trapped inside. */
export function CartDrawer() {
  const { t, lang, dir } = useLanguage();
  const { lines, total, open, setOpen, setQty, remove } = useCart();
  const panel = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const reduced = prefersReducedMotion();
    lockScroll(open);
    if (open) {
      gsap.set(el, { visibility: 'visible' });
      gsap.to(el.querySelector('.cart__backdrop'), { autoAlpha: 1, duration: reduced ? 0 : 0.3 });
      gsap.fromTo(panel.current, { xPercent: dir === 'rtl' ? -100 : 100 }, { xPercent: 0, duration: reduced ? 0 : 0.55, ease: 'expo.out' });
      requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('button')?.focus());
    } else {
      gsap.to(el.querySelector('.cart__backdrop'), { autoAlpha: 0, duration: reduced ? 0 : 0.25 });
      gsap.to(panel.current, {
        xPercent: dir === 'rtl' ? -100 : 100,
        duration: reduced ? 0 : 0.4,
        ease: 'power3.in',
        onComplete: () => gsap.set(el, { visibility: 'hidden' }),
      });
    }
  }, [open, dir]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>('button:not([disabled]), a'));
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  return (
    <div ref={root} className="cart" aria-hidden={!open} inert={!open}>
      <div className="cart__backdrop" onClick={() => setOpen(false)} />
      <div ref={panel} className="cart__panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="cart__head">
          <h2 id="cart-title" className="display">{t.cart.title}</h2>
          <button type="button" className="cart__close" onClick={() => setOpen(false)} aria-label={t.cart.close}>
            ×
          </button>
        </header>
        {lines.length === 0 ? (
          <div className="cart__empty">
            <p>{t.cart.empty}</p>
            <button
              type="button"
              className="btn-lime"
              onClick={() => {
                setOpen(false);
                requestAnimationFrame(() => requestAnimationFrame(() => scrollToTarget('#shop')));
              }}
            >
              {t.cart.browse}
            </button>
          </div>
        ) : (
          <ul className="cart__lines">
            {lines.map((l) => {
              const p = productById(l.id)!;
              return (
                <li key={l.id} className="cart__line">
                  <div className="cart__thumb">
                    <Media file={p.image} ratio={1} size="" alt="" className="media--cutout" />
                  </div>
                  <div className="cart__info">
                    <p className="cart__name">{p.name[lang]}</p>
                    <p className="cart__price">
                      {formatPrice(p.price * l.qty, lang)} {t.product.currency}
                    </p>
                    <div className="cart__qty">
                      <button type="button" onClick={() => setQty(l.id, l.qty - 1)} aria-label={t.cart.decrease}>
                        −
                      </button>
                      <span aria-live="polite">{formatIndex(l.qty, lang, 1)}</span>
                      <button type="button" onClick={() => setQty(l.id, l.qty + 1)} aria-label={t.cart.increase}>
                        +
                      </button>
                      <button type="button" className="cart__remove" onClick={() => remove(l.id)}>
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <footer className="cart__foot">
          <p className="cart__total">
            <span>{t.cart.subtotal}</span>
            <strong>
              {formatPrice(total, lang)} {t.product.currency}
            </strong>
          </p>
          <button type="button" className="btn-lime cart__checkout" disabled>
            {t.cart.checkout}
          </button>
          <p className="cart__note">{t.cart.checkoutNote}</p>
        </footer>
      </div>
    </div>
  );
}
