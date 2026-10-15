import { useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useGsap } from '../../hooks/useGsap';
import { useTilt } from '../../hooks/useTilt';
import { gsap, prefersReducedMotion, revealOnScroll } from '../../lib/gsap';
import { Media } from '../Media';
import { SectionHead } from '../ui';

/** Reference "MEET THE TEAM" layout reused for platforms: three framed cards (team-01…03 image slots). */
export function Platforms() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const slots = ['team1', 'team2', 'team3'] as const;

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealOnScroll(q('.team__grid')[0], gsap.from(q('.member'), { y: 70, autoAlpha: 0, duration: 1, ease: 'power3.out', stagger: 0.12 }));
    },
    [lang],
    root,
  );
  useTilt(root, '.member', [lang], 9);

  return (
    <section ref={root} className="team section" aria-labelledby="platforms-title">
      <SectionHead id="platforms-title" label={t.platforms.label} title={t.platforms.title} text={t.platforms.text} scrub />
      <ul className="team__grid">
        {t.platforms.items.map((m, i) => (
          <li key={i} className="member">
            <div className="member__frame tilt-inner tilt-shine">
              <Media slot={slots[i]} alt={m.alt} />
            </div>
            <h3 className="member__name">{m.name}</h3>
            <p className="member__role">{m.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
