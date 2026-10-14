import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Shared easing + timing vocabulary so every section speaks the same motion language. */
export const ease = {
  out: 'expo.out',
  inOut: 'expo.inOut',
  soft: 'power3.out',
  snap: 'power4.inOut',
};

export const dur = {
  xs: 0.35,
  s: 0.6,
  m: 0.9,
  l: 1.2,
  xl: 1.6,
};

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isTouch(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

/**
 * Play `animation` once when `trigger` enters the viewport.
 * If the trigger was already scrolled past when this is created (e.g. after a language
 * switch rebuilt the animations), the animation jumps straight to its end state instead of replaying.
 */
export function revealOnScroll(
  trigger: Element,
  animation: gsap.core.Animation,
  start = 'top 85%',
): ScrollTrigger {
  animation.pause();
  const st = ScrollTrigger.create({
    trigger,
    start,
    once: true,
    onEnter: () => animation.play(),
  });
  if (st.progress > 0 || window.scrollY > st.start) {
    animation.progress(1);
    st.kill();
  }
  return st;
}

export { gsap, ScrollTrigger };
