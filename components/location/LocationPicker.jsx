'use client';
import dynamic from 'next/dynamic';
// Leaflet accesses window on import, so it must load only in the browser.
const LocationPicker = dynamic(() => import('./LocationPickerImpl'), { ssr: false });
export const FarmRegionMap = dynamic(() => import('./LocationPickerImpl').then(module => module.FarmRegionMap), {
  ssr: false, loading: () => <p role="status">Loading region map…</p>,
});
export default LocationPicker;
