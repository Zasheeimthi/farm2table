'use client';

import React, { useRef } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useMarket } from '@/components/providers/MarketProvider';
import { useGo } from '@/lib/navigation';
import { usePaymentCards } from '@/lib/use-payment-cards';
import { deliveryDates, validAddress } from '@/lib/market-model';
import DeliveryReview from '@/components/market/DeliveryReview';
import CheckoutPage from '@/components/market/pages/CheckoutPage';
import Page from '@/components/market/Page';
import Breadcrumb from '@/components/market/Breadcrumb';
import Heading from '@/components/market/Heading';
import Progress from '@/components/market/Progress';
import OrderSummary from '@/components/market/OrderSummary';
import PaymentMethodSection from '@/components/market/PaymentMethodSection';
import CartPage from '@/components/market/pages/CartPage';

export default function PaymentPage() {
  const go = useGo();

  const m = useMarket();
  const payment = usePaymentCards();
  const submitted = useRef(false);
  const validDraft = validAddress(m.draft) && m.draft.firstName && m.draft.lastName && m.draft.email && m.draft.phone && deliveryDates().some((d) => d.value === m.draft.date);
  if (!m.lines.length) return <CartPage />;
  if (!validDraft) return <CheckoutPage />;
  const preview = () => {
    if (submitted.current) return;
    if (!payment.selectedCard) { payment.setCardError('Choose a saved card or add a new card to continue.'); return; }
    submitted.current = true;
    const id = `HEA-${Date.now()}`;
    const order = { id, created: new Date().toISOString(), lines: m.lines, draft: m.draft, method: 'card', card: payment.selectedCard, paymentStatus: 'Payment successful', status: 'Payment successful' };
    m.setOrders((previous) => [order, ...(Array.isArray(previous) ? previous : [])]); m.setCart([]); go(`/confirmation?order=${id}`);
  };
  return <Page><div className="market-container"><Breadcrumb items={[[ 'Basket', '/cart' ], [ 'Delivery', '/checkout' ], [ 'Payment' ]]} /><Heading eyebrow="One last look" title={<>Good food, <em>all together.</em></>}>Review your farms, delivery details, and preferred payment method.</Heading><Progress step={1} /><div className="market-checkout-layout"><div><section className="market-form-card"><div className="market-section-heading"><h2>Delivery details</h2><a className="market-link" href="/checkout" onClick={(e) => { e.preventDefault(); m.setLocationOpen(true); }}>Edit details</a></div><DeliveryReview draft={m.draft} /></section><PaymentMethodSection payment={payment} number="02" /></div><OrderSummary lines={m.lines}><div className="market-summary-meta"><div><span>Deliver to</span><strong>{[m.draft.street, m.draft.city].filter(Boolean).join(', ')}</strong></div><div><span>Pay with</span><strong>{payment.selectedCard ? `${payment.selectedCard.brand} •••• ${payment.selectedCard.last4}` : 'Choose a card'}</strong></div></div><button className="market-primary" onClick={preview}>Place order <ArrowRightOutlined /></button><p className="market-summary-note">Card details are handled securely by Stripe. This preview does not submit payment.</p><a className="market-summary-back" href="/checkout">Back to delivery</a></OrderSummary></div></div></Page>;
}
