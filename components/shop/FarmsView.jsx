'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRightOutlined, HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { farmData, productData } from '@/lib/catalog.js';
import { farmCount } from '@/lib/products.js';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import Page from '@/components/common/Page.jsx';
import PageHeading from '@/components/common/PageHeading.jsx';
import Breadcrumb from '@/components/common/Breadcrumb.jsx';
import CategoryChips from '@/components/common/CategoryChips.jsx';
import EmptyState from '@/components/common/EmptyState.jsx';
import LocationBar from '@/components/common/LocationBar.jsx';
import CatalogImage from '@/components/common/CatalogImage.jsx';
import FarmCard from '@/components/farm/FarmCard.jsx';

/** Farms directory (`/farms`). Category and search come from the URL. */
export default function FarmsView({ search: searchParam = '', category = 'all' }) {
  const go = useGo();
  const [search, setSearch] = useState(searchParam);
  const [sort, setSort] = useState('recommended');

  useEffect(() => { setSearch(searchParam); }, [searchParam]);

  const farms = Object.entries(farmData)
    .filter(([id, farm]) => {
      const relevant = productData.filter((product) => product.farmId === id);
      return (category === 'all' || relevant.some((product) => product.category === category))
        && `${farm.name} ${farm.location} ${farm.summary} ${relevant.map((product) => product.title).join(' ')}`.toLowerCase().includes(search.trim().toLowerCase());
    })
    .sort(([a, first], [b, second]) => sort === 'name'
      ? first.name.localeCompare(second.name)
      : sort === 'products'
        ? productData.filter((product) => product.farmId === b).length - productData.filter((product) => product.farmId === a).length
        : 0);

  return (
    <Page className="farms-directory">
      <div className="market-container">
        <Breadcrumb items={[['Our farms']]} />
        <div className="market-directory-intro">
          <PageHeading
            eyebrow="The people behind your plate"
            title={<>A world of good food.<br /><em>A community of farms.</em></>}
          >
            Meet independent growers, dairies, and fisheries. Shop each producer’s harvest and bring your favourites together in one basket.
          </PageHeading>
          <div className="farm-network-art">
            <CatalogImage src={farmData.solmarka.image} alt="Swedish farm landscape" sizes="(max-width: 900px) 90vw, 420px" />
            <div>
              <HomeOutlined />
              <strong>{farmCount}</strong>
              <span>farms &amp; producers<br />one shared table</span>
            </div>
          </div>
        </div>
        <LocationBar />
        <CategoryChips value={category} onChange={(id) => go(routes.farmsByCategory(id))} />
        <div className="market-results-heading">
          <div>
            <h2>Find your farm.</h2>
            <p>{farms.length} {farms.length === 1 ? 'producer' : 'producers'} to explore</p>
          </div>
          <div className="market-toolbar">
            <label className="market-search">
              <SearchOutlined />
              <input aria-label="Search farms" placeholder="Search farms or produce" value={search} onChange={(event) => setSearch(event.target.value)} />
            </label>
            <select aria-label="Sort farms" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="name">Farm name: A–Z</option>
              <option value="products">Most products</option>
            </select>
          </div>
        </div>
        <div className="market-farm-grid">
          {farms.map(([id]) => <FarmCard key={id} id={id} />)}
        </div>
        {!farms.length && (
          <EmptyState
            title="No farms found."
            text="Try another category or farm name."
            action="Reset filters"
            onAction={() => { setSearch(''); go(routes.farms); }}
          />
        )}
        <div className="market-promise">
          <HomeOutlined />
          <span>
            <strong>Your favourite farms, all in one place.</strong>
            <small>Explore a producer, choose your products, and see every farm in your basket.</small>
          </span>
          <Link href={routes.products}>Shop all products <ArrowRightOutlined /></Link>
        </div>
      </div>
    </Page>
  );
}
