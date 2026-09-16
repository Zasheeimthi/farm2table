'use client';

import { useEffect, useRef, useState } from 'react';
import { AimOutlined, CloseOutlined, EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import { findPlaces } from '@/lib/geocoding.js';
import LocationMap from './LocationMap.jsx';

/**
 * Delivery-location dialog body: Photon search, geolocation button, draggable
 * pin and confirmation. Client-only (see MapClients.jsx).
 */
export default function LocationPicker({ initial, onSave }) {
  const [query, setQuery] = useState(initial?.label || initial?.city || '');
  const [selected, setSelected] = useState(initial || null);
  const [results, setResults] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);
  const reverseId = useRef(0);

  useEffect(() => () => { reverseId.current += 1; }, []);

  useEffect(() => {
    if (!searching || query.trim().length < 3) {
      setResults([]);
      return undefined;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setBusy(true);
      setError('');
      try {
        const places = await findPlaces(`api/?q=${encodeURIComponent(query)}&limit=8&lang=en&bbox=10.5,55,24.2,69.1`, controller.signal);
        setResults(places);
        if (!places.length) setError('No Swedish locations found. Try a nearby street or city.');
      } catch (searchError) {
        if (searchError.name !== 'AbortError') setError('Location search is unavailable. Please try again.');
      } finally {
        if (!controller.signal.aborted) setBusy(false);
      }
    }, 450);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, searching]);

  const choose = (place) => {
    reverseId.current += 1;
    setSelected(place);
    setQuery(place.label);
    setSearching(false);
    setResults([]);
    setBusy(false);
    setError('');
  };

  const selectPoint = async (point) => {
    const id = reverseId.current + 1;
    reverseId.current = id;
    setSelected(null);
    setSearching(false);
    setResults([]);
    setBusy(true);
    setError('');
    try {
      const places = await findPlaces(`reverse?lat=${point.lat}&lon=${point.lng}&lang=en`);
      if (id !== reverseId.current) return;
      if (!places.length) {
        setError('Please select a location in Sweden.');
        return;
      }
      choose({ ...places[0], ...point });
    } catch {
      if (id === reverseId.current) setError('We could not identify this location. Please search for a Swedish city or address.');
    } finally {
      if (id === reverseId.current) setBusy(false);
    }
  };

  const locate = () => {
    if (!navigator.geolocation) {
      setError('Your browser does not support location access. Search for your address instead.');
      return;
    }
    setBusy(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      (position) => selectPoint({ lat: position.coords.latitude, lng: position.coords.longitude }),
      () => {
        setBusy(false);
        setError('Location access was unavailable. Search for your address instead.');
      },
      { timeout: 10000 }
    );
  };

  const clearSearch = () => {
    reverseId.current += 1;
    setQuery('');
    setSelected(null);
    setSearching(false);
    setResults([]);
    setBusy(false);
    setError('');
  };

  return (
    <div className="map-location-picker">
      <header>
        <h2>Where should we deliver?</h2>
        <p>Find your Swedish city or address, then confirm your location.</p>
      </header>
      <div className="location-search-row">
        <button className="locate-button" onClick={locate} aria-label="Use my current location" disabled={busy}><AimOutlined /></button>
        <div className="location-search-field">
          <SearchOutlined />
          <input
            autoFocus
            aria-label="Search delivery location"
            placeholder="Search a Swedish address or city"
            value={query}
            onChange={(event) => {
              reverseId.current += 1;
              setQuery(event.target.value);
              setSelected(null);
              setSearching(true);
              setBusy(false);
              setError('');
            }}
            onKeyDown={(event) => { if (event.key === 'Escape') setSearching(false); }}
          />
          <button aria-label="Clear location search" onClick={clearSearch}><CloseOutlined /></button>
        </div>
        {searching && results.length > 0 && (
          <div className="location-results" aria-label="Location suggestions">
            {results.map((place, index) => (
              <button key={`${place.lat}-${place.lng}-${index}`} onClick={() => choose(place)}>
                <EnvironmentOutlined />
                <span><strong>{place.street || place.city}</strong><small>{place.label}</small></span>
              </button>
            ))}
            <small>Search powered by Photon · OpenStreetMap</small>
          </div>
        )}
      </div>
      <div className="location-map-body">
        <LocationMap point={Number.isFinite(selected?.lat) ? selected : null} onSelect={selectPoint} />
        <p className="location-map-hint">Select a result, click the map, or drag the pin to adjust your location.</p>
        {busy && <p role="status">Finding your location…</p>}
        {error && <p className="market-error" role="alert">{error}</p>}
        {selected && (
          <div className="selected-location">
            <EnvironmentOutlined />
            <span>
              <strong>{selected.street || selected.city}</strong>
              <small>{selected.label || [selected.city, selected.postcode].filter(Boolean).join(', ')}</small>
            </span>
          </div>
        )}
      </div>
      <footer>
        <button className="market-primary" disabled={!selected || busy} onClick={() => onSave(selected)}>Confirm location</button>
        <small>You can add your full delivery address at checkout.</small>
      </footer>
    </div>
  );
}
