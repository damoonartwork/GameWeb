import { useState, type CSSProperties } from 'react';
import { assetSlots, assetUrl, fileUrl, type AssetKey } from '../config/assets';
import { useLanguage } from '../i18n/LanguageContext';

type Props = {
  /** A named slot from config/assets.ts … */
  slot?: AssetKey;
  /** … or any basename in src/assets/images (catalogue images), with its ratio + recommended size. */
  file?: string;
  size?: string;
  alt: string;
  className?: string;
  /** Above-the-fold images: eager + high fetch priority. Everything else lazy-loads. */
  priority?: boolean;
  /** Override the slot's aspect ratio for this placement (cropping is via object-fit: cover). */
  ratio?: number;
  /** Fill the parent instead of reserving an aspect ratio. */
  fill?: boolean;
};

/**
 * Image frame with a reserved aspect ratio (no layout shift).
 * Structure: .media (mask/clip target) > .media__inner (scale/parallax target) > img | placeholder.
 * A missing or failing file renders a labelled placeholder — never a broken layout.
 */
export function Media({ slot, file, size, alt, className, priority, ratio, fill }: Props) {
  const { t } = useLanguage();
  const def = slot ? assetSlots[slot] : { file: file ?? '', ratio: ratio ?? 1, size: size ?? '' };
  const url = slot ? assetUrl(slot) : fileUrl(def.file);
  const [failed, setFailed] = useState(false);
  const [opaque, setOpaque] = useState(false);
  const r = ratio ?? def.ratio;
  const style: CSSProperties | undefined = fill ? undefined : { aspectRatio: String(r) };
  const showImage = url && !failed;

  return (
    <div className={['media', fill ? 'media--fill' : '', opaque ? 'is-opaque' : '', className].filter(Boolean).join(' ')} style={style}>
      <div className="media__inner">
        {showImage ? (
          <img
            src={url}
            alt={alt}
            width={1000}
            height={Math.round(1000 / r)}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onError={() => setFailed(true)}
            onLoad={(e) => setOpaque(hasOpaqueCorners(e.currentTarget))}
            draggable={false}
          />
        ) : (
          <div className="media__placeholder" role="img" aria-label={`${t.a11y.placeholder}: ${alt}`}>
            <span className="media__ph-file" dir="ltr">
              {def.file}
            </span>
            <span className="media__ph-size" dir="ltr">
              {def.size}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * "Cutout" slots expect a transparent PNG. If the supplied image has a solid background
 * (all four corners opaque), the frame gets `.is-opaque` and is styled as a rounded card instead
 * of a floating character. Local images are same-origin, so the pixels can be read.
 */
function hasOpaqueCorners(img: HTMLImageElement): boolean {
  try {
    const c = document.createElement('canvas');
    c.width = 16;
    c.height = 16;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    if (!ctx) return false;
    ctx.drawImage(img, 0, 0, 16, 16);
    const { data } = ctx.getImageData(0, 0, 16, 16);
    const alpha = (x: number, y: number) => data[(y * 16 + x) * 4 + 3];
    return [alpha(0, 0), alpha(15, 0), alpha(0, 15), alpha(15, 15)].every((a) => a > 240);
  } catch {
    return false;
  }
}
