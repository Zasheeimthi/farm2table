'use client';

import { categories } from '@/lib/catalog.js';
import CategoryArtwork from './CategoryArtwork.jsx';

/** Home page "Fresh & Clean" category cards that filter the product grid. */
export default function CategoryFilter({ activeCategory, onChange }) {
  return (
    <div className="category-filters" role="group" aria-label="Product categories">
      {categories.map((tab) => (
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
