import 'server-only';

import { backendFetch, hasBackend } from '@/lib/server/backend';
import {
  farmData as seedFarms,
  productData as seedProducts,
  categoryTabs as seedCategories
} from '@/lib/catalog';

/**
 * Normalises a product coming from an upstream API into the storefront shape.
 * Adjust the field mapping here if your backend uses different names.
 */
function toProduct(raw, index) {
  return {
    title: raw.title ?? raw.name ?? `Product ${index + 1}`,
    category: raw.category ?? 'pantry',
    farmId: raw.farmId ?? raw.farm_id ?? raw.farm ?? 'farmtable',
    price: typeof raw.price === 'number' ? `${raw.price} kr` : raw.price ?? '0 kr',
    image: raw.image ?? raw.imageUrl ?? '/photography/vegetables.jpg',
    tag: raw.tag ?? undefined
  };
}

function toFarm(raw, id) {
  return {
    name: raw.name ?? id,
    location: raw.location ?? raw.region ?? '',
    image: raw.image ?? '/photography/pasture.jpg',
    summary: raw.summary ?? raw.description ?? '',
    practices: raw.practices ?? raw.tags ?? [],
    address: raw.address ?? undefined
  };
}

/**
 * Returns the catalog for the storefront.
 *
 * Falls back to the bundled seed catalog whenever the backend is missing or
 * unavailable, so a backend outage degrades to a browsable storefront rather
 * than an empty page.
 */
export async function getCatalog({ signal } = {}) {
  if (!hasBackend()) {
    return { farmData: seedFarms, productData: seedProducts, categoryTabs: seedCategories, source: 'seed' };
  }

  try {
    const [farms, products, categories] = await Promise.all([
      backendFetch('/farms', { signal }),
      backendFetch('/products', { signal }),
      backendFetch('/categories', { signal }).catch(() => null)
    ]);

    const farmList = Array.isArray(farms) ? farms : farms?.data ?? [];
    const productList = Array.isArray(products) ? products : products?.data ?? [];

    return {
      farmData: farmList.length
        ? Object.fromEntries(farmList.map((f) => [f.id ?? f.slug, toFarm(f, f.id ?? f.slug)]))
        : seedFarms,
      productData: productList.length ? productList.map(toProduct) : seedProducts,
      categoryTabs: Array.isArray(categories) && categories.length ? categories : seedCategories,
      source: 'api'
    };
  } catch (error) {
    console.error('[catalog] falling back to seed catalog:', error.message);
    return { farmData: seedFarms, productData: seedProducts, categoryTabs: seedCategories, source: 'seed' };
  }
}

/** Single farm lookup for the farm detail route. */
export async function getFarm(farmId, { signal } = {}) {
  const catalog = await getCatalog({ signal });
  return { farm: catalog.farmData[farmId] ?? null, catalog };
}

/** Single product lookup, keyed by the same slug the storefront links with. */
export async function getProduct(slug, { signal } = {}) {
  const catalog = await getCatalog({ signal });
  const { slugify } = await import('@/lib/market-model');
  return { product: catalog.productData.find((p) => slugify(p.title) === slug) ?? null, catalog };
}
