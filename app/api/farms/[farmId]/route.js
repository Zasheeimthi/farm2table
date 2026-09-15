import { NextResponse } from 'next/server';
import { getCatalog } from '@/lib/server/catalog';

export const dynamic = 'force-dynamic';

/** GET /api/farms/:farmId - the producer and everything they sell. */
export async function GET(_request, { params }) {
  const { farmId } = await params;
  const { farmData, productData } = await getCatalog();
  const farm = farmData[farmId];

  if (!farm) {
    return NextResponse.json({ message: 'Farm not found', farmId }, { status: 404 });
  }

  return NextResponse.json({
    farm: { id: farmId, ...farm },
    products: productData.filter((p) => p.farmId === farmId)
  });
}
