'use client';

import React from 'react';
import { ArrowRightOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { useMarket } from '@/components/providers/MarketProvider';
import { slugify } from '@/lib/market-model';
import Quantity from '@/components/market/Quantity';
import { useCatalog } from '@/components/providers/CatalogProvider';

export default function ProductCard({ item }) {
  const { farmData, productData, categoryTabs } = useCatalog();

  const m = useMarket(); const slug = slugify(item.title); const inCart = m.cart.find((l) => l.slug === slug && l.pack === 'single');
  return <article className="market-product-card"><div className="market-product-image"><a href={`/product/${slug}`}><img src={item.image} alt={item.title} loading="lazy" /></a>{item.tag && <span className="market-product-tag">{item.tag}</span>}</div><div className="market-product-copy"><a href={`/farm/${item.farmId}`} className="market-product-farm"><HomeOutlined /> {farmData[item.farmId].name}</a><h3><a href={`/product/${slug}`}>{item.title}</a></h3><span className="market-product-category">{categoryTabs.find((c) => c.id === item.category)?.label}</span><div className="market-product-bottom"><strong>{item.price}</strong>{inCart ? <Quantity value={inCart.quantity} label={item.title} onChange={(q) => m.updateQuantity(`${slug}:single`, q)} /> : <button className="market-add" onClick={() => m.add(item)} aria-label={`Add ${item.title}`}><PlusOutlined /> Add</button>}</div></div></article>;
}
