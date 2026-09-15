'use client';

import React from 'react';
import CategoryIcon from '@/components/catalog/CategoryIcon';
import { useCatalog } from '@/components/providers/CatalogProvider';

export default function CategoryChips({ value, onChange, available }) {
  const { farmData, productData, categoryTabs } = useCatalog();

  return <div className="market-chips" aria-label="Categories">{categoryTabs.filter((c) => !available || c.id === 'all' || available.includes(c.id)).map((c) => <button key={c.id} className={c.id === value ? 'selected' : ''} aria-pressed={c.id === value} onClick={() => onChange(c.id)}><CategoryIcon name={c.icon} />{c.id === 'all' ? 'All categories' : c.label}</button>)}</div>;
}
