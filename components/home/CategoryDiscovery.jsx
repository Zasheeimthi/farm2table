'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import { categories } from '@/lib/catalog.js';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import { useStorefront } from '@/context/StorefrontContext.jsx';
import CategoryArtwork from './CategoryArtwork.jsx';

/** "Find your farm favourites" grid. Each card sets the active category and opens the farms directory. */
export default function CategoryDiscovery() {
  const go = useGo();
  const { setActiveCategory } = useStorefront();

  return (
    <section className="category-discovery" aria-labelledby="category-discovery-title">
      <div className="category-discovery-heading">
        <div>
          <span>Good food starts here</span>
          <h2 id="category-discovery-title">Find your farm favourites.</h2>
        </div>
        <button type="button" onClick={() => { setActiveCategory('all'); go(routes.farms); }}>
          Explore all farms <ArrowRightOutlined />
        </button>
      </div>
      <div className="category-discovery-grid">
        {categories.slice(1).map((tab, index) => (
          <button
            className={`category-discovery-card category-tone-${index}`}
            type="button"
            key={tab.id}
            onClick={() => { setActiveCategory(tab.id); go(routes.farmsByCategory(tab.id)); }}
          >
            <span className="category-artwork"><CategoryArtwork category={tab.id} /></span>
            <span className="category-discovery-label">{tab.label}</span>
            <span className="category-discovery-arrow" aria-hidden="true"><ArrowRightOutlined /></span>
          </button>
        ))}
      </div>
    </section>
  );
}
