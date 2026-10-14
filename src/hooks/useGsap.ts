import { useLayoutEffect, type DependencyList, type RefObject } from 'react';
import { gsap } from '../lib/gsap';

/**
 * Lifecycle-safe GSAP: everything created inside `setup` (tweens, timelines, ScrollTriggers)
 * is scoped to `scope` and reverted on unmount or when `deps` change — no duplicate triggers.
 */
export function useGsap(
  setup: (ctx: gsap.Context) => void | (() => void),
  deps: DependencyList,
  scope?: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    let cleanup: void | (() => void);
    const ctx = gsap.context((self) => {
      cleanup = setup(self);
    }, scope?.current ?? undefined);
    return () => {
      if (typeof cleanup === 'function') cleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
