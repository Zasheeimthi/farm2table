'use client';

import { categories } from '@/lib/catalog.js';
import CategoryIcon from './CategoryIcon.jsx';

/** Shared category filter row used by the farms, products, farm and search screens. */
export default function CategoryChips({ value, onChange, available }) {
  return (
    <div className="market-chips" aria-label="Categories">
      {categories
        .filter((category) => !available || category.id === 'all' || available.includes(category.id))
        .map((category) => (
          <button
            key={category.id}
            className={category.id === value ? 'selected' : ''}
            aria-pressed={category.id === value}
            onClick={() => onChange(category.id)}
          >
            <CategoryIcon category={category.id} />
            {category.id === 'all' ? 'All categories' : category.label}
          </button>
        ))}
    </div>
  );
}
