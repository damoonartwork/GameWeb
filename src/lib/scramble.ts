import { gsap, prefersReducedMotion } from './gsap';

const LATIN = '0123456789ABCDEFGHJKMNPQRSTUVWXYZ#%+';
const PERSIAN = '۰۱۲۳۴۵۶۷۸۹';

/**
 * Number/letter scramble (as in the reference's stat counters): every character cycles
 * through random glyphs and locks into place left-to-right in reading order.
 * Persian strings scramble only their digits, so letters keep joining correctly.
 */
export function scramble(el: HTMLElement, finalText: string, duration = 1.2, delay = 0) {
  if (prefersReducedMotion()) {
    el.textContent = finalText;
    return gsap.delayedCall(0, () => {});
  }
  const chars = Array.from(finalText);
  const isFa = /[؀-ۿ]/.test(finalText);
  const state = { p: 0 };
  return gsap.to(state, {
    p: 1,
    duration,
    delay,
    ease: 'power2.out',
    onStart: () => el.setAttribute('aria-busy', 'true'),
    onUpdate: () => {
      const locked = Math.floor(state.p * chars.length);
      el.textContent = chars
        .map((ch, i) => {
          if (i < locked || ch === ' ' || ch === '.' || ch === '/' || ch === '٫') return ch;
          const pool = isFa || /[۰-۹]/.test(ch) ? PERSIAN : LATIN;
          if (isFa && !/[۰-۹]/.test(ch)) return ch;
          return pool[Math.floor(Math.random() * pool.length)];
        })
        .join('');
    },
    onComplete: () => {
      el.textContent = finalText;
      el.removeAttribute('aria-busy');
    },
  });
}
