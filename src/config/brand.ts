/**
 * Brand configuration — edit here, not inside components.
 * `name` is a PLACEHOLDER brand name. Replace it with the real one.
 * Leave contact/social fields empty until real details exist; empty entries are not rendered.
 */
export const brand = {
  name: 'KAGE',
  nameFa: 'کاگه',
  email: '', // e.g. 'hello@yourstudio.com'
  socials: [
    // { label: 'Instagram', href: 'https://instagram.com/...' },
    // { label: 'X', href: 'https://x.com/...' },
  ] as { label: string; href: string }[],
  /** Optional link for the main call to action (falls back to the email, then the projects section). */
  ctaHref: '',
};
