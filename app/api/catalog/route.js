import { NextResponse } from 'next/server';
import { getCatalog } from '@/lib/server/catalog';
import { hasBackend } from '@/lib/server/backend';

export const dynamic = 'force-dynamic';

/**
 * GET /api/catalog
 *
 * The whole storefront catalog in one call. Served from your backend when
 * BACKEND_API_URL is configured, otherwise from the bundled seed data.
 */
export async function GET() {
  const catalog = await getCatalog();
  return NextResponse.json(
    { ...catalog, backend: hasBackend() },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
