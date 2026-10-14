import { useId } from 'react';

/** Circular text badge (pure SVG + CSS rotation; paused under reduced motion). */
export function RotatingBadge({ text }: { text: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <div className="badge" aria-hidden="true">
      <svg className="badge__ring" viewBox="0 0 200 200" direction="ltr">
        <defs>
          <path id={`c${id}`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href={`#c${id}`} textLength="486">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="badge__core">
        <svg viewBox="0 0 24 24" width="28" height="28">
          <path d="M12 3v18M12 21l-7-7M12 21l7-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
        </svg>
      </span>
    </div>
  );
}
