'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';
import { deliveryDates, validAddress } from '@/lib/market-model.js';
import { routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import { usePaymentCards } from '@/hooks/usePaymentCards.js';
import { useMarket } from '@/context/MarketContext.jsx';
import Page from '@/components/common/Page.jsx';
import PageHeading from '@/components/common/PageHeading.jsx';
import Breadcrumb from '@/components/common/Breadcrumb.jsx';
import CheckoutProgress from '@/components/common/CheckoutProgress.jsx';
import OrderSummary from '@/components/cart/OrderSummary.jsx';
import CartView from '@/components/cart/CartView.jsx';
import DeliveryReview from './DeliveryReview.jsx';
import PaymentMethodSection from './PaymentMethodSection.jsx';
import CheckoutView from './CheckoutView.jsx';

/** Final review step (`/payment`) with the same shared summary and card picker. */
export default function PaymentView() {
  const market = useMarket();
  const go = useGo();
  const payment = usePaymentCards();
  const submitted = useRef(false);

  const validDraft = validAddress(market.draft)
    && market.draft.firstName
    && market.draft.lastName
    && market.draft.email
    && market.draft.phone
    && deliveryDates().some((date) => date.value === market.draft.date);

  if (!market.lines.length) return <CartView />;
  if (!validDraft) return <CheckoutView />;

  const preview = () => {
    if (submitted.current) return;
    if (!payment.selectedCard) {
      payment.setCardError('Choose a saved card or add a new card to continue.');
      return;
    }
    submitted.current = true;
    const id = `HEA-${Date.now()}`;
    const order = {
      id,
      created: new Date().toISOString(),
      lines: market.lines,
      draft: market.draft,
      method: 'card',
      card: payment.selectedCard,
      paymentStatus: 'Payment successful',
      status: 'Payment successful'
    };
    market.setOrders((previous) => [order, ...(Array.isArray(previous) ? previous : [])]);
    market.setCart([]);
    go(`${routes.confirmation}?order=${id}`);
  };

  return (
    <Page>
      <div className="market-container">
        <Breadcrumb items={[['Basket', routes.cart], ['Delivery', routes.checkout], ['Payment']]} />
        <PageHeading eyebrow="One last look" title={<>Good food, <em>all together.</em></>}>
          Review your farms, delivery details, and preferred payment method.
        </PageHeading>
        <CheckoutProgress step={1} />
        <div className="market-checkout-layout">
          <div>
            <section className="market-form-card">
              <div className="market-section-heading">
                <h2>Delivery details</h2>
                <Link
                  className="market-link"
                  href={routes.checkout}
                  onClick={(event) => { event.preventDefault(); market.setLocationOpen(true); }}
                >
                  Edit details
                </Link>
              </div>
              <DeliveryReview draft={market.draft} />
            </section>
            <PaymentMethodSection payment={payment} number="02" />
          </div>
          <OrderSummary lines={market.lines}>
            <div className="market-summary-meta">
              <div><span>Deliver to</span><strong>{[market.draft.street, market.draft.city].filter(Boolean).join(', ')}</strong></div>
              <div><span>Pay with</span><strong>{payment.selectedCard ? `${payment.selectedCard.brand} •••• ${payment.selectedCard.last4}` : 'Choose a card'}</strong></div>
            </div>
            <button className="market-primary" onClick={preview}>Place order <ArrowRightOutlined /></button>
            <p className="market-summary-note">Card details are handled securely by Stripe. This preview does not submit payment.</p>
            <Link className="market-summary-back" href={routes.checkout}>Back to delivery</Link>
          </OrderSummary>
        </div>
      </div>
    </Page>
  );
}
