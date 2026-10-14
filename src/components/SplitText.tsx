import { createElement, Fragment, type ElementType } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /**
   * 'chars' splits Latin text per character (inside per-word masks).
   * Persian is ALWAYS split per word so letters stay joined and ligatures survive.
   */
  split?: 'chars' | 'words';
  /** Wrap each word in an overflow mask (for rise-from-below reveals). */
  mask?: boolean;
  id?: string;
};

/**
 * React-rendered text splitting (no DOM mutation, so React re-renders and language
 * switches stay safe). Animation targets: `.sw` (word), `.sw-i` (word inner), `.sc` (char).
 * The full sentence is exposed to assistive tech via aria-label; split pieces are hidden.
 */
export function SplitText({ text, as = 'span', className, split = 'words', mask = true, id }: Props) {
  const { lang } = useLanguage();
  const byChars = split === 'chars' && lang !== 'fa';
  const words = text.split(' ');

  return createElement(
    as,
    { id, className: ['split', className].filter(Boolean).join(' '), 'aria-label': text },
    words.map((word, i) => (
      <Fragment key={`${lang}-${i}-${word}`}>
        <span className={mask ? 'sw sw--mask' : 'sw'} aria-hidden="true">
          <span className="sw-i">
            {byChars
              ? Array.from(word).map((ch, j) => (
                  <span key={j} className="sc">
                    {ch}
                  </span>
                ))
              : word}
          </span>
        </span>
        {i < words.length - 1 ? ' ' : null}
      </Fragment>
    )),
  );
}
