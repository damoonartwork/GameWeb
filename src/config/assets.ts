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
  // Hero
  heroCharacter: { file: 'hero-character', ratio: 4 / 5, size: '1400×1750 transparent PNG/WebP' },
  heroCard: { file: 'hero-card', ratio: 9 / 10, size: '900×1000' },
  heroGround: { file: 'hero-ground', ratio: 5, size: '2560×512 transparent PNG/WebP' },
  // About — fanned character cards
  about1: { file: 'about-card-01', ratio: 4 / 5, size: '800×1000' },
  about2: { file: 'about-card-02', ratio: 4 / 5, size: '800×1000' },
  about3: { file: 'about-card-03', ratio: 4 / 5, size: '800×1000' },
  // Features bento
  feature1: { file: 'feature-01', ratio: 1, size: '1000×1000 transparent PNG/WebP' },
  feature2: { file: 'feature-02', ratio: 1, size: '1000×1000 transparent PNG/WebP' },
  feature3: { file: 'feature-03', ratio: 1, size: '1000×1000 transparent PNG/WebP' },
  // Signature character with the four stat circles
  signature: { file: 'signature-character', ratio: 3 / 4, size: '1200×1600 transparent PNG/WebP' },
  // Team / cast
  team1: { file: 'team-01', ratio: 9 / 10, size: '900×1000' },
  team2: { file: 'team-02', ratio: 9 / 10, size: '900×1000' },
  team3: { file: 'team-03', ratio: 9 / 10, size: '900×1000' },
  // Closing banner
  cta: { file: 'cta-characters', ratio: 4 / 3, size: '1600×1200 transparent PNG/WebP' },
} satisfies Record<string, AssetSlot>;

export type AssetKey = keyof typeof assetSlots;

export function assetUrl(key: AssetKey): string | null {
  return byBasename[assetSlots[key].file] ?? null;
}

/** Hero assets the preloader waits for. */
export const criticalAssets: AssetKey[] = ['heroCharacter', 'heroCard', 'heroGround'];
