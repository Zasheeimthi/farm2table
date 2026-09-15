import { NextResponse } from 'next/server';
import { getCatalog } from '@/lib/server/catalog';

export const dynamic = 'force-dynamic';

/**
 * GET /api/products?category=dairy&farm=solmarka&search=milk&sort=low
 *
 * Query work happens server-side so the browser can request a filtered list
 * without pulling the entire catalog.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const farm = searchParams.get('farm');
  const search = (searchParams.get('search') || '').trim().toLowerCase();
  const sort = searchParams.get('sort') || 'recommended';

  const { productData, farmData, source } = await getCatalog();
  let products = productData.map((p) => ({
    ...p,
    slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    farmName: farmData[p.farmId]?.name ?? ''
  }));

  if (category && category !== 'all') products = products.filter((p) => p.category === category);
  if (farm && farm !== 'all') products = products.filter((p) => p.farmId === farm);
  if (search) {
    products = products.filter((p) =>
      `${p.title} ${p.farmName} ${p.category}`.toLowerCase().includes(search)
    );
  }

  const price = (p) => Number(String(p.price).replace(/[^0-9.]/g, ''));
  if (sort === 'low') products.sort((a, b) => price(a) - price(b));
  if (sort === 'high') products.sort((a, b) => price(b) - price(a));
  if (sort === 'name') products.sort((a, b) => a.title.localeCompare(b.title));

  return NextResponse.json({ products, count: products.length, source });
}
