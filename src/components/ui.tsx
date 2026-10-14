import { useRef, type ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { gsap, prefersReducedMotion, revealOnScroll } from '../lib/gsap';
import { SplitText } from './SplitText';

/**
 * Headline whose words "light up" from muted grey to white as it scrolls through the
 * viewport — the reference's signature heading treatment ("…COLLECTION OF 5,000 WARRIORS").
 */
export function ScrubHeading({
  text,
  as = 'h2',
  className,
  id,
}: {
  text: string;
  as?: 'h2' | 'p';
  className?: string;
  id?: string;
}) {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      // GSAP can't tween var() strings, so resolve the design tokens first.
      const css = getComputedStyle(document.documentElement);
      gsap.fromTo(
        ref.current!.querySelectorAll('.sw-i'),
        { color: css.getPropertyValue('--muted-heading').trim() },
        {
          color: css.getPropertyValue('--text').trim(),
          ease: 'none',
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'bottom 50%', scrub: true },
        },
      );
    },
    [lang],
    ref,
  );
  return (
    <div ref={ref} className={['scrub', className].filter(Boolean).join(' ')}>
      <SplitText as={as} text={text} mask={false} className="display" {...(id ? { id } : {})} />
    </div>
  );
}

/** Lime eyebrow label + heading (+ optional intro), revealed as one block. */
export function SectionHead({
  label,
  title,
  text,
  id,
  scrub = false,
  children,
}: {
  label: string;
  title: string;
  text?: string;
  id: string;
  scrub?: boolean;
  children?: ReactNode;
}) {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  useGsap(
    () => {
      if (prefersReducedMotion()) return;
      const items = ref.current!.querySelectorAll(scrub ? '.eyebrow, .section-text' : '.eyebrow, .display, .section-text');
      revealOnScroll(ref.current!, gsap.from(items, { y: 40, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 }));
    },
    [lang],
    ref,
  );
  return (
    <header ref={ref} className="section-head">
      <p className="eyebrow">{label}</p>
      {scrub ? <ScrubHeading text={title} id={id} /> : <h2 id={id} className="display">{title}</h2>}
      {text && <p className="section-text">{text}</p>}
      {children}
    </header>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={['icon-arrow', className].filter(Boolean).join(' ')} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
