'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRightOutlined, HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { useGo } from '@/lib/navigation';
import Page from '@/components/market/Page';
import Breadcrumb from '@/components/market/Breadcrumb';
import Heading from '@/components/market/Heading';
import LocationBar from '@/components/market/LocationBar';
import CategoryChips from '@/components/market/CategoryChips';
import FarmCard from '@/components/market/FarmCard';
import Empty from '@/components/market/Empty';
import { useCatalog } from '@/components/providers/CatalogProvider';

export default function FarmsPage() {
  const go = useGo();
  const { farmData, productData, categoryTabs } = useCatalog();

  const params = useSearchParams();
  const [search, setSearch] = useState(params.get('search') || '');
  const category = params.get('category') || 'all';
  const [sort, setSort] = useState('recommended');
  useEffect(() => { setSearch(params.get('search') || ''); }, [params.get('search')]);
  const farms = Object.entries(farmData).filter(([id, f]) => {
    const relevant = productData.filter((p) => p.farmId === id);
    return (category === 'all' || relevant.some((p) => p.category === category)) && `${f.name} ${f.location} ${f.summary} ${relevant.map((p) => p.title).join(' ')}`.toLowerCase().includes(search.trim().toLowerCase());
  }).sort(([a, first], [b, second]) => sort === 'name' ? first.name.localeCompare(second.name) : sort === 'products' ? productData.filter((p) => p.farmId === b).length - productData.filter((p) => p.farmId === a).length : 0);
  return <Page className="farms-directory"><div className="market-container"><Breadcrumb items={[[ 'Our farms' ]]} /><div className="market-directory-intro"><Heading eyebrow="The people behind your plate" title={<>A world of good food.<br /><em>A community of farms.</em></>}>Meet independent growers, dairies, and fisheries. Shop each producer’s harvest and bring your favourites together in one basket.</Heading><div className="farm-network-art"><img src={farmData.solmarka.image} alt="Swedish farm landscape" /><div><HomeOutlined /><strong>{Object.keys(farmData).length}</strong><span>farms & producers<br />one shared table</span></div></div></div><LocationBar /><CategoryChips value={category} onChange={(id) => go(`/farms?category=${id}`)} /><div className="market-results-heading"><div><h2>Find your farm.</h2><p>{farms.length} {farms.length === 1 ? 'producer' : 'producers'} to explore</p></div><div className="market-toolbar"><label className="market-search"><SearchOutlined /><input aria-label="Search farms" placeholder="Search farms or produce" value={search} onChange={(e) => setSearch(e.target.value)} /></label><select aria-label="Sort farms" value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="name">Farm name: A–Z</option><option value="products">Most products</option></select></div></div><div className="market-farm-grid">{farms.map(([id]) => <FarmCard key={id} id={id} />)}</div>{!farms.length && <Empty title="No farms found." text="Try another category or farm name." action="Reset filters" onAction={() => { setSearch(''); go('/farms'); }} />}<div className="market-promise"><HomeOutlined /><span><strong>Your favourite farms, all in one place.</strong><small>Explore a producer, choose your products, and see every farm in your basket.</small></span><a href="/products">Shop all products <ArrowRightOutlined /></a></div></div></Page>;
}
