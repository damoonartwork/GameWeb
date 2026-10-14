# GameWeb: immersive bilingual gaming site

React + TypeScript + Vite + GSAP/ScrollTrigger (+ Lenis smooth scroll). Persian (RTL) and English (LTR), switched live with no reload.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
```

## Where things live
| What | File |
|---|---|
| All text, both languages | `src/i18n/translations.ts` |
| Brand name, email, socials, CTA link | `src/config/brand.ts` (placeholder brand **KAGE / کاگه**, replace it) |
| Images (drop-in, auto-detected) | `src/assets/images/`, see **ASSETS.md** |
| Projects list / links | `src/config/projects.ts` |
| Colors, fonts, spacing (design tokens) | top of `src/styles/global.css` |
| Motion vocabulary (easings, durations) | `src/lib/gsap.ts` |

## Reference fidelity: important
The reference (`https://fatninja-mamun.webflow.io/`, the "NFTNinja/FatNinja" Webflow template) **could not be opened from the build environment** (network policy blocked it and webflow.com). Its exact palette, fonts, background texture, preloader and animation timings are therefore **not verified**.
The current art direction (warm grain paper background, ink black, one orange accent, condensed display type, masked reveals, pinned horizontal gallery) is a best-effort design. It lives entirely in tokens and per-section GSAP code so it can be retuned after a side-by-side comparison.

## Language system
- `LanguageProvider` (`src/i18n/LanguageContext.tsx`) sets `<html lang/dir>`, the title and the meta description, and persists the choice in `localStorage` (`gw-lang`).
- First visit: a saved choice wins, then a browser preference for `fa`, else English. This is resolved in `index.html` before first paint.
- A switch plays a curtain wipe, swaps the language behind it, rebuilds the GSAP contexts, restores the scroll position and lifts the curtain. Entrance animations that already played are not replayed.
- Persian text is never split per character (that would break letter joining). It animates per word, and Persian disables letter-spacing and uppercase transforms.

## Animation inventory (as implemented)
| Effect | Trigger | Target | From → To | Duration / ease | Stagger | Mobile / reduced motion |
|---|---|---|---|---|---|---|
| Preloader | load | brand letters, counter, bar | letters y 110% → 0; counter follows *real* font + hero-image progress | 0.9s expo.out; min 1.1s on screen, max 6s | 0.06 | Reduced: fade only |
| Preloader exit | progress = 100 | panel | clip-path wipes up | 1.2s expo.inOut | — | — |
| Hero type | preloader exit | chars (EN) / words (FA) | yPercent 115 → 0 inside masks | 1.2s expo.out | 0.028 | Same on mobile; reduced: static |
| Hero main image | intro | `.media` / inner | clip from bottom + scale 1.35 → 1 | 1.6s expo.inOut / 2s | — | — |
| Hero side images | intro | cards | clip opens from centre | 1.2s | 0.15 | — |
| Rotating badge | intro + loop | badge | scale 0 → 1, rotation; ring spins (CSS) | 1.2s back.out; 14s loop | — | Reduced: no spin |
| Hero depth | pointer move | `[data-depth]` layers | x/y follow cursor at different depths | quickTo 1.1s | — | Off on touch |
| Hero exit | scroll (scrub) | lines, images | lines slide in opposite directions; images rise at different speeds | scrubbed | — | Direction mirrors in RTL |
| Marquee | always + scroll velocity | ticker band | continuous loop; velocity boosts speed; scroll direction reverses it | eases back over 1.2s | — | Reduced: static |
| Projects | scroll (pinned) | track | horizontal travel = overflow width | scrub 0.6 | — | ≤899px: vertical stack with clip reveals |
| Project cards | horizontal progress | image mask + inner | clip from entry side; inner parallax ±6% | scrubbed | — | — |
| Project hover | pointer | image, label, title | image scale 1.07, "View project" pill rises, underline draws | 1.1s / 0.6s | — | Touch: pill always visible |
| About statement | scroll (scrub) | words | opacity 0.12 → 1 word by word | scrubbed | 0.1 | — |
| About art + pillars | enter viewport | images, rules, text | clip reveals; rules draw from reading start | 1.2–1.6s | 0.08–0.12 | — |
| Showcase | scroll (pinned) | frame, title halves, cards | small rounded frame → full bleed; title halves part; cards rise | pin +220% (mobile +150%) | 0.15 | Reduced: final composition |
| CTA | enter viewport | title, art, actions | masked type; circular image iris | 1.2–1.6s | 0.025 | Magnetic button off on touch |
| Footer wordmark | scroll (scrub) | letters | rise from below as the page ends | scrubbed | 0.08 | — |
| Menu | click | overlay, links | clip from top, links rise; reverse runs 1.6× faster | 0.9s expo | 0.06 | Esc closes, Tab is trapped |
| Language switch | click | curtain | wipe in the incoming reading direction | 0.55s + 0.7s expo.inOut | — | Reduced: instant |

All GSAP work runs inside `useGsap` (a `gsap.context` per component, reverted on unmount and language change). This prevents duplicate ScrollTriggers.

## Tested (headless Chromium, 1440×900 and 390×844, EN + FA)
No console errors. No horizontal overflow. Language switching preserves scroll and does not accumulate triggers. No untranslated Latin text in Persian mode. The language persists across reload. The menu works by keyboard (focus moves in, Esc closes). Menu and nav anchors land on their sections. The footer is reachable. Reduced motion shows complete content.

## Known limitations
- Single-source images: there is no automatic `srcset` generation. Export files at the sizes in ASSETS.md.
- Reference-specific details (exact colors, fonts, timings) still need a side-by-side check (see above).
