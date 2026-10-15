import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { useTilt } from '../hooks/useTilt';
import { ease, gsap, isTouch, prefersReducedMotion } from '../lib/gsap';
import { scramble } from '../lib/scramble';
import { Media } from './Media';
import { useAnchorClick } from './Navigation';
import { formatPrice, heroProductId, productById } from '../config/store';
import { useCart } from '../store/CartContext';
import { ArrowIcon } from './ui';
import { Ground } from './Scenery';
import { GridLines } from './GridLines';

// Stable references so the canvas effect isn't rebuilt on every render.
const LIME: [number, number, number] = [218, 255, 18];
const heroGridOffset = (w: number) => w / 2 - 105;

/**
 * Hero (reference: "UNMASK THE FUTURE OF NFTS"): centred headline + CTA, the main character
 * rising from the grass in the middle, a featured card on the reading-start side, three
 * scrambling stats on the reading-end side, over a dark→green gradient with grid lines and a globe.
 */
export function Hero({ introReady }: { introReady: boolean }) {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const introPlayed = useRef(false);
  const onAnchor = useAnchorClick();
  const { add, justAdded } = useCart();
  const hp = productById(heroProductId)!;

  useGsap(
    () => {
      const reduced = prefersReducedMotion();
      const q = gsap.utils.selector(root);

      // Intro observed in the reference: the whole stage fades up from dim, the headline settles,
      // the character rises into place, side elements fade in and the stats scramble to their values.
      if (!introPlayed.current && !reduced) {
        gsap.set(q('.hero__bg'), { autoAlpha: 0.25 });
        gsap.set(q('.hero__title, .hero__sub, .hero__cta'), { autoAlpha: 0, y: 30, scale: 0.98 });
        gsap.set(q('.hero__character-inner'), { autoAlpha: 0, yPercent: 18, scale: 1.08 });
        gsap.set(q('.hero__card, .hero__feature'), { autoAlpha: 0, y: 40 });
        gsap.set(q('.hero__stat'), { autoAlpha: 0, x: lang === 'fa' ? -30 : 30 });
      }

      if (introReady && !introPlayed.current) {
        introPlayed.current = true;
        if (!reduced) {
          const tl = gsap.timeline({ defaults: { ease: ease.out } });
          tl.to(q('.hero__bg'), { autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, 0)
            .to(q('.hero__title, .hero__sub, .hero__cta'), { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.08 }, 0.1)
            .to(q('.hero__character-inner'), { autoAlpha: 1, yPercent: 0, scale: 1, duration: 1.4 }, 0.25)
            .to(q('.hero__card, .hero__feature'), { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 0.45)
            .to(q('.hero__stat'), { autoAlpha: 1, x: 0, duration: 0.9, stagger: 0.1 }, 0.45);
          q('.hero__stat-value').forEach((el, i) => {
            tl.add(scramble(el as HTMLElement, t.hero.stats[i].value, 1.3), 0.5 + i * 0.1);
          });
        }
      }

      if (reduced) return;
      // Scroll: the character sinks into the grass slower than the page, the globe drifts.
      // Scroll tweens target outer wrappers, intro tweens target inner ones — two tweens on the same
      // property of the same element would make the scroll tween capture the intro's hidden start
      // state and snap the element back to it on the first scroll.
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to(q('.hero__character'), { yPercent: 10, ease: 'none', scrollTrigger: st });
      gsap.to(q('.hero__globe'), { yPercent: 25, ease: 'none', scrollTrigger: st });
      gsap.to(q('.hero__copy'), { y: -60, autoAlpha: 0.2, ease: 'none', scrollTrigger: { ...st, end: '60% top' } });
    },
    [introReady, lang],
    root,
  );

  useTilt(root, '.hero__card', [lang], 10);

  // Subtle pointer depth on desktop.
  useEffect(() => {
    if (prefersReducedMotion() || isTouch() || !root.current) return;
    const layers = Array.from(root.current.querySelectorAll<HTMLElement>('[data-depth]')).map((el) => ({
      depth: Number(el.dataset.depth),
      x: gsap.quickTo(el, 'x', { duration: 1.2, ease: ease.soft }),
      y: gsap.quickTo(el, 'y', { duration: 1.2, ease: ease.soft }),
    }));
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      for (const l of layers) {
        l.x(nx * l.depth);
        l.y(ny * l.depth);
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [lang]);

  return (
    <section ref={root} id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <GridLines className="hero__grid" spacing={210} line="rgba(200,255,120,0.07)" glow={LIME} streaks={16} offsetX={heroGridOffset} />
        <div className="hero__globe" data-depth="-12" />
        <div className="hero__rings" />
      </div>

      <div className="hero__copy">
        <h1 id="hero-title" className="display hero__title">
          {t.hero.titleLines.map((l, i) => (
            <span key={i} className="display__line">
              {l}
            </span>
          ))}
        </h1>
        <p className="hero__sub">{t.hero.sub}</p>
        <a href="#shop" className="btn-lime btn-lime--lg hero__cta" onClick={onAnchor}>
          {t.hero.cta}
        </a>
      </div>

      <div className="hero__stage">
        <div className="hero__side hero__side--start">
          <div className="hero__card tilt-shine">
            <div className="hero__card-frame" data-depth="14">
              <Media file={hp.image} ratio={9 / 10} size="900×1000" alt={hp.name[lang]} priority />
              <div className="glass-chip">
                <div>
                  <span className="glass-chip__label">{t.hero.cardLabel}:</span>
                  <strong className="glass-chip__value">
                    {formatPrice(hp.price, lang)} <small>{t.product.currency}</small>
                  </strong>
                </div>
                <button
                  type="button"
                  className={`round-lime${justAdded === hp.id ? ' is-added' : ''}`}
                  onClick={() => add(hp.id)}
                  aria-label={`${t.product.addToCart}: ${hp.name[lang]}`}
                >
                  {justAdded === hp.id ? '✓' : <ArrowIcon className="flip-x" />}
                </button>
              </div>
            </div>
          </div>
          <div className="hero__feature">
            <p className="hero__feature-name">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M5 3l14 18M19 3 5 21" stroke="var(--lime)" strokeWidth="4" strokeLinecap="round" />
              </svg>
              {hp.name[lang]}
            </p>
            <p className="hero__feature-text">{t.hero.featureText}</p>
          </div>
        </div>

        <div className="hero__character">
          <div className="hero__character-inner">
            <Media slot="heroCharacter" alt={t.hero.alt} priority className="media--cutout" />
          </div>
        </div>

        <ul className="hero__side hero__side--end hero__stats">
          {t.hero.stats.map((s, i) => (
            <li key={i} className="hero__stat">
              <strong className="hero__stat-value" aria-label={s.value}>
                {s.value}
              </strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <Ground />
    </section>
  );
}
