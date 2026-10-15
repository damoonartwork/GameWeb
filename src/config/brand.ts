/**
 * Brand configuration — edit here, not inside components.
 * `name` is a PLACEHOLDER brand name. Replace it with the real one.
 * Leave contact/social fields empty until real details exist; empty entries are not rendered.
 */
export const brand = {
  name: 'KAGE',
  nameFa: 'کاگه',
  email: '', // support email, e.g. 'support@yourshop.com' (shown in the 3-steps copy box + footer)
  socials: [
    // { label: 'Instagram', href: 'https://instagram.com/...' },
    // { label: 'X', href: 'https://x.com/...' },
  ] as { label: string; href: string }[],
  /** Optional link for the closing banner button (falls back to the shop section). */
  ctaHref: '',
};
