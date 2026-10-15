import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/gsap';

type Props = {
  /** grid cell size in CSS px */
  spacing: number;
  /** grid line colour */
  line: string;
  /** streak colour (r,g,b) */
  glow: [number, number, number];
  /** how many streaks travel at once */
  streaks: number;
  /** 0–1 multiplier on streak brightness */
  intensity?: number;
  /** horizontal offset of the first vertical line, as a function of the canvas width */
  offsetX?: (w: number) => number;
  className?: string;
};

const zero = () => 0;

type Streak = { vertical: boolean; lane: number; pos: number; speed: number; len: number; life: number; age: number };
type Cross = { x: number; y: number; life: number; age: number };

/**
 * Blueprint grid with light streaks sliding along the lines and occasional "+" flashes at
 * intersections, as in the reference background. Canvas, DPR-aware, and it only animates while
 * on screen and the tab is visible. Reduced motion draws the static grid only.
 */
export function GridLines({ spacing, line, glow, streaks, intensity = 1, offsetX = zero, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduced = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    const items: Streak[] = [];
    const crosses: Cross[] = [];
    const [r, g, b] = glow;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0);
    };

    const lanes = (vertical: boolean) => {
      const ox = ((offsetX(w) % spacing) + spacing) % spacing;
      const count = vertical ? Math.ceil((w - ox) / spacing) : Math.ceil(h / spacing);
      return { ox, count: Math.max(1, count) };
    };

    const spawn = (): Streak => {
      const vertical = Math.random() < 0.55;
      const { count } = lanes(vertical);
      const span = vertical ? h : w;
      const dir = Math.random() < 0.5 ? 1 : -1;
      return {
        vertical,
        lane: Math.floor(Math.random() * count),
        pos: Math.random() * span,
        speed: dir * (40 + Math.random() * 90),
        len: 60 + Math.random() * 70,
        life: 1.6 + Math.random() * 2.2,
        age: 0,
      };
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const { ox } = lanes(true);
      // static grid
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = ox; x <= w; x += spacing) {
        ctx.moveTo(Math.round(x) + 0.5, 0);
        ctx.lineTo(Math.round(x) + 0.5, h);
      }
      for (let y = spacing; y <= h; y += spacing) {
        ctx.moveTo(0, Math.round(y) + 0.5);
        ctx.lineTo(w, Math.round(y) + 0.5);
      }
      ctx.stroke();
      if (reduced) return;

      while (items.length < streaks) items.push(spawn());
      for (let i = items.length - 1; i >= 0; i--) {
        const s = items[i];
        s.age += dt;
        s.pos += s.speed * dt;
        if (s.age > s.life) {
          items.splice(i, 1);
          continue;
        }
        // fade in, hold, fade out
        const t = s.age / s.life;
        const a = Math.min(1, t * 4, (1 - t) * 4) * 0.85 * intensity;
        const lanePos = s.vertical ? ox + s.lane * spacing : spacing * (s.lane + 1);
        const head = s.pos;
        const tail = s.pos - Math.sign(s.speed) * s.len;
        const grad = s.vertical
          ? ctx.createLinearGradient(0, tail, 0, head)
          : ctx.createLinearGradient(tail, 0, head, 0);
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},${a})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (s.vertical) {
          ctx.moveTo(Math.round(lanePos) + 0.5, tail);
          ctx.lineTo(Math.round(lanePos) + 0.5, head);
        } else {
          ctx.moveTo(tail, Math.round(lanePos) + 0.5);
          ctx.lineTo(head, Math.round(lanePos) + 0.5);
        }
        ctx.stroke();
      }

      // occasional "+" flash at an intersection
      if (Math.random() < dt * 0.6) {
        const cols = lanes(true).count;
        const rows = Math.max(1, Math.floor(h / spacing));
        crosses.push({
          x: ox + Math.floor(Math.random() * cols) * spacing,
          y: spacing * (1 + Math.floor(Math.random() * rows)),
          life: 1.4,
          age: 0,
        });
      }
      for (let i = crosses.length - 1; i >= 0; i--) {
        const c = crosses[i];
        c.age += dt;
        if (c.age > c.life) {
          crosses.splice(i, 1);
          continue;
        }
        const t = c.age / c.life;
        const a = Math.sin(t * Math.PI) * 0.8 * intensity;
        const arm = 14;
        ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(c.x - arm, c.y + 0.5);
        ctx.lineTo(c.x + arm, c.y + 0.5);
        ctx.moveTo(c.x + 0.5, c.y - arm);
        ctx.lineTo(c.x + 0.5, c.y + arm);
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduced || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    start();
    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [spacing, line, glow, streaks, intensity, offsetX]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
