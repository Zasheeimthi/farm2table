import { NextResponse } from 'next/server';
import { getCatalog } from '@/lib/server/catalog';

export const dynamic = 'force-dynamic';

/** GET /api/farms?category=dairy - producers, with their product counts. */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const { farmData, productData } = await getCatalog();
  const farms = Object.entries(farmData).map(([id, farm]) => {
    const products = productData.filter((p) => p.farmId === id);
    return {
      id,
      ...farm,
      productCount: products.length,
      categories: [...new Set(products.map((p) => p.category))]
    };
  });

  const filtered =
    category && category !== 'all'
      ? farms.filter((farm) => farm.categories.includes(category))
      : farms;

  return NextResponse.json({ farms: filtered, count: filtered.length });
}
