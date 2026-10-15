# Asset mapping

Put files in **`src/assets/images/`** using the exact basenames below. Any of these formats work: `.png`, `.webp`, `.avif`, `.jpg`, `.svg`. Each file is picked up automatically, with no code changes. Until a file exists, its slot shows a labelled placeholder at the right aspect ratio.
Slots are defined in `src/config/assets.ts`.

**Cutout** = a character on a transparent background (PNG or WebP with alpha). It is shown uncropped, standing on its bottom edge, the way the characters sit in the reference.

| Filename | Section | Aspect | Size | Type |
|---|---|---|---|---|
| `logo` | Nav + footer (optional; falls back to the lime mark + name in `src/config/brand.ts`) | ~3:1 | SVG | — |
| `hero-character` | Hero, main character standing in the grass | 4:5 | 1400×1750 | **cutout** · preloaded |
| `hero-card` | Hero, featured card on the reading-start side | 9:10 | 900×1000 | full image · preloaded |
| `hero-ground` | Hero, full-width ground strip in front of the character's feet (replaces the old vector grass) | 5:1 | 2560×512 | **transparent above the ground line** · preloaded. Wider screens crop the bottom, never the top edge |
| `about-card-01` … `03` | About, three fanned character cards | 4:5 | 800×1000 | full image (character on a dark background) |
| `feature-01` … `03` | "What we make" bento cards (artwork sits at the bottom of each card) | 1:1 | 1000×1000 | **cutout** |
| `signature-character` | Signature section, character between the 4 round badges | 3:4 | 1200×1600 | **cutout** |
| `team-01` … `03` | Crew / cast portraits | 9:10 | 900×1000 | full image |
| `cta-characters` | Closing green banner (breaks out of the top of the banner) | 4:3 | 1600×1200 | **cutout** |

Export at about 80% quality and keep `hero-character` under ~500 KB: the hero intro waits for it, for at most 2.5 s.
Artwork is never filtered or mirrored, including in Persian (RTL) mode.
## Landscape interlude layers (optional)
Each layer of the pinned landscape scene (before the team section) can be your own image. Any layer without a file keeps its built-in vector drawing, so you can replace them one at a time. Use transparent PNG/WebP for all of them.

| Filename | Layer (back → front) | Size | Notes |
|---|---|---|---|
| `land-sun` | Sun/moon disc, rises up | 800×800 | centred, never cropped |
| `land-birds` | Birds in front of the sun, drift sideways | 600×240 | |
| `land-cliff-left` | Left mountain, slides in from the left | 900×1600 | anchored bottom-left |
| `land-cliff-right` | Right mountain, slides in from the right | 900×1600 | anchored bottom-right |
| `land-hills-back` | Back hills | 2560×860 | full width; top edge always visible |
| `land-hills-mid` | Middle hills | 2560×730 | full width |
| `land-hills-front` | Front hill, swells to fill the screen at the end | 2560×640 | full width |

## Fonts
Fonts are not images: put font files in the **`fonts/`** folder next to `run.bat`. See `fonts/README.txt`.
