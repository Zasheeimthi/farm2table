/** Catalogue lookups shared by the shop, farm and product screens. */

import { categories, categoryIds, categoryLabel, farmData, productData } from './catalog.js';
import { slugify } from './market-model.js';

export { categories, categoryIds, categoryLabel, farmData, productData };

export const farmIds = Object.keys(farmData);
export const farmCount = farmIds.length;

export const findFarm = (farmId) => farmData[farmId] || null;
export const findProduct = (slug) => productData.find((product) => slugify(product.title) === slug) || null;
export const productsForFarm = (farmId) => productData.filter((product) => product.farmId === farmId);
export const relatedProducts = (product, limit = 4) => productData.filter((item) => item.farmId === product.farmId && item.title !== product.title).slice(0, limit);

export const productSlug = (product) => slugify(product.title);
export const productPath = (product) => `/product/${productSlug(product)}`;
export const farmPath = (farmId) => `/farm/${farmId}`;
export const orderPath = (orderId) => `/orders/${orderId}`;

export const farmCategories = (farmId) => [...new Set(productsForFarm(farmId).map((product) => product.category))];
export const farmCategoryTabs = (farmId) => categories.filter((category) => category.id !== 'all' && productsForFarm(farmId).some((product) => product.category === category.id));
