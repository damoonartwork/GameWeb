import { useLanguage } from '../i18n/LanguageContext';
import { Media } from './Media';

/*
 * Scenery: the hero ground strip (hero-ground image slot).
 */

/**
 * Ground strip at the bottom of the hero: your own artwork (`hero-ground`), full width,
 * sitting in front of the character's feet. Until the file exists it shows an empty labelled slot.
 */
export function Ground() {
  const { t } = useLanguage();
  return (
    <div className="ground">
      <Media slot="heroGround" alt={t.a11y.scenery} fill priority className="media--cutout ground__media" />
    </div>
  );
}
