'use client';

import React, { useState } from 'react';
import { Modal } from 'antd';
import { ArrowRightOutlined, CheckCircleOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useMarket } from '@/components/providers/MarketProvider';
import { useGo } from '@/lib/navigation';
import { slugify } from '@/lib/market-model';
import { LocationPicker } from '@/components/map/LazyMap';
import CategoryChips from '@/components/market/CategoryChips';
import { useCatalog } from '@/components/providers/CatalogProvider';

export default function MarketTools() {
  const go = useGo();
  const { farmData, productData, categoryTabs } = useCatalog();

  const m = useMarket();
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const farms = Object.entries(farmData).filter(([, f]) => `${f.name} ${f.location} ${f.practices.join(' ')}`.toLowerCase().includes(q));
  const products = productData.filter((p) => `${p.title} ${farmData[p.farmId].name}`.toLowerCase().includes(q));
  const navigate = (path) => { m.setSearchOpen(false); go(path); };
  return <>
    <Modal open={m.locationOpen} onCancel={m.closeLocation} footer={null} title="Where should we deliver?" className="market-modal map-delivery-modal" width={860} centered destroyOnHidden>
      <LocationPicker onSave={m.confirmLocation} initial={m.location} />
    </Modal>
    <Modal open={m.searchOpen} onCancel={() => m.setSearchOpen(false)} footer={null} title="Find your farm favourites" className="market-modal">
      <label className="market-search"><SearchOutlined /><input autoFocus aria-label="Search farms and products" placeholder="Try milk, vegetables, or a farm…" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
      {!q ? <div className="market-search-suggestions"><p>Explore by category</p><CategoryChips value="" onChange={(id) => navigate(`/farms?category=${id}`)} /></div> : <div className="search-results">
        <h3>Farms <small>{farms.length}</small></h3>{farms.slice(0, 4).map(([id, f]) => <button key={id} onClick={() => navigate(`/farm/${id}`)}><img src={f.image} alt="" /><span><strong>{f.name}</strong><small>{f.location}</small></span><ArrowRightOutlined /></button>)}
        <h3>Products <small>{products.length}</small></h3>{products.slice(0, 5).map((p) => <button key={p.title} onClick={() => navigate(`/product/${slugify(p.title)}`)}><img src={p.image} alt="" /><span><strong>{p.title}</strong><small>{farmData[p.farmId].name} · {p.price}</small></span><ArrowRightOutlined /></button>)}
        {!farms.length && !products.length && <p>No matches. Try a different product or farm name.</p>}
        {products.length > 5 && <button className="market-link" onClick={() => navigate(`/products?search=${encodeURIComponent(query)}`)}>View all matching products <ArrowRightOutlined /></button>}
      </div>}
    </Modal>
    {m.notice && <div className="market-toast" role="status"><CheckCircleOutlined /><span>{m.notice}</span><button onClick={() => go('/cart')}>View basket</button><button onClick={() => m.setNotice('')} aria-label="Dismiss notification"><CloseOutlined /></button></div>}
  </>;
}
