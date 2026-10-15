/**
 * Swappable fonts from the `fonts/` folder at the project root (next to run.bat).
 *
 * 1) Automatic by file name — drop a file named after the role it should replace:
 *      display.woff2      headings, English          (default: Archivo Expanded Black)
 *      body.woff2         body text, English         (default: Inter)
 *      display-fa.woff2   headings, Persian          (default: Vazirmatn Black)
 *      body-fa.woff2      body text, Persian         (default: Vazirmatn)
 *    .woff2 .woff .ttf .otf all work. Optional weight suffix for several weights of one role:
 *      body-400.ttf, body-700.ttf …
 * 2) Any other file name shows up in the "Aa" font tester (dev server only), where each role
 *    can be pointed at any font in the folder, live, without renaming anything.
 * With no files present nothing changes: the built-in fonts are used.
 */

export type FontRole = 'display' | 'body' | 'display-fa' | 'body-fa';
export const ROLES: FontRole[] = ['display', 'body', 'display-fa', 'body-fa'];

const files = import.meta.glob<string>('/fonts/*.{woff2,woff,ttf,otf,WOFF2,WOFF,TTF,OTF}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export type FontFile = { name: string; url: string; format: string };

export const fontFiles: FontFile[] = Object.entries(files)
  .map(([path, url]) => {
    const name = path.split('/').pop()!;
    const ext = name.split('.').pop()!.toLowerCase();
    const format = ext === 'ttf' ? 'truetype' : ext === 'otf' ? 'opentype' : ext;
    return { name, url, format };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const ROLE_RE = /^(display-fa|body-fa|display|body)(?:-(\d{3}))?\.[a-z0-9]+$/i;

/** role → list of {file, weight?} chosen automatically by file name */
function byFileName(): Record<FontRole, { file: FontFile; weight?: string }[]> {
  const out: Record<FontRole, { file: FontFile; weight?: string }[]> = { display: [], body: [], 'display-fa': [], 'body-fa': [] };
  for (const f of fontFiles) {
    const m = f.name.match(ROLE_RE);
    if (m) out[m[1].toLowerCase() as FontRole].push({ file: f, weight: m[2] });
  }
  return out;
}

const STORE = 'gw-font-overrides';
export type Overrides = Partial<Record<FontRole, string>>; // role → file name ('' = built-in)

export function loadOverrides(): Overrides {
  try {
    return JSON.parse(localStorage.getItem(STORE) || '{}');
  } catch {
    return {};
  }
}
export function saveOverrides(o: Overrides) {
  try {
    localStorage.setItem(STORE, JSON.stringify(o));
  } catch {
    /* ignore */
  }
}

const family = (role: FontRole) => `GW ${role}`;

/** Build and inject the @font-face rules + CSS variable overrides. */
export function applyFonts(overrides: Overrides = import.meta.env.DEV ? loadOverrides() : {}) {
  const auto = byFileName();
  const faces: string[] = [];
  const active: Partial<Record<FontRole, boolean>> = {};

  for (const role of ROLES) {
    const chosen = overrides[role];
    let entries = auto[role];
    if (chosen !== undefined) {
      const f = fontFiles.find((x) => x.name === chosen);
      entries = f ? [{ file: f }] : []; // '' or missing → built-in font
    }
    if (!entries.length) continue;
    active[role] = true;
    for (const { file, weight } of entries) {
      faces.push(
        `@font-face{font-family:'${family(role)}';src:url('${file.url}') format('${file.format}');` +
          `font-weight:${weight ?? '100 900'};font-style:normal;font-display:swap;}`,
      );
    }
  }

  const f = (role: FontRole) => (active[role] ? `'${family(role)}', ` : '');
  const vars = `
:root:root{--f-display:${f('display')}'Archivo Variable','Vazirmatn Variable','Arial Black',sans-serif;
--f-body:${f('body')}'Inter Variable','Vazirmatn Variable',system-ui,sans-serif;}
:root:root[lang='fa']{--f-display:${f('display-fa')}${f('display')}'Vazirmatn Variable','Archivo Variable',sans-serif;
--f-body:${f('body-fa')}${f('body')}'Vazirmatn Variable','Inter Variable',system-ui,sans-serif;}`;

  let el = document.getElementById('gw-custom-fonts') as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = 'gw-custom-fonts';
    document.head.appendChild(el);
  }
  el.textContent = faces.join('\n') + (Object.keys(active).length ? vars : '');
  return active;
}
