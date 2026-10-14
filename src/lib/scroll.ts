import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

let lenis: Lenis | null = null;

/** Smooth scrolling, synced with ScrollTrigger. Skipped entirely for reduced motion and touch-first devices. */
export function initSmoothScroll(): () => void {
  if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return () => {};
  lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToTarget(target: string | number | HTMLElement) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (el === null) return;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.4, force: true }); // force: the menu may still hold the scroll lock
    return;
  }
  const top = typeof el === 'number' ? el : el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.classList.toggle('scroll-locked', locked);
}

/** Instant jump that keeps Lenis' internal position in sync. */
export function jumpTo(y: number) {
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
}
