'use client';

import dynamic from 'next/dynamic';

/**
 * Leaflet touches `window` on import, so the map module is loaded on the client
 * only. Server-rendering it would crash the build; `ssr: false` prevents that
 * while keeping the surrounding page fully server-rendered.
 */
export const LocationPicker = dynamic(
  () => import('@/components/map/location-map-client').then((m) => m.default),
  { ssr: false, loading: () => <p role="status">Loading location picker…</p> }
);

export const FarmRegionMap = dynamic(
  () => import('@/components/map/location-map-client').then((m) => m.FarmRegionMap),
  { ssr: false, loading: () => <p role="status">Loading region map…</p> }
);
