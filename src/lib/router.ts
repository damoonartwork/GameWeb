import { useEffect, useState } from 'react';

/**
 * Tiny hash router: `#/product/<id>` shows a product page, anything else is the home page.
 * Hash URLs work on GitHub Pages (no server rewrites needed) and keep back/forward working.
 * Section anchors like `#shop` are scrolled to by JS and never written to the URL.
 */
export type Route = { name: 'home' } | { name: 'product'; id: string };

const PRODUCT = /^#\/product\/([\w-]+)/;

export function parseRoute(hash = window.location.hash): Route {
  const m = hash.match(PRODUCT);
  return m ? { name: 'product', id: m[1] } : { name: 'home' };
}

export const productHref = (id: string) => `#/product/${id}`;

/** A section to scroll to once the home page has mounted (e.g. nav link clicked on a product page). */
let pendingSection: string | null = null;
export function takePendingSection() {
  const s = pendingSection;
  pendingSection = null;
  return s;
}

export function goHome(section?: string) {
  pendingSection = section ?? null;
  // replace the product entry with a clean URL so "back" doesn't bounce between them
  history.pushState(null, '', window.location.pathname + window.location.search);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseRoute);
  useEffect(() => {
    const on = () => setRoute(parseRoute());
    window.addEventListener('hashchange', on);
    window.addEventListener('popstate', on);
    return () => {
      window.removeEventListener('hashchange', on);
      window.removeEventListener('popstate', on);
    };
  }, []);
  return route;
}
