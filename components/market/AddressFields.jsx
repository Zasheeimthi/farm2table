'use client';

import React from 'react';

export default function AddressFields({ value, onChange }) {
  const field = (name) => ({ value: value[name] || '', onChange: (e) => onChange({ ...value, [name]: e.target.value }) });
  return <><label>Street and house number<input {...field('street')} autoComplete="street-address" required pattern=".*[0-9].*" title="Include a street name and house number" placeholder="Street name and number" /></label><div className="market-field-pair"><label>City<input {...field('city')} autoComplete="address-level2" required minLength={2} placeholder="City" /></label><label>Postal code<input {...field('postcode')} autoComplete="postal-code" required pattern="(?:[0-9]{3} ?[0-9]{2}|[0-9]{6})" inputMode="numeric" placeholder="123 45 or 123456" /></label></div></>;
}
