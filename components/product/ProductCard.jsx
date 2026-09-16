'use client';

import { EnvironmentOutlined } from '@ant-design/icons';
import { categoryLabel, farmData } from '@/lib/catalog.js';
import { productPath } from '@/lib/products.js';
import { useGo } from '@/hooks/useGo.js';
import CatalogImage from '@/components/common/CatalogImage.jsx';
import FarmLink from '@/components/common/FarmLink.jsx';

/** Home-page product card (`product-card` + scroll reveal). */
export default function ProductCard({ item, compact = false, onAdd }) {
  const go = useGo();
  const farm = farmData[item.farmId];
  const category = categoryLabel(item.category);
  const path = productPath(item);

  return (
    <article className={`product-card scroll-reveal ${compact ? 'compact' : ''}`}>
      {item.tag && <span className="sale-ribbon">{item.tag}</span>}
      <button className="product-image product-image-button" type="button" onClick={() => go(path)} aria-label={`View ${item.title}`}>
        <CatalogImage src={item.image} alt={item.title} sizes="(max-width: 720px) 45vw, 270px" />
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
