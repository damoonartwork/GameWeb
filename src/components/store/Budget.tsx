import { useRef } from 'react';
import { budgets, formatPrice } from '../../config/store';
import { useLanguage } from '../../i18n/LanguageContext';
import { useGsap } from '../../hooks/useGsap';
import { gsap, prefersReducedMotion, revealOnScroll } from '../../lib/gsap';
import { scramble } from '../../lib/scramble';
import { scrollToTarget } from '../../lib/scroll';
import { useShopFilter } from '../../store/CartContext';
import { Media } from '../Media';
import { SectionHead } from '../ui';

/**
 * Reference "economy" layout (character + four round badges) reused as budget shortcuts,
 * like the reference store's "up to 2 / 4 / 6 / 8 million" tiles. Each badge filters the shop.
 */
export function Budget() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const { setFilter } = useShopFilter();
  const label = (b: number) => formatPrice(b / 1_000_000, lang);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const stage = q('.sig__stage')[0];
      const tl = gsap.timeline();
      tl.from(q('.sig__character-inner'), { yPercent: 25, autoAlpha: 0, duration: 1.2, ease: 'power3.out' }).from(
        q('.sig__stat'),
        { scale: 0.3, autoAlpha: 0, duration: 0.9, ease: 'back.out(1.5)', stagger: 0.1 },
        0.25,
      );
      q('.sig__stat-value').forEach((el, i) => tl.add(scramble(el as HTMLElement, label(budgets[i]), 1.1), 0.4 + i * 0.1));
      revealOnScroll(stage, tl, 'top 75%');
      gsap.to(q('.sig__character'), {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    },
    [lang],
    root,
  );

  return (
    <section ref={root} id="budget" className="signature section" aria-labelledby="budget-title">
      <SectionHead id="budget-title" label={t.budget.label} title={t.budget.title} text={t.budget.text} />
      <div className="sig__stage">
        <div className="sig__character">
          <div className="sig__character-inner">
            <Media slot="signature" alt={t.budget.alt} className="media--cutout" />
          </div>
        </div>
        <ul className="sig__stats">
          {budgets.slice(0, 4).map((b, i) => (
            <li key={b} className={`sig__stat sig__stat--${i + 1}`}>
              <button
                type="button"
                className="sig__btn"
                onClick={() => {
                  setFilter({ maxPrice: b, category: 'all' });
                  scrollToTarget('#shop');
                }}
              >
                <span className="sig__up">{t.budget.upTo}</span>
                <strong className="sig__stat-value" aria-label={label(b)}>
                  {label(b)}
                </strong>
                <span>{t.budget.million}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
