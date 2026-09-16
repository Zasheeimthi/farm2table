"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "@/components/layout/Breadcrumb.jsx";
import { CategoryChips } from "@/components/category/CategoryChips.jsx";
import { Empty } from "@/components/common/Empty.jsx";
import { EnvironmentOutlined } from "@ant-design/icons";
import { FarmRegionMap } from "@/components/location/LocationPicker";
import { LocationBar } from "@/components/common/LocationBar.jsx";
import { NotFound } from "@/components/common/NotFound.jsx";
import { Page } from "@/components/layout/Page.jsx";
import { ProductCard } from "@/components/product/ProductCard.jsx";
import { SaveButton } from "@/components/common/SaveButton.jsx";
import { SearchOutlined } from "@ant-design/icons";
import { TruckOutlined } from "@ant-design/icons";
import { categoryTabs } from "@/lib/catalog";
import { farmData } from "@/lib/catalog";
import { productData } from "@/lib/catalog";
import { useEffect } from "react";
import { useState } from "react";
export function FarmPage({
  farmId
}) {
  const f = farmData[farmId];
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  useEffect(() => {
    setCategory('all');
    setSearch('');
  }, [farmId]);
  if (!f) return <NotFound />;
  const all = productData.filter(p => p.farmId === farmId);
  const categories = categoryTabs.filter(c => c.id !== 'all' && all.some(p => p.category === c.id));
  const products = all.filter(p => (category === 'all' || p.category === category) && p.title.toLowerCase().includes(search.trim().toLowerCase()));
  return <Page className="market-farm-detail"><div className="market-container">
    <Breadcrumb items={[['Farms', '/farms'], [f.name]]} />
    <section className="market-farm-hero"><img src={f.image} alt={f.name} /><div className="market-farm-hero-shade" /><div className="market-farm-hero-copy"><span className="market-kicker">Independent roots. Shared values.</span><h1>{f.name}</h1><p><EnvironmentOutlined /> {f.location} <span>·</span> {all.length} products</p></div><SaveButton id={`farm:${farmId}`} label={f.name} /></section>
    <div className="market-farm-introduction"><p>{f.summary}</p><div className="market-tags">{f.practices.map(p => <span key={p}>{p}</span>)}</div></div>
    <LocationBar />
    <section className="farm-shop"><div className="market-results-heading"><div><span className="eyebrow">Fresh from {f.name}</span><h2>Shop the farm.</h2></div><label className="market-search"><SearchOutlined /><input aria-label="Search this farm" placeholder={`Search ${f.name}`} value={search} onChange={e => setSearch(e.target.value)} /></label></div>
    <CategoryChips value={category} onChange={setCategory} available={categories.map(c => c.id)} />
    {categories.map(c => {
          const items = products.filter(p => p.category === c.id);
          return items.length > 0 && <section className="farm-category-group" key={c.id}><div className="farm-category-heading"><h3>{c.label}</h3><span>{items.length} {items.length === 1 ? 'item' : 'items'}</span></div><div className="market-product-grid four">{items.map(p => <ProductCard key={p.title} item={p} />)}</div></section>;
        })}
    {!products.length && <Empty title="No products found." text="Try another category or search." action="Show all farm products" onAction={() => {
          setCategory('all');
          setSearch('');
        }} />}</section>
    <section className="farm-information"><article><span className="eyebrow">Farm information</span><h2>Get to know {f.name}.</h2><p>{f.summary}</p><dl><div><dt><EnvironmentOutlined /> Farm location</dt><dd>{f.address || f.location}</dd>{!f.address && <dd className="market-note">Region shown. Exact visiting address is not available.</dd>}</div><div><dt><TruckOutlined /> Delivery</dt><dd>Availability depends on your delivery location.</dd><dd className="market-note">Delivery coverage will be confirmed when live ordering is available.</dd></div></dl><div className="market-tags">{f.practices.map(p => <span key={p}>{p}</span>)}</div></article>
    <aside className="farm-location-panel"><span className="eyebrow">Farm location</span><h3>Explore the area</h3><p>{f.location}</p><FarmRegionMap location={f.address || f.location} /><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.address || f.location)}`} target="_blank" rel="noreferrer" className="market-link">Open area in maps <ArrowRightOutlined /></a></aside></section>
  </div></Page>;
}
