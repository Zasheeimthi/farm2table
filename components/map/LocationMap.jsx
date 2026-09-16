'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

/**
 * Leaflet map used by the delivery-location dialog and the farm region panel.
 * Client-only: it is always loaded through components/map/MapClients.jsx with
 * `ssr: false`, so Leaflet never runs on the server.
 */
export default function LocationMap({ point, onSelect }) {
  const host = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const handler = useRef(onSelect);
  const [failed, setFailed] = useState(false);
  handler.current = onSelect;

  useEffect(() => {
    const instance = L.map(host.current, { scrollWheelZoom: false }).setView([point?.lat || 60.1282, point?.lng || 18.6435], point ? 14 : 5);
    map.current = instance;
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(instance);
    tiles.on('tileerror', () => setFailed(true));
    instance.on('click', (event) => handler.current?.({ lat: event.latlng.lat, lng: event.latlng.lng }));
    const observer = new ResizeObserver(() => instance.invalidateSize());
    observer.observe(host.current);
    return () => {
      observer.disconnect();
      instance.remove();
      map.current = null;
      marker.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map.current) return;
    if (marker.current) {
      marker.current.remove();
      marker.current = null;
    }
    if (!point) return;
    const icon = L.divIcon({ className: 'delivery-pin', html: '<span></span>', iconSize: [30, 38], iconAnchor: [15, 38] });
    marker.current = L.marker([point.lat, point.lng], { icon, draggable: Boolean(onSelect), title: 'Selected location' }).addTo(map.current);
    marker.current.on('dragend', (event) => {
      const position = event.target.getLatLng();
      handler.current?.({ lat: position.lat, lng: position.lng });
    });
    map.current.setView([point.lat, point.lng], 14);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [point?.lat, point?.lng]);

  return (
    <div className="delivery-map-wrap">
      <div ref={host} className="delivery-map" aria-label="Location map" />
      {failed && <p className="map-message">Some map tiles could not load. You can still search for your location above.</p>}
    </div>
  );
}
