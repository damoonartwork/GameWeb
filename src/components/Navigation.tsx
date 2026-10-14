import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { assetUrl } from '../config/assets';
import { brand } from '../config/brand';
import { formatIndex, useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { dur, ease, gsap, prefersReducedMotion } from '../lib/gsap';
import { lockScroll, scrollToTarget } from '../lib/scroll';
import { LanguageSwitcher } from './LanguageSwitcher';

export const sections = ['work', 'about', 'showcase', 'contact'] as const;

export function Logo({ className }: { className?: string }) {
  const { lang } = useLanguage();
  const url = assetUrl('logo');
  return url ? (
    <img className={['logo-img', className].filter(Boolean).join(' ')} src={url} alt={brand.name} width={150} height={50} />
  ) : (
    <span className={['wordmark', className].filter(Boolean).join(' ')}>{lang === 'fa' ? brand.nameFa : brand.name}</span>
  );
}

export function useAnchorClick(after?: () => void) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href?.startsWith('#')) return;
    e.preventDefault();
    const go = () => scrollToTarget(href === '#top' ? 0 : href);
    if (after) {
      after();
      // Let the menu release the scroll lock (Lenis restart) before starting the scroll.
      requestAnimationFrame(() => requestAnimationFrame(go));
    } else go();
    // Move focus for keyboard / screen-reader users without a second jump.
    const target = href === '#top' ? document.getElementById('main') : document.querySelector<HTMLElement>(href);
    target?.focus({ preventScroll: true });
  };
}

export function Navigation({ introReady }: { introReady: boolean }) {
  const { t, lang } = useLanguage();
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const toggleBtn = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const menuTl = useRef<gsap.core.Timeline | null>(null);

  // Entrance after the preloader.
  useGsap(
    () => {
      if (!introReady) {
        gsap.set('.nav__item', { yPercent: -120, autoAlpha: 0 });
        return;
      }
      gsap.fromTo('.nav__item', { yPercent: -120, autoAlpha: 0 }, {
        yPercent: 0,
        autoAlpha: 1,
        duration: dur.m,
        ease: ease.out,
        stagger: 0.07,
        delay: 0.5,
        clearProps: 'transform',
      });
    },
    [introReady],
    header,
  );

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let hidden = false;
    const onScroll = () => {
      const y = window.scrollY;
      const shouldHide = y > last && y > 200 && !open;
      if (shouldHide !== hidden) {
        hidden = shouldHide;
        header.current?.classList.toggle('is-hidden', hidden);
      }
      header.current?.classList.toggle('is-scrolled', y > 40);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  // Overlay menu timeline (rebuilt per language because the link text and direction change).
  useGsap(
    () => {
      const reduced = prefersReducedMotion();
      const tl = gsap.timeline({ paused: true });
      tl.set(menu.current, { visibility: 'visible' })
        .fromTo(
          menu.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: reduced ? 0.01 : dur.m, ease: ease.inOut },
        )
        .fromTo(
          '.menu__link-inner',
          { yPercent: 110 },
          { yPercent: 0, duration: reduced ? 0.01 : dur.m, ease: ease.out, stagger: 0.06 },
          '-=0.35',
        )
        .fromTo('.menu__foot', { autoAlpha: 0 }, { autoAlpha: 1, duration: dur.s }, '-=0.6');
      menuTl.current = tl;
      if (open) tl.progress(1);
      return () => {
        menuTl.current = null;
      };
    },
    [lang],
    menu,
  );

  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return;
    lockScroll(open);
    if (open) {
      tl.timeScale(1).play();
      gsap.set(menu.current, { visibility: 'visible' }); // focusable right away, even before the first tick
      requestAnimationFrame(() => menu.current?.querySelector<HTMLElement>('a, button')?.focus());
    } else {
      tl.timeScale(1.6).reverse();
    }
  }, [open]);

  // Escape closes; Tab is trapped inside the open menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleBtn.current?.focus();
      }
      if (e.key === 'Tab' && menu.current) {
        const items = [toggleBtn.current, ...menu.current.querySelectorAll<HTMLElement>('a, button')].filter(
          Boolean,
        ) as HTMLElement[];
        const first = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const onAnchor = useAnchorClick(() => setOpen(false));

  return (
    <>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <header ref={header} className={['nav', open ? 'is-open' : ''].join(' ')}>
        <a className="nav__logo nav__item" href="#top" onClick={onAnchor} aria-label={t.a11y.logo}>
          <Logo />
        </a>
        <nav className="nav__links nav__item" aria-label={t.nav.menu}>
          {sections.map((id) => (
            <a key={id} href={`#${id}`} onClick={onAnchor} className="link-roll">
              <span data-text={t.nav[id]}>{t.nav[id]}</span>
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <div className="nav__item">
            <LanguageSwitcher />
          </div>
          <button
            ref={toggleBtn}
            type="button"
            className="menu-btn nav__item"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="menu-btn__label">{open ? t.nav.close : t.nav.menu}</span>
            <span className="menu-btn__icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <div ref={menu} id="site-menu" className="menu" aria-hidden={!open} inert={!open}>
        <nav className="menu__nav" aria-label={t.nav.menu}>
          <ul>
            {sections.map((id, i) => (
              <li key={id}>
                <a href={`#${id}`} onClick={onAnchor} className="menu__link">
                  <span className="menu__link-inner">
                    <span className="menu__index">{formatIndex(i + 1, lang)}</span>
                    <span className="menu__label">{t.nav[id]}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu__foot">
          <LanguageSwitcher />
          <span>{t.footer.tagline}</span>
        </div>
      </div>
    </>
  );
}
