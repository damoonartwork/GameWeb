import { useRef } from 'react';
import { brand } from '../config/brand';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { gsap, prefersReducedMotion, revealOnScroll } from '../lib/gsap';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo, sections, useAnchorClick } from './Navigation';

const socialIcons: Record<string, string> = {
  x: 'M4 4l16 16M20 4 4 20',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
};

/** Reference footer: logo + tagline + social icons, link columns, bottom row. */
export function Footer() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const onAnchor = useAnchorClick();

  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      revealOnScroll(
        root.current!,
        gsap.from(root.current!.querySelectorAll('.footer__col'), { y: 30, autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }),
        'top 95%',
      );
    },
    [lang],
    root,
  );

  const year = new Date().getFullYear();
  const yearText = lang === 'fa' ? year.toLocaleString('fa-IR', { useGrouping: false }) : String(year);
  const name = lang === 'fa' ? brand.nameFa : brand.name;

  return (
    <footer ref={root} className="footer section">
      <div className="footer__cols">
        <div className="footer__col footer__brand">
          <a href="#top" onClick={onAnchor} aria-label={t.a11y.logo}>
            <Logo />
          </a>
          <p>{t.footer.tagline}</p>
          {brand.email ? (
            <a href={`mailto:${brand.email}`} dir="ltr" className="footer__link">
              {brand.email}
            </a>
          ) : (
            <p className="muted">{t.footer.contactPending}</p>
          )}
          {brand.socials.length > 0 && (
            <ul className="footer__socials">
              {brand.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path d={socialIcons[s.label.toLowerCase()] ?? 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z'} fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav className="footer__col" aria-label={t.footer.studio}>
          <h2 className="footer__heading">{t.footer.studio}</h2>
          <ul>
            {sections.slice(0, 2).map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={onAnchor} className="footer__link">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer__col" aria-label={t.footer.quick}>
          <h2 className="footer__heading">{t.footer.quick}</h2>
          <ul>
            {sections.slice(2).map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={onAnchor} className="footer__link">
                  {t.nav[id]}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" onClick={onAnchor} className="footer__link">
                {t.nav.cta}
              </a>
            </li>
          </ul>
        </nav>
        <div className="footer__col">
          <h2 className="footer__heading">{t.footer.language}</h2>
          <LanguageSwitcher />
        </div>
      </div>
      <div className="footer__bottom">
        <span>
          © {yearText} {name}. {t.footer.rights}
        </span>
      </div>
    </footer>
  );
}
