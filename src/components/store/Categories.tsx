import { useRef } from 'react';
import { categories } from '../../config/store';
import { useLanguage } from '../../i18n/LanguageContext';
import { useGsap } from '../../hooks/useGsap';
import { gsap, prefersReducedMotion, revealOnScroll } from '../../lib/gsap';
import { scrollToTarget } from '../../lib/scroll';
import { useShopFilter } from '../../store/CartContext';
import { Media } from '../Media';
import { SectionHead } from '../ui';

/** Category tiles (like the reference store's top category bar). Click → filter the shop + scroll to it. */
export function Categories() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const { setFilter } = useShopFilter();

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealOnScroll(q('.cats')[0], gsap.from(q('.cat'), { y: 50, autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.07 }));
    },
    [lang],
    root,
  );

  return (
    <section ref={root} id="categories" className="categories section" tabIndex={-1} aria-labelledby="cats-title">
      <SectionHead id="cats-title" label={t.categories.label} title={t.categories.title} text={t.categories.text} scrub />
      <ul className="cats">
        {categories.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              className="cat tilt-shine"
              onClick={() => {
                setFilter({ category: c.id });
                scrollToTarget('#shop');
              }}
            >
              <span className="cat__img">
                <Media file={c.image} ratio={1} size="600×600 PNG/WebP" alt="" className="media--cutout" />
              </span>
              <span className="cat__name">{c.name[lang]}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
