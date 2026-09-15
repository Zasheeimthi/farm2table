'use client';

import React from 'react';
import CategoryArtwork from '@/components/catalog/CategoryArtwork';
import { useCatalog } from '@/components/providers/CatalogProvider';

export default function CategoryFilter({ activeCategory, onChange }) {
  const { farmData, productData, categoryTabs } = useCatalog();

  return (
    <div className="category-filters" role="group" aria-label="Product categories">
      {categoryTabs.map((tab) => (
        <button
          className="category-filter-card"
          data-category={tab.id}
          aria-pressed={activeCategory === tab.id}
          onClick={() => onChange(tab.id)}
          type="button"
          key={tab.id}
        >
          <span className="category-filter-art"><CategoryArtwork category={tab.id} /></span>
          <span className="category-filter-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
