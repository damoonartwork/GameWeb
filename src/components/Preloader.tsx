import { useEffect, useRef, useState } from 'react';
import { assetUrl, criticalAssets } from '../config/assets';
import { brand } from '../config/brand';
import { formatIndex, useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { dur, ease, gsap, prefersReducedMotion } from '../lib/gsap';

const MIN_SHOW = 1.1; // s — long enough to read the brand, short enough not to feel staged
const MAX_WAIT = 6000; // ms — never hold the site hostage to a slow asset

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });
}

/**
 * Real-progress preloader: counts fonts + hero images only, then wipes upward and hands
 * over to the hero intro (`onReveal` fires while the panel is still moving so the two overlap).
 */
export function Preloader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const target = useRef(0);
  const done = useRef(false);
  const started = useRef(performance.now());
  const callbacks = useRef({ onReveal, onDone });
  callbacks.current = { onReveal, onDone };

  // Track real loading progress.
  useEffect(() => {
    const jobs: Promise<unknown>[] = [document.fonts.ready];
    for (const key of criticalAssets) {
      const url = assetUrl(key);
      if (url) jobs.push(loadImage(url));
    }
    let finished = 0;
    const step = () => {
      finished += 1;
      target.current = finished / jobs.length;
    };
    jobs.forEach((j) => j.then(step, step));
    const timeout = window.setTimeout(() => (target.current = 1), MAX_WAIT);
    return () => window.clearTimeout(timeout);
  }, []);

  useGsap(
    () => {
      const reduced = prefersReducedMotion();
      const proxy = { v: 0 };
      gsap.from('.preloader__letter', {
        yPercent: 110,
        duration: reduced ? 0 : dur.m,
        ease: ease.out,
        stagger: 0.06,
      });
      gsap.from('.preloader__meta', { autoAlpha: 0, duration: dur.s, delay: 0.3 });

      const exit = () => {
        if (done.current) return;
        done.current = true;
        gsap.ticker.remove(tick);
        if (reduced) {
          callbacks.current.onReveal();
          gsap.to(root.current, { autoAlpha: 0, duration: 0.3, onComplete: () => callbacks.current.onDone() });
          return;
        }
        const tl = gsap.timeline({ onComplete: () => callbacks.current.onDone() });
        tl.to('.preloader__letter', { yPercent: -110, duration: dur.s, ease: ease.snap, stagger: 0.04 })
          .to('.preloader__meta', { autoAlpha: 0, duration: dur.xs }, '<')
          .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: dur.l, ease: ease.inOut }, '-=0.2')
          .add(() => callbacks.current.onReveal(), '<0.35');
      };

      const tick = () => {
        // Ease the displayed number toward real progress; never ahead of reality.
        proxy.v += (target.current - proxy.v) * 0.12;
        if (target.current - proxy.v < 0.002) proxy.v = target.current;
        setCount(Math.round(proxy.v * 100));
        const elapsed = (performance.now() - started.current) / 1000;
        if (proxy.v >= 1 && elapsed >= (reduced ? 0 : MIN_SHOW)) exit();
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    [],
    root,
  );

  const name = lang === 'fa' ? brand.nameFa : brand.name;
  // Persian is shown as one unit so letters stay connected.
  const letters = lang === 'fa' ? [name] : Array.from(name);

  return (
    <div ref={root} className="preloader" role="status" aria-live="polite" aria-label={t.preloader.loading}>
      <div className="preloader__brand" aria-hidden="true">
        {letters.map((l, i) => (
          <span key={i} className="preloader__mask">
            <span className="preloader__letter">{l}</span>
          </span>
        ))}
      </div>
      <div className="preloader__meta">
        <span>{count >= 100 ? t.preloader.ready : t.preloader.loading}</span>
        <span className="preloader__count" dir="ltr">
          {formatIndex(count, lang, 3)}
        </span>
      </div>
      <div className="preloader__bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${count / 100})` }} />
      </div>
    </div>
  );
}
