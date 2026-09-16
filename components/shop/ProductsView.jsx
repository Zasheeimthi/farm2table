'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftOutlined, ArrowRightOutlined, HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { categoryLabel, farmData, productData } from '@/lib/catalog.js';
import { priceOf } from '@/lib/market-model.js';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import Page from '@/components/common/Page.jsx';
import PageHeading from '@/components/common/PageHeading.jsx';
import Breadcrumb from '@/components/common/Breadcrumb.jsx';
import CategoryChips from '@/components/common/CategoryChips.jsx';
import EmptyState from '@/components/common/EmptyState.jsx';
import LocationBar from '@/components/common/LocationBar.jsx';
import MarketProductCard from '@/components/product/MarketProductCard.jsx';

const pageSize = 12;

/** Products directory (`/products`) with filters, search, sort and pagination. */
export default function ProductsView({ search: searchParam = '', category = 'all', farm: farmParam = 'all' }) {
  const go = useGo();
  const [query, setQuery] = useState(searchParam);
  const [farm, setFarm] = useState(farmParam);
  const [sort, setSort] = useState('recommended');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setQuery(searchParam);
    setFarm(farmParam);
  }, [searchParam, farmParam]);

  useEffect(() => { setPage(1); }, [query, category, farm, sort]);

  const products = productData
    .filter((product) => (category === 'all' || category === product.category)
      && (farm === 'all' || farm === product.farmId)
      && `${product.title} ${farmData[product.farmId].name} ${categoryLabel(product.category)}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => sort === 'low'
      ? priceOf(a) - priceOf(b)
      : sort === 'high'
        ? priceOf(b) - priceOf(a)
        : sort === 'name'
          ? a.title.localeCompare(b.title)
          : 0);

  const pages = Math.max(1, Math.ceil(products.length / pageSize));
  const current = Math.min(page, pages);

  return (
    <Page>
      <div className="market-container">
        <Breadcrumb items={[['Products']]} />
        <PageHeading eyebrow="Fresh from our farm community" title={<>Good food. <em>Known origins.</em></>}>
          Discover the weekly harvest, everyday staples, and something a little special from our producers.
        </PageHeading>
        <LocationBar />
        <div className="market-products-layout">
          <aside className="market-filters">
            <h2>Make it yours.</h2>
            <span className="market-filter-label">Shop by category</span>
            <CategoryChips value={category} onChange={(id) => go(routes.productsByCategory(id))} />
            <label className="market-filter-label" htmlFor="filter-farm">From your favourite farm</label>
            <select id="filter-farm" value={farm} onChange={(event) => setFarm(event.target.value)}>
              <option value="all">All farms &amp; producers</option>
              {Object.entries(farmData).map(([id, producer]) => <option key={id} value={id}>{producer.name}</option>)}
            </select>
            <div className="market-filter-note">
              <HomeOutlined />
              <strong>Every product has a home.</strong>
              <p>Tap a farm name to meet the producer and explore their whole collection.</p>
              <Link href={routes.farms}>Meet the farms <ArrowRightOutlined /></Link>
            </div>
          </aside>
          <section className="market-product-results">
            <div className="market-toolbar">
              <label className="market-search">
                <SearchOutlined />
                <input aria-label="Search products" placeholder="Search products or farms" value={query} onChange={(event) => setQuery(event.target.value)} />
              </label>
              <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="low">Price: Low to high</option>
                <option value="high">Price: High to low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </div>
            <p className="market-results-count" role="status">
              {products.length} products {farm !== 'all' && `from ${farmData[farm]?.name || 'selected farm'}`}
            </p>
            <div className="market-product-grid">
              {products.slice((current - 1) * pageSize, current * pageSize).map((product) => <MarketProductCard item={product} key={product.title} />)}
            </div>
            {!products.length && (
              <EmptyState
                title="Nothing in this patch yet."
                text="Try a different search, category, or farm."
                action="Clear filters"
                onAction={() => { setQuery(''); setFarm('all'); go(routes.products); }}
              />
            )}
            {pages > 1 && (
              <nav className="market-pagination" aria-label="Product pages">
                <button disabled={current === 1} onClick={() => setPage(current - 1)} aria-label="Previous page"><ArrowLeftOutlined /></button>
                {Array.from({ length: pages }, (_, index) => (
                  <button key={index} aria-current={current === index + 1 ? 'page' : undefined} onClick={() => setPage(index + 1)}>{index + 1}</button>
                ))}
                <button disabled={current === pages} onClick={() => setPage(current + 1)} aria-label="Next page"><ArrowRightOutlined /></button>
              </nav>
            )}
          </section>
        </div>
      </div>
    </Page>
  );
}
