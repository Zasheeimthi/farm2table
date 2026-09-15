'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EnvironmentOutlined, SearchOutlined, AimOutlined, CloseOutlined } from '@ant-design/icons';

export function placeFromFeature(feature) {
  const p = feature.properties;
  const [lng, lat] = feature.geometry.coordinates;
  return { lat, lng, countryCode: p.countrycode?.toUpperCase(), city: p.city || p.town || p.village || p.name || p.county || '', street: [p.street, p.housenumber].filter(Boolean).join(' '), postcode: p.postcode || '', label: [p.name, p.street, p.city, p.country].filter((v, i, a) => v && a.indexOf(v) === i).join(', ') };
}
async function findPlaces(path, signal) {
  // Goes through /api/location/* so the geocoding provider stays swappable
  // server-side and no third party is called directly from the browser.
  const response = await fetch(`/api/location/${path}`, { signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(10000)]) : AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error('Search is unavailable. Please try again.');
  const data = await response.json();
  return (data.features || []).map(placeFromFeature).filter(p => p.countryCode === 'SE');
}
export function FarmRegionMap({ location }) {
  const [point, setPoint] = useState(null), [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    setPoint(null); setError('');
    fetch(`/api/location/search?q=${encodeURIComponent(location)}&limit=1`, { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]) })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { if (!data.features.length) throw new Error(); setPoint(placeFromFeature(data.features[0])); })
      .catch(() => { if (!controller.signal.aborted) setError('The region map is unavailable. Use the link below to explore the area.'); });
    return () => controller.abort();
  }, [location]);
  return point ? <LocationMap point={point} /> : <p role="status">{error || 'Loading region map…'}</p>;
}
export function LocationMap({ point, onSelect }) {
  const host = useRef(null), map = useRef(null), marker = useRef(null), handler = useRef(onSelect);
  handler.current = onSelect;
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const instance = L.map(host.current, { scrollWheelZoom: false }).setView([point?.lat || 60.1282, point?.lng || 18.6435], point ? 14 : 5);
    map.current = instance;
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 19 }).addTo(instance);
    tiles.on('tileerror', () => setFailed(true));
    instance.on('click', e => handler.current?.({ lat: e.latlng.lat, lng: e.latlng.lng }));
    const observer = new ResizeObserver(() => instance.invalidateSize()); observer.observe(host.current);
    return () => { observer.disconnect(); instance.remove(); map.current = null; marker.current = null; };
  }, []);
  useEffect(() => {
    if (!map.current) return;
    if (marker.current) { marker.current.remove(); marker.current = null; }
    if (!point) return;
    const icon = L.divIcon({ className: 'delivery-pin', html: '<span></span>', iconSize: [30, 38], iconAnchor: [15, 38] });
    marker.current = L.marker([point.lat, point.lng], { icon, draggable: Boolean(onSelect), title: 'Selected location' }).addTo(map.current);
    marker.current.on('dragend', e => { const p = e.target.getLatLng(); handler.current?.({ lat: p.lat, lng: p.lng }); });
    map.current.setView([point.lat, point.lng], 14);
  }, [point?.lat, point?.lng]);
  return <div className="delivery-map-wrap"><div ref={host} className="delivery-map" aria-label="Location map" />{failed && <p className="map-message">Some map tiles could not load. You can still search for your location above.</p>}</div>;
}
export default function LocationPicker({ initial, onSave }) {
  const [query, setQuery] = useState(initial?.label || initial?.city || '');
  const [selected, setSelected] = useState(initial || null), [results, setResults] = useState([]), [busy, setBusy] = useState(false), [error, setError] = useState('');
  const [searching, setSearching] = useState(false);
  const reverseId = useRef(0);
  useEffect(() => () => { reverseId.current++; }, []);
  useEffect(() => {
    if (!searching || query.trim().length < 3) { setResults([]); return; }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setBusy(true); setError('');
      try { const places = await findPlaces(`api/?q=${encodeURIComponent(query)}&limit=8&lang=en&bbox=10.5,55,24.2,69.1`, controller.signal); setResults(places); if (!places.length) setError('No Swedish locations found. Try a nearby street or city.'); }
      catch (e) { if (e.name !== 'AbortError') setError('Location search is unavailable. Please try again.'); }
      finally { if (!controller.signal.aborted) setBusy(false); }
    }, 450);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, searching]);
  const choose = place => { reverseId.current++; setSelected(place); setQuery(place.label); setSearching(false); setResults([]); setBusy(false); setError(''); };
  const selectPoint = async point => {
    const id = ++reverseId.current; setSelected(null); setSearching(false); setResults([]); setBusy(true); setError('');
    try { const places = await findPlaces(`reverse?lat=${point.lat}&lon=${point.lng}&lang=en`); if (id !== reverseId.current) return; if (!places.length) { setError('Please select a location in Sweden.'); return; } choose({ ...places[0], ...point }); }
    catch { if (id === reverseId.current) setError('We could not identify this location. Please search for a Swedish city or address.'); }
    finally { if (id === reverseId.current) setBusy(false); }
  };
  const locate = () => {
    if (!navigator.geolocation) { setError('Your browser does not support location access. Search for your address instead.'); return; }
    setBusy(true); setError('');
    navigator.geolocation.getCurrentPosition(p => selectPoint({ lat: p.coords.latitude, lng: p.coords.longitude }), () => { setBusy(false); setError('Location access was unavailable. Search for your address instead.'); }, { timeout: 10000 });
  };
  return <div className="map-location-picker">
    <header><h2>Where should we deliver?</h2><p>Find your Swedish city or address, then confirm your location.</p></header>
    <div className="location-search-row"><button className="locate-button" onClick={locate} aria-label="Use my current location" disabled={busy}><AimOutlined /></button><div className="location-search-field"><SearchOutlined /><input autoFocus aria-label="Search delivery location" placeholder="Search a Swedish address or city" value={query} onChange={e => { reverseId.current++; setQuery(e.target.value); setSelected(null); setSearching(true); setBusy(false); setError(''); }} onKeyDown={e => { if (e.key === 'Escape') setSearching(false); }} /><button aria-label="Clear location search" onClick={() => { reverseId.current++; setQuery(''); setSelected(null); setSearching(false); setResults([]); setBusy(false); setError(''); }}><CloseOutlined /></button></div>
    {searching && results.length > 0 && <div className="location-results" aria-label="Location suggestions">{results.map((p, i) => <button key={`${p.lat}-${p.lng}-${i}`} onClick={() => choose(p)}><EnvironmentOutlined /><span><strong>{p.street || p.city}</strong><small>{p.label}</small></span></button>)}<small>Search powered by Photon · OpenStreetMap</small></div>}</div>
    <div className="location-map-body"><LocationMap point={Number.isFinite(selected?.lat) ? selected : null} onSelect={selectPoint} /><p className="location-map-hint">Select a result, click the map, or drag the pin to adjust your location.</p>{busy && <p role="status">Finding your location…</p>}{error && <p className="market-error" role="alert">{error}</p>}{selected && <div className="selected-location"><EnvironmentOutlined /><span><strong>{selected.street || selected.city}</strong><small>{selected.label || [selected.city, selected.postcode].filter(Boolean).join(', ')}</small></span></div>}</div>
    <footer><button className="market-primary" disabled={!selected || busy} onClick={() => onSave(selected)}>Confirm location</button><small>You can add your full delivery address at checkout.</small></footer>
  </div>;
}
