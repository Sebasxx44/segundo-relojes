import type { CartLine, ShopState } from '@/types';
export const MAX_QUANTITY = 9;
export const normalizeQuantity = (quantity: number): number => Math.max(1, Math.min(MAX_QUANTITY, Number.isFinite(quantity) ? Math.trunc(quantity) : 1));
export const restoreShop = (raw: string | null, validIds: string[]): ShopState => {
  const empty: ShopState = { cart: [], favorites: [] };
  try {
    const parsed = JSON.parse(raw ?? 'null') as Partial<ShopState> | null;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return empty;
    const cart: CartLine[] = [];
    if (Array.isArray(parsed.cart)) parsed.cart.forEach((entry) => {
      if (!entry || typeof entry !== 'object' || typeof entry.id !== 'string' || !validIds.includes(entry.id) || typeof entry.quantity !== 'number' || !Number.isFinite(entry.quantity) || entry.quantity < 1) return;
      const existing = cart.find(({ id }) => id === entry.id);
      if (existing) existing.quantity = normalizeQuantity(existing.quantity + entry.quantity);
      else cart.push({ id: entry.id, quantity: normalizeQuantity(entry.quantity) });
    });
    const favorites = Array.isArray(parsed.favorites) ? [...new Set(parsed.favorites.filter((id): id is string => typeof id === 'string' && validIds.includes(id)))] : [];
    return { cart, favorites };
  } catch { return empty; }
};
export const changeQuantity = (cart: CartLine[], id: string, delta: number): CartLine[] => {
  if (!Number.isFinite(delta)) return cart;
  const current = cart.find((line) => line.id === id);
  if (!current) return delta > 0 ? [...cart, { id, quantity: normalizeQuantity(delta) }] : cart;
  const next = current.quantity + Math.trunc(delta);
  if (next <= 0) return cart.filter((line) => line.id !== id);
  return cart.map((line) => line.id === id ? { ...line, quantity: normalizeQuantity(next) } : line);
};
export const subtotalFor = (cart: CartLine[], prices: Record<string, number>): number => cart.reduce((sum, line) => sum + (prices[line.id] ?? 0) * line.quantity, 0);
