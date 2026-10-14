import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { gsap, prefersReducedMotion, revealOnScroll } from '../lib/gsap';
import { scramble } from '../lib/scramble';
import { Media } from './Media';
import { SectionHead } from './ui';

/**
 * Reference "THE SHADOW ECONOMY": one character in the centre with four round stat badges
 * around it. The badges grow out from behind the character and their values scramble in.
 */
export function Signature() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const stage = q('.sig__stage')[0];
      const tl = gsap.timeline();
      tl.from(q('.sig__character-inner'), { yPercent: 25, autoAlpha: 0, duration: 1.2, ease: 'power3.out' })
        .from(q('.sig__stat'), { scale: 0.3, autoAlpha: 0, x: 0, duration: 0.9, ease: 'back.out(1.5)', stagger: 0.1 }, 0.25);
      q('.sig__stat-value').forEach((el, i) => tl.add(scramble(el as HTMLElement, t.signature.stats[i].value, 1.1), 0.4 + i * 0.1));
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
    <section ref={root} className="signature section" aria-labelledby="sig-title">
      <SectionHead id="sig-title" label={t.signature.label} title={t.signature.title} text={t.signature.text} />
      <div className="sig__stage">
        <div className="sig__character">
          <div className="sig__character-inner">
            <Media slot="signature" alt={t.signature.alt} className="media--cutout" />
          </div>
        </div>
        <ul className="sig__stats">
          {t.signature.stats.map((s, i) => (
            <li key={i} className={`sig__stat sig__stat--${i + 1}`}>
              <strong className="sig__stat-value" aria-label={s.value}>
                {s.value}
              </strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
