'use client';

import Link from 'next/link';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { categoryLabel, farmData } from '@/lib/catalog.js';
import { slugify } from '@/lib/market-model.js';
import { routes } from '@/lib/routes.js';
import { useMarket } from '@/context/MarketContext.jsx';
import CatalogImage from '@/components/common/CatalogImage.jsx';
import QuantityStepper from '@/components/common/QuantityStepper.jsx';

/** Marketplace product card used on the products, farm, related and saved grids. */
export default function MarketProductCard({ item }) {
  const market = useMarket();
  const slug = slugify(item.title);
  const inCart = market.cart.find((line) => line.slug === slug && line.pack === 'single');

  return (
    <article className="market-product-card">
      <div className="market-product-image">
        <Link href={routes.product(slug)}><CatalogImage src={item.image} alt={item.title} sizes="(max-width: 720px) 45vw, 250px" /></Link>
        {item.tag && <span className="market-product-tag">{item.tag}</span>}
      </div>
      <div className="market-product-copy">
        <Link href={routes.farm(item.farmId)} className="market-product-farm">
          <HomeOutlined /> {farmData[item.farmId].name}
        </Link>
        <h3><Link href={routes.product(slug)}>{item.title}</Link></h3>
        <span className="market-product-category">{categoryLabel(item.category)}</span>
        <div className="market-product-bottom">
          <strong>{item.price}</strong>
          {inCart ? (
            <QuantityStepper value={inCart.quantity} label={item.title} onChange={(quantity) => market.updateQuantity(`${slug}:single`, quantity)} />
          ) : (
            <button className="market-add" onClick={() => market.add(item)} aria-label={`Add ${item.title}`}><PlusOutlined /> Add</button>
          )}
        </div>
      </div>
    </article>
  );
}
