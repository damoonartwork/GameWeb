# Asset mapping

Put files in **`src/assets/images/`** using the exact basenames below. Any of these formats work: `.webp` (recommended), `.avif`, `.jpg`, `.png`, `.svg`.
Each file is picked up automatically at build time. Until a file exists, its slot shows a labelled placeholder at the correct aspect ratio, so the layout never breaks.
All slots are defined in `src/config/assets.ts`. To use a different filename, edit the `file` field there.

| Slot (`assets.ts`) | Filename | Section / placement | Aspect | Recommended size | Notes |
|---|---|---|---|---|---|
| `logo` | `logo` | Navigation + footer | ~3:1 | SVG, ~600×200 | Optional. Falls back to the text wordmark from `src/config/brand.ts`. A light/white logo works best: the nav uses `mix-blend-mode: difference`. |
| `heroMain` | `hero-main` | Hero, main character between the type lines | 4:5 | 1600×2000 | **Most important image.** Preloaded. Keep the subject centred; edges get cropped on small screens. |
| `heroSide1` | `hero-side-01` | Hero, small tilted card (top, reading-end side) | 3:4 | 900×1200 | Preloaded. |
| `heroSide2` | `hero-side-02` | Hero, small tilted card (lower, reading-start side) | 1:1 | 900×900 | Preloaded. |
| `project1`…`project5` | `project-01` … `project-05` | Featured projects (horizontal scroll on desktop) | 4:5 | 1200×1500 | Titles/categories live in `src/i18n/translations.ts` (`projects.items`). Links live in `src/config/projects.ts`. |
| `about1` | `about-01` | About, large artwork | 3:4 | 1200×1600 | |
| `about2` | `about-02` | About, overlapping small artwork | 1:1 | 1000×1000 | |
| `showcaseMain` | `showcase-main` | Signature section, opens from a small frame to full screen | 16:9 | 2560×1440 | Your strongest wide key art. Gets cropped to the viewport (cover), so keep the focal point central. |
| `showcase1` | `showcase-01` | Signature section, card rising bottom-start | 4:5 | 1000×1250 | |
| `showcase2` | `showcase-02` | Signature section, card rising top-end | 4:5 | 1000×1250 | |
| `cta` | `cta-art` | Closing call to action, circular crop | 1:1 | 1200×1200 | Shown in a circle: keep the subject centred. |

## Tips
- Export WebP at about 80% quality. Keep the hero images under ~400 KB each, since they block the preloader (which gives up waiting after 6 s).
- Artwork is never filtered or mirrored, even in Persian (RTL) mode. Only cropping (`object-fit: cover`) and motion are applied.
- To add or remove projects, edit `src/config/projects.ts`, `projects.items` in **both** languages in `src/i18n/translations.ts`, and add the slot in `assets.ts`.
