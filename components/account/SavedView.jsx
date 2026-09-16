'use client';

import { farmData, productData } from '@/lib/catalog.js';
import { slugify } from '@/lib/market-model.js';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import { useMarket } from '@/context/MarketContext.jsx';
import Page from '@/components/common/Page.jsx';
import PageHeading from '@/components/common/PageHeading.jsx';
import Breadcrumb from '@/components/common/Breadcrumb.jsx';
import EmptyState from '@/components/common/EmptyState.jsx';
import FarmCard from '@/components/farm/FarmCard.jsx';
import MarketProductCard from '@/components/product/MarketProductCard.jsx';

/** Saved favourites (`/saved`) — farms and products the visitor hearted. */
export default function SavedView() {
  const market = useMarket();
  const go = useGo();
  const farms = Object.keys(farmData).filter((id) => market.saved.includes(`farm:${id}`));
  const products = productData.filter((product) => market.saved.includes(`product:${slugify(product.title)}`));

  return (
    <Page>
      <div className="market-container">
        <Breadcrumb items={[['My account', routes.account], ['Saved favourites']]} />
        <PageHeading eyebrow="Keep the good things close" title={<>Your farm <em>favourites.</em></>}>
          A little collection of products and producers you love.
        </PageHeading>
        {!farms.length && !products.length && (
          <EmptyState
            title="Find something to love."
            text="Tap the heart on a farm or product to save it here."
            action="Explore farms"
            onAction={() => go(routes.farms)}
          />
        )}
        {farms.length > 0 && (
          <>
            <h2 className="market-saved-heading">Your farms</h2>
            <div className="market-farm-grid">
              {farms.map((id) => <FarmCard key={id} id={id} />)}
            </div>
          </>
        )}
        {products.length > 0 && (
          <>
            <h2 className="market-saved-heading">Your products</h2>
            <div className="market-product-grid four">
              {products.map((product) => <MarketProductCard item={product} key={product.title} />)}
            </div>
          </>
        )}
      </div>
    </Page>
  );
}
