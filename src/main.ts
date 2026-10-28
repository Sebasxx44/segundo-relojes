import { ShopPageTA } from '@/components/ShopPageTA';
import { useShop } from '@/composables/useShop';
import { useCatalog } from '@/composables/useCatalog';
import { useDialogs } from '@/composables/useDialogs';
import { useInteractions } from '@/composables/useInteractions';
import { useSlider } from '@/composables/useSlider';
import '@/styles.css';

const app = document.getElementById('app');
if (app) app.innerHTML = ShopPageTA();
const shop = useShop();
const catalog = useCatalog(shop);
const dialogs = useDialogs(shop);
const sync = () => {
  const focused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const action = focused?.dataset.action;
  const id = focused?.dataset.id;
  const close = focused?.dataset.close;
  const scope = focused?.closest<HTMLDialogElement>('dialog')?.id ?? 'product-grid';
  catalog.render();
  dialogs.cart.refresh();
  dialogs.quick.refresh();
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = String(shop.cart.count());
  document.querySelector('.cart-trigger')?.setAttribute('aria-label', `Abrir bolsa, ${shop.cart.count()} relojes`);
  const favoriteCount = document.getElementById('favorite-count');
  if (favoriteCount) { favoriteCount.textContent = String(shop.state.get().favorites.length); favoriteCount.hidden = shop.state.get().favorites.length === 0; }
  if (focused && !focused.isConnected) {
    const root = document.getElementById(scope);
    const selector = action ? `[data-action="${action}"]${id ? `[data-id="${id}"]` : ''}` : close ? `[data-close="${close}"]` : '';
    const next = selector ? root?.querySelector<HTMLButtonElement>(selector) : null;
    if (next && !next.disabled) next.focus({ preventScroll: true });
    else root?.querySelector<HTMLButtonElement>('[data-close]')?.focus({ preventScroll: true });
  }
};
shop.state.subscribe(sync);
sync();
useSlider();
useInteractions(shop, catalog, dialogs);
