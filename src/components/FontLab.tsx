import { useState } from 'react';
import { applyFonts, fontFiles, loadOverrides, ROLES, saveOverrides, type FontRole, type Overrides } from '../lib/customFonts';
import { ScrollTrigger } from '../lib/gsap';

const LABELS: Record<FontRole, string> = {
  display: 'Headings · EN — تیتر انگلیسی',
  body: 'Text · EN — متن انگلیسی',
  'display-fa': 'Headings · FA — تیتر فارسی',
  'body-fa': 'Text · FA — متن فارسی',
};

/**
 * Font tester — only exists on the dev server (run.bat / npm run dev), never in a production build.
 * Lists every font file in the `fonts/` folder and lets each role use any of them, live.
 * Choices are remembered in this browser only.
 */
export function FontLab() {
  const [open, setOpen] = useState(false);
  const [o, setO] = useState<Overrides>(loadOverrides);

  const update = (next: Overrides) => {
    setO(next);
    saveOverrides(next);
    applyFonts(next);
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  };

  return (
    <div className="fontlab" dir="ltr" lang="en">
      <button type="button" className="fontlab__toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Font tester">
        Aa
      </button>
      {open && (
        <div className="fontlab__panel" role="dialog" aria-label="Font tester">
          <p className="fontlab__title">Font tester · تست فونت</p>
          {fontFiles.length === 0 ? (
            <p className="fontlab__hint">
              Put .woff2 / .ttf / .otf files in the <b>fonts</b> folder next to run.bat.
              <br />
              فایل فونت را در پوشه <b>fonts</b> کنار run.bat بگذارید.
            </p>
          ) : (
            ROLES.map((role) => (
              <label key={role} className="fontlab__row">
                <span>{LABELS[role]}</span>
                <select
                  value={o[role] === undefined ? 'auto' : o[role] === '' ? 'builtin' : o[role]}
                  onChange={(e) => {
                    const v = e.target.value;
                    const next = { ...o };
                    if (v === 'auto') delete next[role];
                    else next[role] = v === 'builtin' ? '' : v;
                    update(next);
                  }}
                >
                  <option value="auto">Auto (by file name)</option>
                  <option value="builtin">Built-in (default)</option>
                  {fontFiles.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </label>
            ))
          )}
          {fontFiles.length > 0 && (
            <button type="button" className="fontlab__reset" onClick={() => update({})}>
              Reset · بازگشت
            </button>
          )}
        </div>
      )}
    </div>
  );
}
