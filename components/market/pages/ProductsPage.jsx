'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeftOutlined, ArrowRightOutlined, HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { useGo } from '@/lib/navigation';
import { priceOf } from '@/lib/market-model';
import Page from '@/components/market/Page';
import Breadcrumb from '@/components/market/Breadcrumb';
import Heading from '@/components/market/Heading';
import LocationBar from '@/components/market/LocationBar';
import CategoryChips from '@/components/market/CategoryChips';
import Empty from '@/components/market/Empty';
import ProductCard from '@/components/market/pages/ProductCard';
import { useCatalog } from '@/components/providers/CatalogProvider';

export default function ProductsPage() {
  const go = useGo();
  const { farmData, productData, categoryTabs } = useCatalog();

  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('search') || '');
  const category = params.get('category') || 'all';
  const [farm, setFarm] = useState(params.get('farm') || 'all');
  const [sort, setSort] = useState('recommended');
  const [page, setPage] = useState(1);
  useEffect(() => { setQuery(params.get('search') || ''); setFarm(params.get('farm') || 'all'); }, [params.toString()]);
  useEffect(() => { setPage(1); }, [query, category, farm, sort]);
  const products = productData.filter((p) => (category === 'all' || category === p.category) && (farm === 'all' || farm === p.farmId) && `${p.title} ${farmData[p.farmId].name} ${categoryTabs.find((c) => c.id === p.category)?.label}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => sort === 'low' ? priceOf(a) - priceOf(b) : sort === 'high' ? priceOf(b) - priceOf(a) : sort === 'name' ? a.title.localeCompare(b.title) : 0);
  const pages = Math.max(1, Math.ceil(products.length / 12)); const current = Math.min(page, pages);
  return <Page><div className="market-container"><Breadcrumb items={[[ 'Products' ]]} /><Heading eyebrow="Fresh from our farm community" title={<>Good food. <em>Known origins.</em></>}>Discover the weekly harvest, everyday staples, and something a little special from our producers.</Heading><LocationBar /><div className="market-products-layout"><aside className="market-filters"><h2>Make it yours.</h2><span className="market-filter-label">Shop by category</span><CategoryChips value={category} onChange={(id) => go(`/products?category=${id}`)} /><label className="market-filter-label" htmlFor="filter-farm">From your favourite farm</label><select id="filter-farm" value={farm} onChange={(e) => setFarm(e.target.value)}><option value="all">All farms & producers</option>{Object.entries(farmData).map(([id, f]) => <option key={id} value={id}>{f.name}</option>)}</select><div className="market-filter-note"><HomeOutlined /><strong>Every product has a home.</strong><p>Tap a farm name to meet the producer and explore their whole collection.</p><a href="/farms">Meet the farms <ArrowRightOutlined /></a></div></aside><section className="market-product-results"><div className="market-toolbar"><label className="market-search"><SearchOutlined /><input aria-label="Search products" placeholder="Search products or farms" value={query} onChange={(e) => setQuery(e.target.value)} /></label><select aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="low">Price: Low to high</option><option value="high">Price: High to low</option><option value="name">Name: A–Z</option></select></div><p className="market-results-count" role="status">{products.length} products {farm !== 'all' && `from ${farmData[farm]?.name || 'selected farm'}`}</p><div className="market-product-grid">{products.slice((current - 1) * 12, current * 12).map((p) => <ProductCard item={p} key={p.title} />)}</div>{!products.length && <Empty title="Nothing in this patch yet." text="Try a different search, category, or farm." action="Clear filters" onAction={() => { setQuery(''); setFarm('all'); go('/products'); }} />}{pages > 1 && <nav className="market-pagination" aria-label="Product pages"><button disabled={current === 1} onClick={() => setPage(current - 1)} aria-label="Previous page"><ArrowLeftOutlined /></button>{Array.from({ length: pages }, (_, i) => <button key={i} aria-current={current === i + 1 ? 'page' : undefined} onClick={() => setPage(i + 1)}>{i + 1}</button>)}<button disabled={current === pages} onClick={() => setPage(current + 1)} aria-label="Next page"><ArrowRightOutlined /></button></nav>}</section></div></div></Page>;
}
