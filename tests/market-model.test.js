import test from 'node:test';
import assert from 'node:assert/strict';
import { changeCart, cartLines, normalizeCart, subtotalOf, packPrice, deliveryDates, validAddress } from '../src/market-model.js';

const milk = { title: 'Whole Milk 1L', price: '56 kr', farmId: 'dairy' };
const beef = { title: 'Beef Box', price: '1 256 kr', farmId: 'pasture' };
const catalog = [milk, beef];

test('items from different farms coexist, repeated adds merge only the matching pack', () => {
  let cart = changeCart([], milk, 2);
  cart = changeCart(cart, beef);
  cart = changeCart(cart, milk, 1, 'family');
  cart = changeCart(cart, milk);
  assert.equal(cart.length, 3);
  const lines = cartLines(cart, catalog);
  assert.equal(lines[0].quantity, 3);
  assert.equal(lines[1].product.farmId, 'pasture');
  assert.equal(lines[2].pack, 'family');
  assert.equal(lines[2].total, 151.2);
  assert.equal(subtotalOf(lines), 1575.2);
});

test('bundle discounts are applied before quantity and round to currency precision', () => {
  const item = { ...milk, price: 'From 213 kr' };
  assert.equal(packPrice(item, 'family'), 575.1);
  const lines = cartLines(changeCart([], item, 3, 'family'), [item]);
  assert.equal(lines[0].total, 1725.3);
  assert.equal(subtotalOf(lines), 1725.3);
});

test('stale, malformed and duplicate persisted rows cannot pollute totals', () => {
  const valid = { slug: 'whole-milk-1l', pack: 'single', quantity: 2 };
  assert.deepEqual(normalizeCart([null, {}, valid, valid, { ...valid, quantity: -1 }, { ...valid, quantity: 100 }, { ...valid, pack: 'unknown' }, { ...valid, slug: 'removed-product' }], catalog), [valid]);
  assert.deepEqual(normalizeCart({ bad: true }, catalog), []);
  assert.equal(subtotalOf(cartLines([], catalog)), 0);
});

test('basket survives serialization and quantity is capped without creating duplicates', () => {
  let cart = changeCart([], beef, 98);
  cart = changeCart(cart, beef, 4);
  const restored = cartLines(JSON.parse(JSON.stringify(cart)), catalog);
  assert.equal(restored.length, 1);
  assert.equal(restored[0].quantity, 99);
  assert.equal(restored[0].unitPrice, 1256);
});

test('delivery options roll into the next month and year without hardcoded dates', () => {
  const dates = deliveryDates(new Date(2026, 11, 30, 12));
  assert.deepEqual(dates.map((date) => date.value), ['2026-12-31', '2027-01-01', '2027-01-02', '2027-01-03', '2027-01-04']);
});

test('address checks require street number, city and Swedish postal format', () => {
  assert.equal(validAddress(null), false);
  assert.equal(validAddress({ street: 'Testgatan', city: 'Stockholm', postcode: '111 22' }), false);
  assert.equal(validAddress({ street: 'Testgatan 12', city: 'Stockholm', postcode: '12' }), false);
  assert.equal(validAddress({ street: 'Testgatan 12', city: 'Stockholm', postcode: '111 22' }), true);
});
