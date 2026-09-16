'use client';

import { useMemo, useState } from 'react';
import { ArrowRightOutlined, CheckCircleOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { farmData, productData } from '@/lib/catalog.js';
import { slugify } from '@/lib/market-model.js';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import { useMarket } from '@/context/MarketContext.jsx';
import MarketModal from './MarketModal.jsx';
import CategoryChips from './CategoryChips.jsx';
import CatalogImage from './CatalogImage.jsx';
import { LocationPicker } from '@/components/map/MapClients.jsx';

/**
 * Global storefront tools: delivery-location dialog, search dialog and the
 * "added to basket" toast. Rendered once from the app layout.
 */
export default function MarketTools() {
  const market = useMarket();
  const go = useGo();
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  const farms = useMemo(
    () => Object.entries(farmData).filter(([, farm]) => `${farm.name} ${farm.location} ${farm.practices.join(' ')}`.toLowerCase().includes(q)),
    [q]
  );
  const products = useMemo(
    () => productData.filter((product) => `${product.title} ${farmData[product.farmId].name}`.toLowerCase().includes(q)),
    [q]
  );

  const navigate = (path) => {
    market.setSearchOpen(false);
    go(path);
  };

  return (
    <>
      <MarketModal
        open={market.locationOpen}
        onCancel={market.closeLocation}
        title="Where should we deliver?"
        className="map-delivery-modal"
        width={860}
        centered
        destroyOnHidden
      >
        <LocationPicker onSave={market.confirmLocation} initial={market.location} />
      </MarketModal>

      <MarketModal open={market.searchOpen} onCancel={() => market.setSearchOpen(false)} title="Find your farm favourites">
        <label className="market-search">
          <SearchOutlined />
          <input
            autoFocus
            aria-label="Search farms and products"
            placeholder="Try milk, vegetables, or a farm…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        {!q ? (
          <div className="market-search-suggestions">
            <p>Explore by category</p>
            <CategoryChips value="" onChange={(id) => navigate(routes.farmsByCategory(id))} />
          </div>
        ) : (
          <div className="search-results">
            <h3>Farms <small>{farms.length}</small></h3>
            {farms.slice(0, 4).map(([id, farm]) => (
              <button key={id} onClick={() => navigate(routes.farm(id))}>
                <CatalogImage src={farm.image} alt="" sizes="42px" />
                <span><strong>{farm.name}</strong><small>{farm.location}</small></span>
                <ArrowRightOutlined />
              </button>
            ))}
            <h3>Products <small>{products.length}</small></h3>
            {products.slice(0, 5).map((product) => (
              <button key={product.title} onClick={() => navigate(routes.product(slugify(product.title)))}>
                <CatalogImage src={product.image} alt="" sizes="42px" />
                <span><strong>{product.title}</strong><small>{farmData[product.farmId].name} · {product.price}</small></span>
                <ArrowRightOutlined />
              </button>
            ))}
            {!farms.length && !products.length && <p>No matches. Try a different product or farm name.</p>}
            {products.length > 5 && (
              <button className="market-link" onClick={() => navigate(routes.productsBySearch(query))}>
                View all matching products <ArrowRightOutlined />
              </button>
            )}
          </div>
        )}
      </MarketModal>

      {market.notice && (
        <div className="market-toast" role="status">
          <CheckCircleOutlined />
          <span>{market.notice}</span>
          <button onClick={() => go(routes.cart)}>View basket</button>
          <button onClick={() => market.setNotice('')} aria-label="Dismiss notification"><CloseOutlined /></button>
        </div>
      )}
    </>
  );
}
