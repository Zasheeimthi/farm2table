import { NextResponse } from 'next/server';
import { hasBackend, backendUrl } from '@/lib/server/backend';
import { getCatalog } from '@/lib/server/catalog';

export const dynamic = 'force-dynamic';

/** GET /api/health - quick check of which catalog source is live. */
export async function GET() {
  const catalog = await getCatalog();
  return NextResponse.json({
    ok: true,
    backendConfigured: hasBackend(),
    backendUrl: hasBackend() ? backendUrl() : null,
    catalogSource: catalog.source,
    farms: Object.keys(catalog.farmData).length,
    products: catalog.productData.length
  });
}
