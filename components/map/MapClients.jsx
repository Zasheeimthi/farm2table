'use client';

import dynamic from 'next/dynamic';

/**
 * Leaflet touches `window` and `navigator` as soon as it is evaluated, so the
 * map components are always pulled in on the client only.
 */
export const LocationPicker = dynamic(() => import('./LocationPicker.jsx'), {
  ssr: false,
  loading: () => null
});

export const FarmRegionMap = dynamic(() => import('./FarmRegionMap.jsx'), {
  ssr: false,
  loading: () => <p role="status">Loading region map…</p>
});
