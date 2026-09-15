import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/location/reverse?lat=59.86&lon=17.64
 *
 * Turns a clicked map point into an address. Used when the customer places the
 * pin manually instead of searching.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get('lat'));
  const lon = Number(searchParams.get('lon'));

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json({ features: [], message: 'lat and lon are required.' }, { status: 400 });
  }

  const upstream = process.env.GEOCODER_URL || 'https://photon.komoot.io';
  const url = `${upstream}/reverse?lat=${lat}&lon=${lon}&lang=en`;

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
      { features: [], message: 'We could not identify this location. Please search instead.' },
      { status: 502 }
    );
  }
}
