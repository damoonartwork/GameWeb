# GameWeb: immersive bilingual gaming site

React + TypeScript + Vite + GSAP/ScrollTrigger (+ Lenis smooth scroll). Visual design follows the FatNinja reference; content is a gaming store (consoles, controllers, games, accessories, gift cards) with a client-side cart. Persian (RTL) and English (LTR), switched live with no reload.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
```

## Where things live
| What | File |
|---|---|
| All text, both languages | `src/i18n/translations.ts` |
| Products, prices, categories, gift cards, deals timer, budgets | `src/config/store.ts` (**sample data — replace**) |
| Product page text (description, highlights, specs) | `src/config/productDetails.ts` (**starter copy — check**) |
| Brand name, email, socials, CTA link | `src/config/brand.ts` (placeholder brand **KAGE / کاگه**, replace it) |
| Images (drop-in, auto-detected) | `src/assets/images/`, see **ASSETS.md** |
| Fonts (drop-in, optional) | `fonts/` next to run.bat, see **fonts/README.txt**; live "Aa" tester on the dev server |
| Colors, fonts, spacing (design tokens) | top of `src/styles/global.css` |
| Motion vocabulary (easings, durations) | `src/lib/gsap.ts` |

## Reference fidelity
The design is rebuilt from a screen recording of the reference (`fatninja-mamun.webflow.io`), because the live site was blocked from the build environment.
- **Palette** (sampled from the video): background `#070c11`, lime accent `#daff12`, orange tag `#ff9b1f`, grass greens.
- **Type:** wide, heavy uppercase display (Archivo at 125% width, weight 900) with Inter for body text. Persian uses Vazirmatn.
- **Sections, in reference order:** hero → about (fanned cards) → bento features → stat-circle "economy" → 3 steps + link box → vertical roadmap → landscape interlude → team → FAQ → green CTA banner → footer, plus a fixed "back to top" link.
- The copy is adapted from NFT to a gaming studio and contains no invented stats, names or clients. The hero stats only describe the site itself; edit them in `translations.ts`.

## Language system
- `LanguageProvider` (`src/i18n/LanguageContext.tsx`) sets `<html lang/dir>`, the title and the meta description, and persists the choice in `localStorage` (`gw-lang`).
- First visit: a saved choice wins, then a browser preference for `fa`, else English. This is resolved in `index.html` before first paint.
- A switch plays a curtain wipe, swaps the language behind it, rebuilds the GSAP contexts, restores the scroll position and lifts the curtain. Entrance animations that already played are not replayed.
- Persian text is never split per character (that would break letter joining). It animates per word, and Persian disables letter-spacing and uppercase transforms.

## Animation inventory (observed in the recording → implemented)
| Effect | Trigger | Implementation |
|---|---|---|
| Page intro (no loading screen in the reference) | fonts + hero images ready (≤2.5s) | Hero backdrop fades up from dim; title, subtitle and CTA rise; character rises and settles from 1.08 scale; card and stats fade in from the sides |
| Stat scramble | intro / enter viewport | Characters cycle through random glyphs and lock in reading order. Persian scrambles only its digits |
| Heading "ink-in" | scroll (scrub) | Words go from grey `#565c60` to white one by one (About statements, section titles) |
| Card fan | scroll (scrub) | Three cards spread from a stack to −8° / 3° / 9°. Tags pop in, then bob |
| Bento cards | enter viewport | Each card rises; its artwork rises a little later. Hover lifts the card, lights the border and nudges the art |
| Stat circles | enter viewport | Character rises; circles grow out with back-ease; values scramble |
| Steps | enter viewport | Cards rise with a stagger, then the link box. The copy button copies the email from brand.ts |
| Roadmap | scroll (scrub) | Track fills; each phase brightens from 15% opacity; its badge turns lime at the middle of the screen |
| Controller spin | scroll (scrub, no pin) | DualSense frame sequence (174 transparent WebP frames from the supplied video) drawn on a canvas, descending through a tall section while it turns back → front on scroll down, reverse on scroll up, gentle float + lime glow; frames lazy-load near the section |
| FAQ | click | Height animates open; the lime + rotates to × |
| CTA banner | enter viewport | Banner rises and scales in; characters rise; the light streak drifts |
| Hero depth | pointer | Globe and card follow the cursor at different depths (desktop only) |
| Grid streaks | always (only while visible) | Canvas grid with short lime streaks sliding along the lines and "+" flashes at intersections. Hero grid plus a fainter page grid; static under reduced motion |
| Card hover: fan | pointer | The hovered card straightens, grows and comes forward; its neighbours lean further away (as in the reference) |
| Card hover: tilt | pointer | Hero card, bento cards, steps and crew lean toward the cursor in 3D, with a lime light following the pointer (desktop only) |
| Language switch | click | Lime curtain wipes in the incoming reading direction; scroll position is preserved |

All GSAP work runs inside `useGsap` (a `gsap.context` per component, reverted on unmount or language change), so triggers never duplicate. With reduced motion, everything is shown in its final state.

## Tested (headless Chromium, 1440×900 and 390×844, EN + FA)
No console errors. No horizontal overflow. Language switching preserves scroll and does not accumulate triggers. No untranslated Latin text in Persian mode. The language persists across reload. The menu works by keyboard (focus moves in, Esc closes). Menu and nav anchors land on their sections. The footer is reachable. Reduced motion shows complete content.

## Known limitations
- Single-source images: there is no automatic `srcset` generation. Export files at the sizes in ASSETS.md.
- Timings were measured from a 60 fps screen recording, not from the site's code, so they are close but not exact.
- The reference's exact webfont is unknown. Archivo Expanded Black is the closest open font.

## Store notes
- Every product has its own page at `#/product/<id>`. Clicking a product's name or image opens it. Hash URLs work on GitHub Pages, and back/forward work as expected.
- The cart is client-side and saved in the visitor's browser. **No payment gateway is connected**: the checkout button is disabled and says so.
- The deals countdown runs to midnight each day, or to `dealsEndAt` in `store.ts` if you set it.
- Category tiles, budget circles and the gift-card banner all filter the shop grid and scroll to it.
