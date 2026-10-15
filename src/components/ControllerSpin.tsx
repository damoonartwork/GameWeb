import { useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGsap } from '../hooks/useGsap';
import { gsap, prefersReducedMotion } from '../lib/gsap';

/** Frame sequence made from the supplied green-screen video (keyed to transparent WebP). */
const FRAME_COUNT = 174;
const frameUrl = (i: number) => `${import.meta.env.BASE_URL}media/dualsense/frame-${String(i + 1).padStart(3, '0')}.webp`;

/**
 * A floating DualSense that travels down through a tall section while the page keeps scrolling
 * (no pin): as it descends it turns from its back to its front (scroll up reverses both). Each
 * scroll position maps to one frame, drawn on a canvas, so it scrubs smoothly in both directions.
 * Frames only start downloading when the section gets close to the viewport.
 */
export function ControllerSpin() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const current = useRef(prefersReducedMotion() ? FRAME_COUNT - 1 : 0);

  const draw = (index: number) => {
    const c = canvas.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    // nearest frame that has already loaded (so early scrolling never shows a blank)
    let img: HTMLImageElement | undefined;
    for (let d = 0; d < FRAME_COUNT && !img; d++) {
      const a = frames.current[index - d];
      const b = frames.current[index + d];
      if (a?.complete && a.naturalWidth) img = a;
      else if (b?.complete && b.naturalWidth) img = b;
    }
    if (!img) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.clientWidth;
    const h = c.clientHeight;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const scale = Math.min(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  };

  // Lazy-load the sequence when the section is within ~1.5 screens.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let started = false;
    const load = () => {
      if (started) return;
      started = true;
      const order = [current.current, ...Array.from({ length: FRAME_COUNT }, (_, i) => i).filter((i) => i !== current.current)];
      for (const i of order) {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (Math.abs(i - current.current) < 3) draw(current.current);
        };
        img.src = frameUrl(i);
        frames.current[i] = img;
      }
    };
    const io = new IntersectionObserver((e) => e[0].isIntersecting && load(), { rootMargin: '150% 0px' });
    io.observe(el);
    const onResize = () => draw(current.current);
    window.addEventListener('resize', onResize);
    return () => {
      io.disconnect();
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGsap(
    () => {
      if (prefersReducedMotion()) {
        draw(FRAME_COUNT - 1);
        return;
      }
      const section = root.current!;
      const mover = section.querySelector<HTMLElement>('.spin__move')!;
      // Descend from the top of the section to its bottom while the section crosses the screen.
      gsap.fromTo(
        mover,
        { y: 0 },
        {
          y: () => section.clientHeight - mover.offsetHeight,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 0.4,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.round(self.progress * (FRAME_COUNT - 1));
              if (i !== current.current) {
                current.current = i;
                draw(i);
              }
            },
          },
        },
      );
    },
    [lang],
    root,
  );

  return (
    <section ref={root} className="spin" aria-label={t.a11y.spin}>
      <div className="spin__move">
        <div className="spin__glow" aria-hidden="true" />
        <div className="spin__float">
          <canvas ref={canvas} className="spin__canvas" role="img" aria-label={t.a11y.spin} />
        </div>
      </div>
    </section>
  );
}
