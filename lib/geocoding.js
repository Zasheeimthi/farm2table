/**
 * Photon / OpenStreetMap lookups used by the delivery-location dialog and the
 * farm region map. Runs in the browser only (the API is called directly from
 * the user's device, exactly as before the migration).
 */

export function placeFromFeature(feature) {
  const properties = feature.properties;
  const [lng, lat] = feature.geometry.coordinates;
  return {
    lat,
    lng,
    countryCode: properties.countrycode?.toUpperCase(),
    city: properties.city || properties.town || properties.village || properties.name || properties.county || '',
    street: [properties.street, properties.housenumber].filter(Boolean).join(' '),
    postcode: properties.postcode || '',
    label: [properties.name, properties.street, properties.city, properties.country]
      .filter((value, index, all) => value && all.indexOf(value) === index)
      .join(', ')
  };
}

export async function findPlaces(path, signal) {
  const response = await fetch(`https://photon.komoot.io/${path}`, {
    signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(10000)]) : AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error('Search is unavailable. Please try again.');
  const data = await response.json();
  return data.features.map(placeFromFeature).filter((place) => place.countryCode === 'SE');
}
