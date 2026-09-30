import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { CartItem, Product } from '../src/types';
import {
  addCartItem,
  getCartCount,
  getCartLineKey,
  getCartSubtotal,
  removeCartItem,
  updateCartItemQuantity,
} from '../src/lib/cart';

const product = (id: string, price: number, color = 'Oak'): Product => ({
  id,
  slug: id,
  name: `Product ${id}`,
  category: 'living',
  subcategory: 'Chairs',
  price,
  description: '',
  material: 'Oak',
  color,
  dimensions: '',
  images: [],
  rating: 5,
  reviewsCount: 0,
  inStock: true,
});

/** Deep-freeze so any mutation of the previous cart throws in strict mode. */
const freeze = (cart: CartItem[]): CartItem[] =>
  Object.freeze(cart.map((item) => Object.freeze({ ...item }))) as CartItem[];

test('adds a new line using the product colour by default', () => {
  const chair = product('p1', 100);
  const cart = addCartItem([], chair, 2);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 2);
  assert.equal(cart[0].selectedColor, 'Oak');
});

test('adding the same product and colour increases quantity without mutating the previous cart', () => {
  const chair = product('p1', 100);
  const before = freeze(addCartItem([], chair, 1));
  const after = addCartItem(before, chair, 1);
  assert.equal(after[0].quantity, 2);
  assert.equal(before[0].quantity, 1, 'previous state must be untouched');
  assert.notEqual(after[0], before[0]);
});

test('running the same updater twice (React Strict Mode) adds the quantity once', () => {
  const chair = product('p1', 100);
  const prev = freeze(addCartItem([], chair, 1));
  const updater = (cart: CartItem[]) => addCartItem(cart, chair, 1);
  updater(prev);
  const result = updater(prev);
  assert.equal(result[0].quantity, 2);
});

test('the same product in a different colour becomes its own line', () => {
  const chair = product('p1', 100);
  let cart = addCartItem([], chair, 1, 'Oak');
  cart = addCartItem(cart, chair, 1, 'Walnut');
  assert.equal(cart.length, 2);
  assert.deepEqual(
    cart.map((item) => [item.selectedColor, item.quantity]),
    [['Oak', 1], ['Walnut', 1]]
  );
  assert.notEqual(getCartLineKey(cart[0]), getCartLineKey(cart[1]));
});

test('updating quantity only touches the matching line and removes it at zero', () => {
  const chair = product('p1', 100);
  const before = freeze(addCartItem(addCartItem([], chair, 1, 'Oak'), chair, 3, 'Walnut'));
  const walnutKey = getCartLineKey(before[1]);

  const increased = updateCartItemQuantity(before, walnutKey, 1);
  assert.deepEqual(increased.map((item) => item.quantity), [1, 4]);

  const oakKey = getCartLineKey(before[0]);
  const removed = updateCartItemQuantity(before, oakKey, -1);
  assert.equal(removed.length, 1);
  assert.equal(removed[0].selectedColor, 'Walnut');
  assert.equal(before.length, 2, 'previous state must be untouched');
});

test('removing a line leaves other colours of the same product', () => {
  const chair = product('p1', 100);
  const cart = addCartItem(addCartItem([], chair, 1, 'Oak'), chair, 1, 'Walnut');
  const result = removeCartItem(cart, getCartLineKey(cart[0]));
  assert.deepEqual(result.map((item) => item.selectedColor), ['Walnut']);
});

test('count and subtotal are derived from every line', () => {
  let cart = addCartItem([], product('p1', 100), 2);
  cart = addCartItem(cart, product('p2', 250), 1);
  assert.equal(getCartCount(cart), 3);
  assert.equal(getCartSubtotal(cart), 450);
});
