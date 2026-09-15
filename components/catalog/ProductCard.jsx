'use client';

import React from 'react';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useGo } from '@/lib/navigation';
import { productPath } from '@/lib/market-model';
import FarmLink from '@/components/catalog/FarmLink';
import { useCatalog } from '@/components/providers/CatalogProvider';

export default function ProductCard({ item, compact = false, onAdd }) {
  const go = useGo();
  const { farmData, productData, categoryTabs } = useCatalog();

  const farm = farmData[item.farmId];
  const category = categoryTabs.find((tab) => tab.id === item.category)?.label;
  const path = productPath(item);

  return (
    <article className={`product-card scroll-reveal ${compact ? 'compact' : ''}`}>
      {item.tag && <span className="sale-ribbon">{item.tag}</span>}
      <button className="product-image product-image-button" type="button" onClick={() => go(path)} aria-label={`View ${item.title}`}>
        <img src={item.image} alt={item.title} />
      </button>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3>
          <button className="product-title-button" type="button" onClick={() => go(path)}>
            {item.title}
          </button>
        </h3>
        <div className="product-meta">
          <FarmLink farmId={item.farmId} />
          <span><EnvironmentOutlined /> {farm.location}</span>
        </div>
        <div className="product-card-bottom">
          <p>{item.price}</p>
          <button type="button" onClick={() => onAdd(item)}>Add</button>
        </div>
      </div>
    </article>
  );
}
