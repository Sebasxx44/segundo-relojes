import { findProduct } from '@/data/products';
import { MAX_QUANTITY } from '@/data/cart';
import type { CatalogControls, DialogControls, ShopStore } from '@/types';
export const useInteractions = (shop: ShopStore, catalog: CatalogControls, dialogs: DialogControls): void => {
  let toastTimer = 0;
  const notify = (message: string) => { const toast = document.getElementById('toast'); if (!toast) return; window.clearTimeout(toastTimer); toast.textContent = message; toast.classList.add('is-visible'); toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800); };
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const closeButton = event.target.closest<HTMLButtonElement>('[data-close]');
    if (closeButton?.dataset.close) { dialogs.close(closeButton.dataset.close); return; }
    const button = event.target.closest<HTMLButtonElement>('[data-action]');
    if (!button) return;
    const id = button.dataset.id ?? '';
    const product = findProduct(id);
    switch (button.dataset.action) {
      case 'quickview': dialogs.quick.open(id); break;
      case 'favorite': shop.favorites.toggle(id); if (product) notify(shop.favorites.has(id) ? `${product.name}, guardado en favoritos.` : `${product.name}, quitado de favoritos.`); break;
      case 'add': {
        const quantity = shop.state.get().cart.find((line) => line.id === id)?.quantity ?? 0;
        if (quantity >= MAX_QUANTITY) notify('Puedes guardar hasta 9 unidades de cada referencia.');
        else { shop.cart.add(id); if (product) notify(`${product.name}, añadido a tu bolsa.`); }
        break;
      }
      case 'increase': shop.cart.change(id, 1); break;
      case 'decrease': shop.cart.change(id, -1); break;
      case 'remove': shop.cart.remove(id); if (product) notify(`${product.name}, quitado de tu bolsa.`); break;
      case 'open-cart': dialogs.cart.open(); break;
      case 'checkout': dialogs.checkout.open(); break;
      case 'confirm-demo': dialogs.checkout.confirm(); break;
    }
  });
  document.getElementById('header-favorites')?.addEventListener('click', catalog.showFavorites);
  document.getElementById('header-search')?.addEventListener('click', () => { document.getElementById('coleccion')?.scrollIntoView(); document.querySelector<HTMLInputElement>('#product-search')?.focus({ preventScroll: true }); });
  const menu = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const closeMenu = () => { menu?.setAttribute('aria-expanded', 'false'); menu?.setAttribute('aria-label', 'Abrir menú'); nav?.classList.remove('is-open'); };
  menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); nav?.classList.toggle('is-open', open); });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
};
