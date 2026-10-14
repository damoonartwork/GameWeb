/**
 * Central image registry.
 *
 * Drop your files into `src/assets/images/` using the basenames below
 * (any of .webp .avif .jpg .jpeg .png .svg). They are picked up automatically at build time —
 * no code changes needed. Any slot without a file renders a labelled placeholder
 * at the correct aspect ratio, so the layout never breaks.
 *
 * See ASSETS.md for which slot belongs to which section and the recommended sizes.
 */

const files = import.meta.glob<string>('../assets/images/*.{webp,avif,jpg,jpeg,png,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const byBasename: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  const base = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  byBasename[base] = url;
}

export type AssetSlot = {
  /** File basename inside src/assets/images (without extension). */
  file: string;
  /** width / height, used for placeholders and to reserve space (no layout shift). */
  ratio: number;
  /** Recommended export size, shown on the placeholder. */
  size: string;
};

export const assetSlots = {
  logo: { file: 'logo', ratio: 3, size: 'SVG, ~600×200' },
  heroMain: { file: 'hero-main', ratio: 4 / 5, size: '1600×2000' },
  heroSide1: { file: 'hero-side-01', ratio: 3 / 4, size: '900×1200' },
  heroSide2: { file: 'hero-side-02', ratio: 1, size: '900×900' },
  project1: { file: 'project-01', ratio: 4 / 5, size: '1200×1500' },
  project2: { file: 'project-02', ratio: 4 / 5, size: '1200×1500' },
  project3: { file: 'project-03', ratio: 4 / 5, size: '1200×1500' },
  project4: { file: 'project-04', ratio: 4 / 5, size: '1200×1500' },
  project5: { file: 'project-05', ratio: 4 / 5, size: '1200×1500' },
  about1: { file: 'about-01', ratio: 3 / 4, size: '1200×1600' },
  about2: { file: 'about-02', ratio: 1, size: '1000×1000' },
  showcaseMain: { file: 'showcase-main', ratio: 16 / 9, size: '2560×1440' },
  showcase1: { file: 'showcase-01', ratio: 4 / 5, size: '1000×1250' },
  showcase2: { file: 'showcase-02', ratio: 4 / 5, size: '1000×1250' },
  cta: { file: 'cta-art', ratio: 1, size: '1200×1200' },
} satisfies Record<string, AssetSlot>;

export type AssetKey = keyof typeof assetSlots;

export function assetUrl(key: AssetKey): string | null {
  return byBasename[assetSlots[key].file] ?? null;
}

/** Hero assets the preloader waits for. */
export const criticalAssets: AssetKey[] = ['heroMain', 'heroSide1', 'heroSide2'];
