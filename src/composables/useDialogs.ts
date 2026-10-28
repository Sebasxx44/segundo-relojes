import { CartContentTA } from '@/components/CartContentTA';
import { CheckoutCompleteTA, CheckoutTA } from '@/components/CheckoutTA';
import { QuickViewTA } from '@/components/QuickViewTA';
import { findProduct } from '@/data/products';
import type { DialogControls, ShopStore } from '@/types';
export const useDialogs = (shop: ShopStore): DialogControls => {
  let currentProduct = '';
  const quickDialog = document.querySelector<HTMLDialogElement>('#quick-dialog');
  const cartDialog = document.querySelector<HTMLDialogElement>('#cart-dialog');
  const checkoutDialog = document.querySelector<HTMLDialogElement>('#checkout-dialog');
  const dialogs = [quickDialog, cartDialog, checkoutDialog];
  const close = (id: string) => { document.querySelector<HTMLDialogElement>(`#${id}`)?.close(); };
  const open = (dialog: HTMLDialogElement | null) => { if (!dialog || dialog.open) return; dialogs.forEach((entry) => { if (entry?.open) entry.close(); }); dialog.showModal(); document.body.style.overflow = 'hidden'; };
  const refreshCart = () => { const content = document.getElementById('cart-content'); if (content) content.innerHTML = CartContentTA(shop); };
  const refreshQuick = () => { const product = findProduct(currentProduct); const content = document.getElementById('quick-content'); if (product && content) content.innerHTML = QuickViewTA(product, shop.favorites.has(currentProduct)); };
  dialogs.forEach((dialog) => {
    dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
    dialog?.addEventListener('close', () => { if (!dialogs.some((entry) => entry?.open)) document.body.style.overflow = ''; });
  });
  return {
    quick: { open: (id) => { if (!findProduct(id)) return; currentProduct = id; refreshQuick(); open(quickDialog); }, refresh: () => { if (quickDialog?.open) refreshQuick(); } },
    cart: { open: () => { refreshCart(); open(cartDialog); }, refresh: () => { if (cartDialog?.open) refreshCart(); } },
    checkout: { open: () => { if (!shop.cart.count()) return; const content = document.getElementById('checkout-content'); if (content) content.innerHTML = CheckoutTA(shop); open(checkoutDialog); }, confirm: () => { const content = document.getElementById('checkout-content'); if (content && checkoutDialog?.open) { shop.cart.clear(); content.innerHTML = CheckoutCompleteTA(); content.querySelector<HTMLButtonElement>('button')?.focus(); } } },
    close,
  };
};
