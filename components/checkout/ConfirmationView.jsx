'use client';

import Link from 'next/link';
import { ArrowRightOutlined, CheckCircleOutlined, HomeOutlined, TruckOutlined } from '@ant-design/icons';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import { useMarket } from '@/context/MarketContext.jsx';
import Page from '@/components/common/Page.jsx';
import CheckoutProgress from '@/components/common/CheckoutProgress.jsx';
import EmptyState from '@/components/common/EmptyState.jsx';

/** Order confirmation (`/confirmation?order=HEA-…`); the order lives in sessionStorage. */
export default function ConfirmationView({ orderId }) {
  const market = useMarket();
  const go = useGo();
  const order = market.orders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <Page>
        <div className="market-container">
          <EmptyState
            title="No order to show yet."
            text="Your saved preview order will appear here after checkout."
            action="View your basket"
            onAction={() => go(routes.cart)}
          />
        </div>
      </Page>
    );
  }

  const paymentLabel = order.card
    ? `${order.card.brand} •••• ${order.card.last4}`
    : (order.method === 'swish' ? 'Swish' : order.method === 'klarna' ? 'Klarna' : 'Card');
  const deliveryLabel = [order.draft.street, order.draft.postcode, order.draft.city].filter(Boolean).join(', ');

  return (
    <Page className="market-confirmation-page">
      <div className="market-container">
        <CheckoutProgress step={2} />
        <section className="market-confirmation">
          <span className="market-confirmation-icon"><CheckCircleOutlined /></span>
          <span className="market-confirmation-badge"><CheckCircleOutlined /> Payment successful</span>
          <h1>Your order is <em>confirmed.</em></h1>
          <p>Your farm-fresh picks are in good hands. We’ll let you know when your order is on its way.</p>
          <div className="market-confirmation-reference">
            <span>Order reference</span>
            <strong>{order.id}</strong>
            <CheckCircleOutlined />
          </div>
          <div className="market-confirmation-summary">
            <div><span>Deliver to</span><strong>{deliveryLabel || 'Your selected address'}</strong></div>
            <div><span>Pay with</span><strong>{paymentLabel}</strong></div>
          </div>
        </section>
        <section className="market-status-panel">
          <div className="market-status-heading">
            <span className="eyebrow">What happens next</span>
            <h2>Order status</h2>
          </div>
          <ol className="market-status-timeline">
            <li className="active">
              <span><CheckCircleOutlined /></span>
              <div><strong>Order confirmed</strong><p>Payment received</p></div>
            </li>
            <li>
              <span><HomeOutlined /></span>
              <div><strong>Farm preparing</strong><p>Your items are being packed</p></div>
            </li>
            <li>
              <span><TruckOutlined /></span>
              <div><strong>Delivery next</strong><p>We’ll notify you when it ships</p></div>
            </li>
          </ol>
          <div className="market-confirmation-note">
            <span><HomeOutlined /></span>
            <p><strong>Fresh from local farms.</strong> Your order helps support the growers in your community.</p>
          </div>
          <div className="market-confirmation-actions">
            <Link href={routes.farms} className="market-primary">Explore more farms <ArrowRightOutlined /></Link>
            <Link href={routes.home} className="market-secondary">Back to home</Link>
          </div>
          <Link className="market-confirmation-details-link" href={routes.order(order.id)}>
            View order details <ArrowRightOutlined />
          </Link>
        </section>
      </div>
    </Page>
  );
}
