import { IconTA } from '@/components/IconTA';
import { ImageTA } from '@/components/ImageTA';
import { findProduct, money } from '@/data/products';
import { MAX_QUANTITY } from '@/data/cart';
import type { ShopStore } from '@/types';
export const CartContentTA = (shop: ShopStore): string => {
  const cart = shop.state.get().cart;
  return `<div class="cart-heading"><div><p class="eyebrow">TUS PRÓXIMOS DETALLES</p><h2 id="cart-title">Mi bolsa <span>(${shop.cart.count()})</span></h2></div><button class="icon-button" data-close="cart-dialog" aria-label="Cerrar bolsa">${IconTA('close')}</button></div>${cart.length ? `<div class="cart-items">${cart.map((line) => {
    const product = findProduct(line.id);
    if (!product) return '';
    return `<article class="cart-item">${ImageTA(product.image, product.name, '', false, '100px')}<div class="cart-item-info"><h3>${product.name}</h3><p>${product.category}</p><strong>${money(product.price)} <span>COP</span></strong><div class="cart-quantity"><button data-action="decrease" data-id="${product.id}" aria-label="Quitar una unidad de ${product.name}">${IconTA('minus')}</button><output aria-label="Cantidad de ${product.name}">${line.quantity}</output><button data-action="increase" data-id="${product.id}" ${line.quantity >= MAX_QUANTITY ? 'disabled' : ''} aria-label="Añadir una unidad de ${product.name}">${IconTA('plus')}</button></div></div><button class="cart-remove" data-action="remove" data-id="${product.id}" aria-label="Quitar ${product.name} de la bolsa">${IconTA('trash')}</button></article>`;
  }).join('')}</div><div class="cart-summary"><div><span>Subtotal ilustrativo</span><strong>${money(shop.cart.subtotal())} <small>COP</small></strong></div><p>Este es un catálogo de demostración. No se calculan envíos, impuestos ni cargos reales.</p><button class="button button--dark full-width" data-action="checkout">Simular mi pedido ${IconTA('arrow')}</button><button class="cart-continue" data-close="cart-dialog">Seguir explorando</button><span class="demo-tag">SIN PAGOS · SIN DATOS PERSONALES</span></div>` : `<div class="empty-cart"><span>${IconTA('bag')}</span><h3>Aquí empieza<br>tu próximo detalle.</h3><p>Tu bolsa está vacía. Tómate tu tiempo.</p><button class="button button--dark" data-close="cart-dialog">Explorar la colección ${IconTA('arrow')}</button></div>`}`;
};
