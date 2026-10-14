import type { AssetKey } from './assets';

/**
 * Project list. Text (title/category/description/alt) lives in the translations, by index.
 * `href` is optional — leave it empty and the card renders without a link.
 */
export const projects: { slot: AssetKey; href: string }[] = [
  { slot: 'project1', href: '' },
  { slot: 'project2', href: '' },
  { slot: 'project3', href: '' },
  { slot: 'project4', href: '' },
  { slot: 'project5', href: '' },
];
