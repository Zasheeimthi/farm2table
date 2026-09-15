import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Sweden, matching the delivery area the storefront validates against.
const BBOX = '10.5,55,24.2,69.1';

/**
 * GET /api/location/search?q=uppsala&limit=8
 *
 * Proxies the geocoder so the provider stays swappable server-side and no
 * third party is called straight from the browser. Swap the upstream call below
 * for your own address service when you have one.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim();
  const limit = Math.min(20, Math.max(1, Number(searchParams.get('limit')) || 8));

  if (q.length < 3) {
    return NextResponse.json({ features: [], message: 'Type at least three characters.' });
  }

  const upstream = process.env.GEOCODER_URL || 'https://photon.komoot.io';
  const url = `${upstream}/api/?q=${encodeURIComponent(q)}&limit=${limit}&lang=en&bbox=${BBOX}`;

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      headers: { 'User-Agent': 'farm-to-table-storefront' },
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`Geocoder responded ${response.status}`);
    const data = await response.json();
    return NextResponse.json({ features: data.features ?? [] });
  } catch (error) {
    return NextResponse.json(
      { features: [], message: 'Location search is unavailable. Please try again.' },
      { status: 502 }
    );
  }
}
