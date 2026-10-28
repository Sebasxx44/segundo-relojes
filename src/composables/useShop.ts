import { changeQuantity, restoreShop, subtotalFor } from '@/data/cart';
import { products } from '@/data/products';
import type { ShopState, ShopStore } from '@/types';
const KEY = 'segundo-shop-v1';
export const useShop = (): ShopStore => {
  const ids = products.map(({ id }) => id);
  const prices = Object.fromEntries(products.map(({ id, price }) => [id, price]));
  let value: ShopState;
  try { value = restoreShop(localStorage.getItem(KEY), ids); } catch { value = { cart: [], favorites: [] }; }
  const listeners: Array<() => void> = [];
  const publish = () => { try { localStorage.setItem(KEY, JSON.stringify(value)); } catch { /* Shopping remains available without storage. */ } listeners.forEach((listener) => listener()); };
  return {
    state: { get: () => ({ cart: value.cart.map((line) => ({ ...line })), favorites: [...value.favorites] }), subscribe: (listener) => { listeners.push(listener); } },
    cart: {
      add: (id) => { if (!ids.includes(id)) return; value.cart = changeQuantity(value.cart, id, 1); publish(); },
      change: (id, delta) => { if (!ids.includes(id) || !value.cart.some((line) => line.id === id)) return; value.cart = changeQuantity(value.cart, id, delta); publish(); },
      remove: (id) => { value.cart = value.cart.filter((line) => line.id !== id); publish(); },
      clear: () => { value.cart = []; publish(); },
      count: () => value.cart.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: () => subtotalFor(value.cart, prices),
    },
    favorites: { toggle: (id) => { if (!ids.includes(id)) return; value.favorites = value.favorites.includes(id) ? value.favorites.filter((entry) => entry !== id) : [...value.favorites, id]; publish(); }, has: (id) => value.favorites.includes(id) },
  };
};
