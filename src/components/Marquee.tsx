import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/gsap';

/**
 * Tilted ticker band. Drifts on its own; scroll velocity speeds it up and
 * scroll direction flips it, then it eases back to the idle speed.
 */
export function Marquee() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLDivElement>(null);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const sign = lang === 'fa' ? 1 : -1;
      const setX = gsap.quickSetter('.marquee__track', 'xPercent');
      const wrap = gsap.utils.wrap(0, 50);
      const speed = { v: 1 }; // multiplier on idle speed; negative = reversed
      let pos = 0;
      const tick = (_t: number, dt: number) => {
        pos = wrap(pos + (dt / 1000) * 1.8 * speed.v); // ~1.8% of track per second at idle
        setX(pos * sign);
      };
      gsap.ticker.add(tick);
      let dir = 1;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          dir = self.direction;
          const boost = Math.min(Math.abs(self.getVelocity()) / 250, 6);
          gsap.killTweensOf(speed);
          gsap
            .timeline()
            .to(speed, { v: dir * (1 + boost), duration: 0.2, ease: 'power2.out' })
            .to(speed, { v: dir, duration: 1.2, ease: 'power3.out' });
        },
      });
      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    [lang],
    root,
  );

  const items = [...t.marquee, ...t.marquee];
  return (
    <div ref={root} className="marquee" aria-hidden="true">
      <div className="marquee__band">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <div className="marquee__group" key={copy}>
              {items.map((item, i) => (
                <span className="marquee__item" key={`${copy}-${i}`}>
                  {item}
                  <svg className="marquee__star" viewBox="0 0 24 24" width="28" height="28">
                    <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="currentColor" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
