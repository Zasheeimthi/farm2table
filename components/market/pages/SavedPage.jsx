'use client';

import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useMarket } from '@/components/providers/MarketProvider';
import { useGo } from '@/lib/navigation';
import { slugify } from '@/lib/market-model';
import Page from '@/components/market/Page';
import Breadcrumb from '@/components/market/Breadcrumb';
import Heading from '@/components/market/Heading';
import Empty from '@/components/market/Empty';
import FarmCard from '@/components/market/FarmCard';
import ProductCard from '@/components/market/pages/ProductCard';
import { useCatalog } from '@/components/providers/CatalogProvider';

export default function SavedPage() { const go = useGo(); const { farmData, productData, categoryTabs } = useCatalog(); const m = useMarket(); const farms = Object.keys(farmData).filter((id) => m.saved.includes(`farm:${id}`)); const products = productData.filter((p) => m.saved.includes(`product:${slugify(p.title)}`)); return <Page><div className="market-container"><Breadcrumb items={[[ 'My account', '/account' ], [ 'Saved favourites' ]]} /><Heading eyebrow="Keep the good things close" title={<>Your farm <em>favourites.</em></>}>A little collection of products and producers you love.</Heading>{!farms.length && !products.length && <Empty title="Find something to love." text="Tap the heart on a farm or product to save it here." action="Explore farms" onAction={() => go('/farms')} />}{farms.length > 0 && <><h2 className="market-saved-heading">Your farms</h2><div className="market-farm-grid">{farms.map((id) => <FarmCard key={id} id={id} />)}</div></>}{products.length > 0 && <><h2 className="market-saved-heading">Your products</h2><div className="market-product-grid four">{products.map((p) => <ProductCard item={p} key={p.title} />)}</div></>}</div></Page>; }
