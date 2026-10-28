export type Category = 'Todos' | 'Clásicos' | 'Sobrios' | 'Deportivos';
export interface Product { id: string; name: string; category: Exclude<Category, 'Todos'>; subtitle: string; image: string; price: number; description: string; color: string; }
export interface CartLine { id: string; quantity: number; }
export interface ShopState { cart: CartLine[]; favorites: string[]; }
export interface ShopStore {
  state: { get: () => ShopState; subscribe: (listener: () => void) => void };
  cart: { add: (id: string) => void; change: (id: string, delta: number) => void; remove: (id: string) => void; clear: () => void; count: () => number; subtotal: () => number };
  favorites: { toggle: (id: string) => void; has: (id: string) => boolean };
}
export interface CatalogControls { render: () => void; showFavorites: () => void; clear: () => void; }
export interface DialogControls {
  quick: { open: (id: string) => void; refresh: () => void };
  cart: { open: () => void; refresh: () => void };
  checkout: { open: () => void; confirm: () => void };
  close: (id: string) => void;
}
