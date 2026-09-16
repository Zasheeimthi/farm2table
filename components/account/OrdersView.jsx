'use client';

import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';
import { subtotalOf } from '@/lib/market-model.js';
import { routes } from '@/lib/routes.js';
import { formatDate, money } from '@/utils/format.js';
import { useGo } from '@/hooks/useGo.js';
import { useMarket } from '@/context/MarketContext.jsx';
import Page from '@/components/common/Page.jsx';
import PageHeading from '@/components/common/PageHeading.jsx';
import Breadcrumb from '@/components/common/Breadcrumb.jsx';
import EmptyState from '@/components/common/EmptyState.jsx';
import OrderSummary from '@/components/cart/OrderSummary.jsx';
import DeliveryReview from '@/components/checkout/DeliveryReview.jsx';
import NotFoundView from '@/components/common/NotFoundView.jsx';

/** Orders list (`/orders`) and a single preview order (`/orders/[orderId]`). */
export default function OrdersView({ orderId }) {
  const market = useMarket();
  const go = useGo();
  const order = orderId && market.orders.find((item) => item.id === orderId);

  if (orderId && !order) return <NotFoundView />;

  return (
    <Page>
      <div className="market-container">
        <Breadcrumb
          items={[
            ['My account', routes.account],
            ['Orders', order ? routes.orders : undefined],
            ...(order ? [[order.id]] : [])
          ]}
        />
        <PageHeading eyebrow="Your farm-to-table journey" title={order ? 'Your preview order.' : <>Your orders, <em>in one place.</em></>}>
          Preview orders are saved for this browser session. Live orders will appear when account and ordering services are connected.
        </PageHeading>
        {order ? (
          <div className="market-checkout-layout">
            <section className="market-form-card">
              <span className="market-status">{order.status}</span>
              <h2>{order.id}</h2>
              <DeliveryReview draft={order.draft} />
              <p>
                Payment method: {order.card ? `${order.card.brand} •••• ${order.card.last4}` : order.method === 'swish' ? 'Swish' : 'Klarna'}
              </p>
              <button
                className="market-secondary"
                onClick={() => {
                  market.setCart(order.lines.map(({ slug, pack, quantity }) => ({ slug, pack, quantity })));
                  go(routes.cart);
                }}
              >
                Use this preview as my basket
              </button>
            </section>
            <OrderSummary lines={order.lines} />
          </div>
        ) : market.orders.length ? (
          <div className="market-orders-list">
            {market.orders.map((item) => (
              <Link href={routes.order(item.id)} key={item.id}>
                <div>
                  <span className="market-status">{item.status || 'Preview · not submitted'}</span>
                  <h2>{item.id}</h2>
                  <p>
                    {formatDate(item.created)} · {item.lines.reduce((sum, line) => sum + line.quantity, 0)} items ·{' '}
                    {new Set(item.lines.map((line) => line.product.farmId)).size} producers
                  </p>
                </div>
                <strong>{money(subtotalOf(item.lines))}</strong>
                <ArrowRightOutlined />
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Your farm story starts here."
            text="Explore the farms, fill your basket, and try the checkout preview."
            action="Explore farms"
            onAction={() => go(routes.farms)}
          />
        )}
      </div>
    </Page>
  );
}
