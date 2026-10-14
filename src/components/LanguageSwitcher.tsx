import { useLanguage } from '../i18n/LanguageContext';
import type { Lang } from '../i18n/translations';

const options: { lang: Lang; label: string; switchLabel: string }[] = [
  { lang: 'fa', label: 'فارسی', switchLabel: 'تغییر زبان به فارسی' },
  { lang: 'en', label: 'EN', switchLabel: 'Switch language to English' },
];

/** Two-option segmented control. Each button announces its target language in that language. */
export function LanguageSwitcher() {
  const { lang, setLang, switching, t } = useLanguage();
  return (
    <div className="lang-switch" role="group" aria-label={t.a11y.language} data-active={lang}>
      <span className="lang-switch__thumb" aria-hidden="true" />
      {options.map((o) => (
        <button
          key={o.lang}
          type="button"
          lang={o.lang}
          dir={o.lang === 'fa' ? 'rtl' : 'ltr'}
          className="lang-switch__btn"
          aria-pressed={lang === o.lang}
          aria-label={o.switchLabel}
          disabled={switching}
          onClick={() => setLang(o.lang)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
