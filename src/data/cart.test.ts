import { test } from 'node:test';
import assert from 'node:assert/strict';
import { changeQuantity, normalizeQuantity, restoreShop, subtotalFor } from './cart.ts';
const ids = ['esfera-marfil', 'perfil-acero'];
test('la persistencia corrupta o de esquema inválido empieza vacía', () => {
  for (const raw of ['{rota', 'null', 'true', '[]', '123', '{"cart":"falso","favorites":false}']) assert.deepEqual(restoreShop(raw, ids), { cart: [], favorites: [] });
});
test('la restauración descarta referencias desconocidas y cantidades inválidas', () => {
  assert.deepEqual(restoreShop('{"cart":[null,{"id":"no-existe","quantity":2},{"id":"esfera-marfil","quantity":-3},{"id":"perfil-acero","quantity":"3"}],"favorites":[null,12,"no-existe"]}', ids), { cart: [], favorites: [] });
});
test('duplicados y cantidades persistidas se normalizan al límite permitido', () => {
  assert.deepEqual(restoreShop('{"cart":[{"id":"esfera-marfil","quantity":5},{"id":"esfera-marfil","quantity":7}],"favorites":["perfil-acero","perfil-acero","esfera-marfil"]}', ids), { cart: [{ id: 'esfera-marfil', quantity: 9 }], favorites: ['perfil-acero', 'esfera-marfil'] });
});
test('agregar, modificar y quitar mantiene cantidades enteras y límites', () => {
  assert.equal(normalizeQuantity(Infinity), 1);
  assert.deepEqual(changeQuantity([], 'esfera-marfil', -1), []);
  assert.deepEqual(changeQuantity([], 'esfera-marfil', 0), []);
  assert.deepEqual(changeQuantity([], 'esfera-marfil', 1), [{ id: 'esfera-marfil', quantity: 1 }]);
  assert.deepEqual(changeQuantity([{ id: 'esfera-marfil', quantity: 9 }], 'esfera-marfil', 1), [{ id: 'esfera-marfil', quantity: 9 }]);
  assert.deepEqual(changeQuantity([{ id: 'esfera-marfil', quantity: 1 }], 'esfera-marfil', -1), []);
  assert.deepEqual(changeQuantity([{ id: 'esfera-marfil', quantity: 2 }], 'esfera-marfil', NaN), [{ id: 'esfera-marfil', quantity: 2 }]);
});
test('el subtotal usa precios canónicos e ignora precios alterados del almacenamiento', () => {
  const state = restoreShop('{"cart":[{"id":"esfera-marfil","quantity":2,"price":1},{"id":"perfil-acero","quantity":1,"price":0}]}', ids);
  assert.equal(subtotalFor(state.cart, { 'esfera-marfil': 680000, 'perfil-acero': 890000 }), 2250000);
});
