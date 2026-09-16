"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "@/components/layout/Breadcrumb.jsx";
import { CartPage } from "@/components/cart/CartPage.jsx";
import { CheckoutPage } from "@/components/checkout/CheckoutPage.jsx";
import { DeliveryReview } from "@/components/checkout/DeliveryReview.jsx";
import { Heading } from "@/components/layout/Heading.jsx";
import Link from "next/link";
import { OrderSummary } from "@/components/cart/OrderSummary.jsx";
import { Page } from "@/components/layout/Page.jsx";
import { PaymentMethodSection } from "@/components/checkout/PaymentMethodSection.jsx";
import { Progress } from "@/components/checkout/Progress.jsx";
import { deliveryDates } from "@/lib/market-model";
import { useMarket } from "@/context/MarketContext.jsx";
import { useNavigate } from "@/hooks/useNavigate";
import { usePaymentCards } from "@/hooks/usePaymentCards.js";
import { useRef } from "react";
import { validAddress } from "@/lib/market-model";
export function PaymentPage() {
  const go = useNavigate();
  const m = useMarket();
  const payment = usePaymentCards();
  const submitted = useRef(false);
  const validDraft = validAddress(m.draft) && m.draft.firstName && m.draft.lastName && m.draft.email && m.draft.phone && deliveryDates().some(d => d.value === m.draft.date);
  if (!m.lines.length) return <CartPage />;
  if (!validDraft) return <CheckoutPage />;
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
      lines: m.lines,
      draft: m.draft,
      method: 'card',
      card: payment.selectedCard,
      paymentStatus: 'Payment successful',
      status: 'Payment successful'
    };
    m.setOrders(previous => [order, ...(Array.isArray(previous) ? previous : [])]);
    m.setCart([]);
    go(`/confirmation?order=${id}`);
  };
  return <Page><div className="market-container"><Breadcrumb items={[['Basket', '/cart'], ['Delivery', '/checkout'], ['Payment']]} /><Heading eyebrow="One last look" title={<>Good food, <em>all together.</em></>}>Review your farms, delivery details, and preferred payment method.</Heading><Progress step={1} /><div className="market-checkout-layout"><div><section className="market-form-card"><div className="market-section-heading"><h2>Delivery details</h2><Link className="market-link" href="/checkout" onClick={e => {
                e.preventDefault();
                m.setLocationOpen(true);
              }}>Edit details</Link></div><DeliveryReview draft={m.draft} /></section><PaymentMethodSection payment={payment} number="02" /></div><OrderSummary lines={m.lines}><div className="market-summary-meta"><div><span>Deliver to</span><strong>{[m.draft.street, m.draft.city].filter(Boolean).join(', ')}</strong></div><div><span>Pay with</span><strong>{payment.selectedCard ? `${payment.selectedCard.brand} •••• ${payment.selectedCard.last4}` : 'Choose a card'}</strong></div></div><button className="market-primary" onClick={preview}>Place order <ArrowRightOutlined /></button><p className="market-summary-note">Card details are handled securely by Stripe. This preview does not submit payment.</p><Link className="market-summary-back" href="/checkout">Back to delivery</Link></OrderSummary></div></div></Page>;
}
