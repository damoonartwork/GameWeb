import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { translations, type Dictionary, type Lang } from './translations';
import { brand } from '../config/brand';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import { jumpTo } from '../lib/scroll';

const STORAGE_KEY = 'gw-lang';

type LanguageContextValue = {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  t: Dictionary;
  /** Switch language with the curtain transition. Never reloads, never resets scroll. */
  setLang: (next: Lang) => void;
  switching: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function initialLang(): Lang {
  // index.html resolves this before first paint (saved choice → browser preference → en).
  return document.documentElement.lang === 'fa' ? 'fa' : 'en';
}

function applyDocument(lang: Lang) {
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === 'fa' ? 'rtl' : 'ltr';
  const t = translations[lang];
  document.title = `${lang === 'fa' ? brand.nameFa : brand.name} — ${t.meta.title}`;
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'description';
    document.head.appendChild(meta);
  }
  meta.content = t.meta.description;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [switching, setSwitching] = useState(false);
  const curtain = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef<number | null>(null);

  useEffect(() => {
    applyDocument(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable (private mode) — preference just won't persist */
    }
  }, [lang]);

  // After the new language has rendered and animations rebuilt, restore scroll and lift the curtain.
  useEffect(() => {
    if (pendingScroll.current === null) return;
    const y = pendingScroll.current;
    pendingScroll.current = null;
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      jumpTo(y);
      ScrollTrigger.update();
      const el = curtain.current;
      if (!el || prefersReducedMotion()) {
        if (el) gsap.set(el, { autoAlpha: 0 });
        setSwitching(false);
        return;
      }
      const toLeft = document.documentElement.dir === 'rtl';
      gsap.to(el, {
        clipPath: toLeft ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)',
        duration: 0.7,
        ease: 'expo.inOut',
        onComplete: () => {
          gsap.set(el, { autoAlpha: 0 });
          setSwitching(false);
        },
      });
    });
  }, [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang || switching) return;
      setSwitching(true);
      const commit = () => {
        pendingScroll.current = window.scrollY;
        setLangState(next);
      };
      const el = curtain.current;
      if (!el || prefersReducedMotion()) {
        commit();
        return;
      }
      // Curtain sweeps in reading direction of the *incoming* language.
      const fromRight = next === 'fa';
      gsap.fromTo(
        el,
        { autoAlpha: 1, clipPath: fromRight ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'expo.inOut', onComplete: commit },
      );
    },
    [lang, switching],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, dir: lang === 'fa' ? 'rtl' : 'ltr', t: translations[lang], setLang, switching }),
    [lang, setLang, switching],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
      <div ref={curtain} className="lang-curtain" aria-hidden="true">
        <span className="lang-curtain__mark">{lang === 'fa' ? brand.nameFa : brand.name}</span>
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}

/** Locale-aware zero-padded index, e.g. 01 / ۰۱. */
export function formatIndex(n: number, lang: Lang, pad = 2) {
  const s = String(n).padStart(pad, '0');
  return lang === 'fa' ? s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]) : s;
}
