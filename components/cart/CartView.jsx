'use client';

import Link from 'next/link';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { farmData } from '@/lib/catalog.js';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import { useMarket } from '@/context/MarketContext.jsx';
import Page from '@/components/common/Page.jsx';
import PageHeading from '@/components/common/PageHeading.jsx';
import Breadcrumb from '@/components/common/Breadcrumb.jsx';
import CheckoutProgress from '@/components/common/CheckoutProgress.jsx';
import EmptyState from '@/components/common/EmptyState.jsx';
import LocationBar from '@/components/common/LocationBar.jsx';
import CatalogImage from '@/components/common/CatalogImage.jsx';
import CartLine from './CartLine.jsx';
import OrderSummary from './OrderSummary.jsx';

/** Basket page (`/cart`), grouped by producer. */
export default function CartView() {
  const market = useMarket();
  const go = useGo();
  const groups = [...new Set(market.lines.map((line) => line.product.farmId))];

  return (
    <Page className="market-cart">
      <div className="market-container">
        <Breadcrumb items={[['Your basket']]} />
        <PageHeading eyebrow="Picked by you. Grown with care." title={<>A basket full of <em>good things.</em></>}>
          {market.count
            ? `${market.count} ${market.count === 1 ? 'item' : 'items'} from ${groups.length} ${groups.length === 1 ? 'producer' : 'producers'}. Every origin, clearly shown.`
            : 'Your next fresh delivery starts with a farm.'}
        </PageHeading>
        {!market.lines.length ? (
          <EmptyState
            title="Your basket is waiting."
            text="Explore our farm community and add a little freshness to your day."
            action="Explore local farms"
            onAction={() => go(routes.farms)}
          />
        ) : (
          <>
            <CheckoutProgress step={0} />
            <LocationBar />
            <div className="market-checkout-layout">
              <div>
                <div className="market-cart-groups">
                  {groups.map((farmId) => (
                    <section className="market-cart-group" key={farmId}>
                      <header>
                        <CatalogImage src={farmData[farmId].image} alt="" sizes="39px" />
                        <span>
                          <small>Fresh from</small>
                          <Link href={routes.farm(farmId)}>{farmData[farmId].name}</Link>
                        </span>
                        <Link href={routes.farm(farmId)}>Shop more <ArrowRightOutlined /></Link>
                      </header>
                      {market.lines
                        .filter((line) => line.product.farmId === farmId)
                        .map((line) => (
                          <CartLine
                            key={line.id}
                            line={line}
                            onRemove={(id) => market.updateQuantity(id, 0)}
                            onQuantity={market.updateQuantity}
                          />
                        ))}
                    </section>
                  ))}
                </div>
                <Link className="market-continue" href={routes.farms}><ArrowLeftOutlined /> Keep exploring our farms</Link>
              </div>
              <OrderSummary lines={market.lines}>
                <button
                  className="market-primary"
                  onClick={() => go(market.authenticated ? routes.checkout : routes.authWithNext('login', routes.checkout))}
                >
                  Continue to checkout <ArrowRightOutlined />
                </button>
              </OrderSummary>
            </div>
          </>
        )}
      </div>
    </Page>
  );
}
