'use client';

import { useEffect, useState } from 'react';
import { placeFromFeature } from '@/lib/geocoding.js';
import LocationMap from './LocationMap.jsx';

/** Region map shown in the farm page sidebar (client-only, see MapClients.jsx). */
export default function FarmRegionMap({ location }) {
  const [point, setPoint] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setPoint(null);
    setError('');
    fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(location)}&limit=1&lang=en`, {
      signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)])
    })
      .then((response) => {
        if (!response.ok) throw new Error('Region lookup failed');
        return response.json();
      })
      .then((data) => {
        if (!data.features.length) throw new Error('Region not found');
        setPoint(placeFromFeature(data.features[0]));
      })
      .catch(() => {
        if (!controller.signal.aborted) setError('The region map is unavailable. Use the link below to explore the area.');
      });
    return () => controller.abort();
  }, [location]);

  return point ? <LocationMap point={point} /> : <p role="status">{error || 'Loading region map…'}</p>;
}
