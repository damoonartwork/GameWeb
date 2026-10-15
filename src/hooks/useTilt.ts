import { useEffect, type RefObject } from 'react';
import { gsap, isTouch, prefersReducedMotion } from '../lib/gsap';

/**
 * Pointer-follow 3D tilt for cards (desktop only): the card leans toward the cursor, lifts a
 * slightly (scale) and a soft light follows the pointer. Applies to every element matching `selector`
 * inside `scope`, and animates `.tilt-inner` (or the element itself) so it never fights scroll
 * tweens on the outer element.
 */
export function useTilt(scope: RefObject<HTMLElement | null>, selector: string, deps: unknown[] = [], max = 8) {
  useEffect(() => {
    const root = scope.current;
    if (!root || isTouch() || prefersReducedMotion()) return;
    const cleanups: (() => void)[] = [];
    root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      const target = el.querySelector<HTMLElement>('.tilt-inner') ?? el;
      gsap.set(target, { transformPerspective: 900, transformStyle: 'preserve-3d' });
      const rx = gsap.quickTo(target, 'rotationX', { duration: 0.5, ease: 'power3.out' });
      const ry = gsap.quickTo(target, 'rotationY', { duration: 0.5, ease: 'power3.out' });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry((px - 0.5) * 2 * max);
        rx(-(py - 0.5) * 2 * max);
        target.style.setProperty('--mx', `${px * 100}%`);
        target.style.setProperty('--my', `${py * 100}%`);
      };
      const enter = () => {
        target.classList.add('is-tilting');
        gsap.to(target, { scale: 1.03, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      };
      const leave = () => {
        target.classList.remove('is-tilting');
        rx(0);
        ry(0);
        gsap.to(target, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.6)', overwrite: 'auto' });
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerenter', enter);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerenter', enter);
        el.removeEventListener('pointerleave', leave);
        gsap.set(target, { rotationX: 0, rotationY: 0, scale: 1 });
      });
    });
    return () => cleanups.forEach((c) => c());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
