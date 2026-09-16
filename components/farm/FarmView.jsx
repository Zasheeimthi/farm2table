'use client';

import { useEffect, useState } from 'react';
import { ArrowRightOutlined, EnvironmentOutlined, SearchOutlined, TruckOutlined } from '@ant-design/icons';
import { productsForFarm, farmCategoryTabs } from '@/lib/products.js';
import { routes } from '@/lib/routes.js';
import Page from '@/components/common/Page.jsx';
import Breadcrumb from '@/components/common/Breadcrumb.jsx';
import CategoryChips from '@/components/common/CategoryChips.jsx';
import EmptyState from '@/components/common/EmptyState.jsx';
import LocationBar from '@/components/common/LocationBar.jsx';
import SaveButton from '@/components/common/SaveButton.jsx';
import CatalogImage from '@/components/common/CatalogImage.jsx';
import MarketProductCard from '@/components/product/MarketProductCard.jsx';
import { FarmRegionMap } from '@/components/map/MapClients.jsx';

/** Producer page (`/farm/[farmId]`). The farm record is resolved on the server. */
export default function FarmView({ farmId, farm }) {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setCategory('all');
    setSearch('');
  }, [farmId]);

  const all = productsForFarm(farmId);
  const categories = farmCategoryTabs(farmId);
  const products = all.filter((product) => (category === 'all' || product.category === category)
    && product.title.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <Page className="market-farm-detail">
      <div className="market-container">
        <Breadcrumb items={[['Farms', routes.farms], [farm.name]]} />
        <section className="market-farm-hero">
          <CatalogImage src={farm.image} alt={farm.name} sizes="100vw" />
          <div className="market-farm-hero-shade" />
          <div className="market-farm-hero-copy">
            <span className="market-kicker">Independent roots. Shared values.</span>
            <h1>{farm.name}</h1>
            <p><EnvironmentOutlined /> {farm.location} <span>·</span> {all.length} products</p>
          </div>
          <SaveButton id={`farm:${farmId}`} label={farm.name} />
        </section>
        <div className="market-farm-introduction">
          <p>{farm.summary}</p>
          <div className="market-tags">{farm.practices.map((practice) => <span key={practice}>{practice}</span>)}</div>
        </div>
        <LocationBar />
        <section className="farm-shop">
          <div className="market-results-heading">
            <div>
              <span className="eyebrow">Fresh from {farm.name}</span>
              <h2>Shop the farm.</h2>
            </div>
            <label className="market-search">
              <SearchOutlined />
              <input aria-label="Search this farm" placeholder={`Search ${farm.name}`} value={search} onChange={(event) => setSearch(event.target.value)} />
            </label>
          </div>
          <CategoryChips value={category} onChange={setCategory} available={categories.map((item) => item.id)} />
          {categories.map((item) => {
            const items = products.filter((product) => product.category === item.id);
            return items.length > 0 && (
              <section className="farm-category-group" key={item.id}>
                <div className="farm-category-heading">
                  <h3>{item.label}</h3>
                  <span>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
                </div>
                <div className="market-product-grid four">
                  {items.map((product) => <MarketProductCard key={product.title} item={product} />)}
                </div>
              </section>
            );
          })}
          {!products.length && (
            <EmptyState
              title="No products found."
              text="Try another category or search."
              action="Show all farm products"
              onAction={() => { setCategory('all'); setSearch(''); }}
            />
          )}
        </section>
        <section className="farm-information">
          <article>
            <span className="eyebrow">Farm information</span>
            <h2>Get to know {farm.name}.</h2>
            <p>{farm.summary}</p>
            <dl>
              <div>
                <dt><EnvironmentOutlined /> Farm location</dt>
                <dd>{farm.address || farm.location}</dd>
                {!farm.address && <dd className="market-note">Region shown. Exact visiting address is not available.</dd>}
              </div>
              <div>
                <dt><TruckOutlined /> Delivery</dt>
                <dd>Availability depends on your delivery location.</dd>
                <dd className="market-note">Delivery coverage will be confirmed when live ordering is available.</dd>
              </div>
            </dl>
            <div className="market-tags">{farm.practices.map((practice) => <span key={practice}>{practice}</span>)}</div>
          </article>
          <aside className="farm-location-panel">
            <span className="eyebrow">Farm location</span>
            <h3>Explore the area</h3>
            <p>{farm.location}</p>
            <FarmRegionMap location={farm.address || farm.location} />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(farm.address || farm.location)}`}
              target="_blank"
              rel="noreferrer"
              className="market-link"
            >
              Open area in maps <ArrowRightOutlined />
            </a>
          </aside>
        </section>
      </div>
    </Page>
  );
}
