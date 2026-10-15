import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { productById } from '../config/store';

type Line = { id: string; qty: number };

type CartValue = {
  lines: Line[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  /** id of the product just added (for the "added" feedback), cleared after a moment */
  justAdded: string | null;
};

const CartContext = createContext<CartValue | null>(null);
const KEY = 'gw-cart';

function load(): Line[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]') as Line[];
    return raw.filter((l) => productById(l.id) && l.qty > 0);
  } catch {
    return [];
  }
}

/**
 * Client-side cart, remembered in this browser. There is no payment backend yet —
 * the checkout button in the drawer says so instead of pretending to take payment.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>(load);
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines]);

  const add = useCallback((id: string) => {
    setLines((ls) => {
      const found = ls.find((l) => l.id === id);
      return found ? ls.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { id, qty: 1 }];
    });
    setJustAdded(id);
    window.setTimeout(() => setJustAdded((cur) => (cur === id ? null : cur)), 1400);
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);
  const remove = useCallback((id: string) => setLines((ls) => ls.filter((l) => l.id !== id)), []);

  const value = useMemo<CartValue>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => s + (productById(l.id)?.price ?? 0) * l.qty, 0);
    return { lines, count, total, open, setOpen, add, setQty, remove, justAdded };
  }, [lines, open, add, setQty, remove, justAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error('useCart must be used inside CartProvider');
  return c;
}

/** Shop filter shared between categories, budget circles and the shop grid. */
type Filter = { category: string; maxPrice: number };
type FilterValue = { filter: Filter; setFilter: (f: Partial<Filter>) => void };
const FilterContext = createContext<FilterValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filter, set] = useState<Filter>({ category: 'all', maxPrice: 0 });
  const setFilter = useCallback((f: Partial<Filter>) => set((cur) => ({ ...cur, ...f })), []);
  const value = useMemo(() => ({ filter, setFilter }), [filter, setFilter]);
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useShopFilter() {
  const c = useContext(FilterContext);
  if (!c) throw new Error('useShopFilter must be used inside FilterProvider');
  return c;
}
