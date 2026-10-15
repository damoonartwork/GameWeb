import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { useTilt } from '../hooks/useTilt';
import { gsap, prefersReducedMotion, revealOnScroll } from '../lib/gsap';
import { Media } from './Media';
import { SectionHead } from './ui';

/** Reference "MEET THE TEAM": three framed portrait cards with name + role underneath. */
export function Team() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const slots = ['team1', 'team2', 'team3'] as const;

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealOnScroll(
        q('.team__grid')[0],
        gsap.from(q('.member'), { y: 70, autoAlpha: 0, duration: 1, ease: 'power3.out', stagger: 0.12 }),
      );
    },
    [lang],
    root,
  );

  useTilt(root, '.member', [lang], 9);

  return (
    <section ref={root} className="team section" aria-labelledby="team-title">
      <SectionHead id="team-title" label={t.team.label} title={t.team.title} text={t.team.text} scrub />
      <ul className="team__grid">
        {t.team.members.map((m, i) => (
          <li key={i} className="member">
            <div className="member__frame tilt-inner tilt-shine">
              <Media slot={slots[i]} alt={m.alt} />
            </div>
            <h3 className="member__name">{m.name}</h3>
            <p className="member__role">{m.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
