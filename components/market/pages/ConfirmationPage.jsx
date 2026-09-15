'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRightOutlined, CheckCircleOutlined, HomeOutlined, TruckOutlined } from '@ant-design/icons';
import { useMarket } from '@/components/providers/MarketProvider';
import { useGo } from '@/lib/navigation';
import Empty from '@/components/market/Empty';
import Progress from '@/components/market/Progress';
import { money } from '@/lib/market-model';
import Page from '@/components/market/Page';
import OrderSummary from '@/components/market/OrderSummary';
import NotFound from '@/components/market/NotFound';

export default function ConfirmationPage() {
  const go = useGo();

  const params = useSearchParams();
  const m = useMarket(); const order = m.orders.find((o) => o.id === params.get('order'));
  if (!order) return <Page><div className="market-container"><Empty title="No order to show yet." text="Your saved preview order will appear here after checkout." action="View your basket" onAction={() => go('/cart')} /></div></Page>;
  const paymentLabel = order.card ? `${order.card.brand} •••• ${order.card.last4}` : (order.method === 'swish' ? 'Swish' : order.method === 'klarna' ? 'Klarna' : 'Card');
  const deliveryLabel = [order.draft.street, order.draft.postcode, order.draft.city].filter(Boolean).join(', ');
  return <Page className="market-confirmation-page"><div className="market-container"><Progress step={2} /><section className="market-confirmation"><span className="market-confirmation-icon"><CheckCircleOutlined /></span><span className="market-confirmation-badge"><CheckCircleOutlined /> Payment successful</span><h1>Your order is <em>confirmed.</em></h1><p>Your farm-fresh picks are in good hands. We’ll let you know when your order is on its way.</p><div className="market-confirmation-reference"><span>Order reference</span><strong>{order.id}</strong><CheckCircleOutlined /></div><div className="market-confirmation-summary"><div><span>Deliver to</span><strong>{deliveryLabel || 'Your selected address'}</strong></div><div><span>Pay with</span><strong>{paymentLabel}</strong></div></div></section><section className="market-status-panel"><div className="market-status-heading"><span className="eyebrow">What happens next</span><h2>Order status</h2></div><ol className="market-status-timeline"><li className="active"><span><CheckCircleOutlined /></span><div><strong>Order confirmed</strong><p>Payment received</p></div></li><li><span><HomeOutlined /></span><div><strong>Farm preparing</strong><p>Your items are being packed</p></div></li><li><span><TruckOutlined /></span><div><strong>Delivery next</strong><p>We’ll notify you when it ships</p></div></li></ol><div className="market-confirmation-note"><span><HomeOutlined /></span><p><strong>Fresh from local farms.</strong> Your order helps support the growers in your community.</p></div><div className="market-confirmation-actions"><a href="/farms" className="market-primary">Explore more farms <ArrowRightOutlined /></a><a href="/" className="market-secondary">Back to home</a></div><a className="market-confirmation-details-link" href={`/orders/${order.id}`}>View order details <ArrowRightOutlined /></a></section></div></Page>;
}
