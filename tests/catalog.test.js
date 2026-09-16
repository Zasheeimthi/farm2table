import test from 'node:test';
import assert from 'node:assert/strict';
import { categories, categoryLabel, farmData, productData } from '../lib/catalog.js';
import { imageSize } from '../lib/image-assets.js';
import { farmCategoryTabs, findFarm, findProduct, productPath, farmPath, orderPath } from '../lib/products.js';

test('every product points at a real farm and a real category', () => {
  for (const product of productData) {
    assert.ok(farmData[product.farmId], `unknown farm for ${product.title}`);
    assert.ok(categoryLabel(product.category), `unknown category for ${product.title}`);
    assert.match(product.price, /^[0-9 ]|^From [0-9]/, `unexpected price for ${product.title}`);
  }
});

test('product slugs stay unique so /product/[slug] never collides', () => {
  const slugs = productData.map((product) => productPath(product));
  assert.equal(new Set(slugs).size, slugs.length);
});

test('producer pages only advertise categories the farm actually sells', () => {
  for (const [farmId, farm] of Object.entries(farmData)) {
    assert.equal(findFarm(farmId), farm);
    for (const category of farmCategoryTabs(farmId)) {
      assert.ok(category.id !== 'all');
    }
  }
});

test('catalogue artwork and routes resolve', () => {
  const sources = [
    ...productData.map((product) => product.image),
    ...Object.values(farmData).map((farm) => farm.image),
    '/storefront/mixfarms.mp4',
    '/storefront/585.jpg',
    '/photography/pasture.jpg'
  ];

  for (const source of sources) {
    assert.ok(source.startsWith('/'), `${source} should be an absolute public path`);
    if (!source.endsWith('.mp4')) {
      const { width, height } = imageSize(source);
      assert.ok(width > 0 && height > 0, `missing dimensions for ${source}`);
    }
  }

  assert.equal(categoryLabel('dairy'), 'Dairy & Cheese');
  assert.equal(categories.some((category) => category.id === 'all'), true);
  assert.equal(findProduct('not-a-real-product'), null);
  assert.equal(farmPath('solmarka'), '/farm/solmarka');
  assert.equal(orderPath('HEA-1'), '/orders/HEA-1');
});
