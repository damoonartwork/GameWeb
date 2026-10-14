import { useRef } from 'react';
import { brand } from '../config/brand';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { dur, ease, gsap, prefersReducedMotion, revealOnScroll } from '../lib/gsap';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo, sections, useAnchorClick } from './Navigation';

/** Footer closes on a full-width wordmark that rises letter by letter as the page ends. */
export function Footer() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const onAnchor = useAnchorClick();
  const name = lang === 'fa' ? brand.nameFa : brand.name;
  const pieces = lang === 'fa' ? [name] : Array.from(name);

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealOnScroll(
        q('.footer__cols')[0],
        gsap.from(q('.footer__col'), { y: 30, autoAlpha: 0, duration: dur.m, ease: ease.soft, stagger: 0.08 }),
        'top 92%',
      );
      gsap.fromTo(
        q('.footer__mark-piece'),
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: { trigger: q('.footer__mark')[0], start: 'top bottom', end: 'bottom bottom', scrub: 0.5 },
        },
      );
    },
    [lang],
    root,
  );

  const year = new Date().getFullYear();
  const yearText = lang === 'fa' ? year.toLocaleString('fa-IR', { useGrouping: false }) : String(year);

  return (
    <footer ref={root} className="footer">
      <div className="footer__cols section">
        <div className="footer__col footer__brand">
          <a href="#top" onClick={onAnchor} aria-label={t.a11y.logo}>
            <Logo />
          </a>
          <p>{t.footer.tagline}</p>
        </div>
        <nav className="footer__col" aria-label={t.footer.navigate}>
          <h2 className="footer__heading">{t.footer.navigate}</h2>
          <ul>
            {sections.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={onAnchor} className="u-line">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer__col">
          <h2 className="footer__heading">{t.footer.contact}</h2>
          {brand.email ? (
            <a className="u-line" href={`mailto:${brand.email}`} dir="ltr">
              {brand.email}
            </a>
          ) : (
            <p className="muted">{t.footer.contactPending}</p>
          )}
          {brand.socials.length > 0 && (
            <>
              <h2 className="footer__heading footer__heading--gap">{t.footer.follow}</h2>
              <ul>
                {brand.socials.map((s) => (
                  <li key={s.href}>
                    <a className="u-line" href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="footer__col footer__lang">
          <h2 className="footer__heading">{t.a11y.language}</h2>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="footer__mark" aria-hidden="true">
        {pieces.map((p, i) => (
          <span key={`${lang}-${i}`} className="footer__mark-mask">
            <span className="footer__mark-piece">{p}</span>
          </span>
        ))}
      </div>

      <div className="footer__bottom section">
        <span>
          © {yearText} {name}. {t.footer.rights}
        </span>
        <a href="#top" onClick={onAnchor} className="u-line">
          {t.footer.top} <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
