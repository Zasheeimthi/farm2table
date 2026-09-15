'use client';

import React from 'react';
import { ArrowRightOutlined, EnvironmentOutlined, HomeOutlined } from '@ant-design/icons';
import SaveButton from '@/components/market/SaveButton';
import { useCatalog } from '@/components/providers/CatalogProvider';

export default function FarmCard({ id }) {
  const { farmData, productData, categoryTabs } = useCatalog();

  const f = farmData[id]; const products = productData.filter((p) => p.farmId === id);
  const categories = [...new Set(products.map((p) => p.category))];
  return <article className="market-farm-card"><div className="market-farm-image"><a href={`/farm/${id}`}><img src={f.image} alt={f.name} loading="lazy" /></a><span className="market-farm-badge"><HomeOutlined /> {id === 'farmtable' ? 'Partner collection' : 'Meet the producer'}</span><SaveButton id={`farm:${id}`} label={f.name} /></div><div className="market-farm-copy"><span className="market-kicker"><EnvironmentOutlined /> {f.location}</span><h2><a href={`/farm/${id}`}>{f.name}</a></h2><p>{f.summary}</p><div className="market-farm-actions"><div className="market-tags">{categories.slice(0, 2).map((c) => <span key={c}>{categoryTabs.find((tab) => tab.id === c)?.label}</span>)}</div><a className="market-farm-bottom" href={`/farm/${id}`} aria-label={`Shop ${f.name}`}><span>Shop farm <ArrowRightOutlined /></span></a></div></div></article>;
}
