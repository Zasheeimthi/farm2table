import { NextResponse } from 'next/server';
import { getCatalog } from '@/lib/server/catalog';

export const dynamic = 'force-dynamic';

/** GET /api/search?q=milk - combined product and farm search for the search modal. */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim().toLowerCase();

  const { farmData, productData } = await getCatalog();
  if (!q) return NextResponse.json({ farms: [], products: [], query: q });

  const farms = Object.entries(farmData)
    .filter(([, f]) => `${f.name} ${f.location} ${f.practices?.join(' ')}`.toLowerCase().includes(q))
    .map(([id, f]) => ({ id, ...f }));

  const products = productData
    .filter((p) => `${p.title} ${farmData[p.farmId]?.name}`.toLowerCase().includes(q))
    .map((p) => ({ ...p, farmName: farmData[p.farmId]?.name ?? '' }));

  return NextResponse.json({ farms, products, query: q });
}
