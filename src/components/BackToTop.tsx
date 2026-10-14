import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { scrollToTarget } from '../lib/scroll';

/** Fixed "↑ Back to top" link from the reference; appears once the hero is out of view. */
export function BackToTop() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a
      href="#top"
      className={['to-top', show ? 'is-visible' : ''].join(' ')}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      onClick={(e) => {
        e.preventDefault();
        scrollToTarget(0);
        document.getElementById('main')?.focus({ preventScroll: true });
      }}
    >
      <span aria-hidden="true">↑</span> {t.backToTop}
    </a>
  );
}
