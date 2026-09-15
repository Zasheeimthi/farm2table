'use client';

import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useMarket } from '@/components/providers/MarketProvider';
import { useGo } from '@/lib/navigation';
import { money, subtotalOf } from '@/lib/market-model';
import Page from '@/components/market/Page';
import Breadcrumb from '@/components/market/Breadcrumb';
import Heading from '@/components/market/Heading';
import Empty from '@/components/market/Empty';
import OrderSummary from '@/components/market/OrderSummary';
import DeliveryReview from '@/components/market/DeliveryReview';
import NotFound from '@/components/market/NotFound';

export default function OrdersPage({ orderId }) {
  const go = useGo();

  const m = useMarket(); const order = orderId && m.orders.find((o) => o.id === orderId);
  if (orderId && !order) return <NotFound />;
  return <Page><div className="market-container"><Breadcrumb items={[[ 'My account', '/account' ], [ 'Orders', order ? '/orders' : undefined ], ...(order ? [[order.id]] : [])]} /><Heading eyebrow="Your farm-to-table journey" title={order ? 'Your preview order.' : <>Your orders, <em>in one place.</em></>}>Preview orders are saved for this browser session. Live orders will appear when account and ordering services are connected.</Heading>{order ? <div className="market-checkout-layout"><section className="market-form-card"><span className="market-status">{order.status}</span><h2>{order.id}</h2><DeliveryReview draft={order.draft} /><p>Payment method: {order.card ? `${order.card.brand} •••• ${order.card.last4}` : order.method === 'swish' ? 'Swish' : 'Klarna'}</p><button className="market-secondary" onClick={() => { m.setCart(order.lines.map(({ slug, pack, quantity }) => ({ slug, pack, quantity }))); go('/cart'); }}>Use this preview as my basket</button></section><OrderSummary lines={order.lines} /></div> : m.orders.length ? <div className="market-orders-list">{m.orders.map((o) => <a href={`/orders/${o.id}`} key={o.id}><div><span className="market-status">{o.status || 'Preview · not submitted'}</span><h2>{o.id}</h2><p>{new Date(o.created).toLocaleDateString('en-GB')} · {o.lines.reduce((s, l) => s + l.quantity, 0)} items · {new Set(o.lines.map((l) => l.product.farmId)).size} producers</p></div><strong>{money(subtotalOf(o.lines))}</strong><ArrowRightOutlined /></a>)}</div> : <Empty title="Your farm story starts here." text="Explore the farms, fill your basket, and try the checkout preview." action="Explore farms" onAction={() => go('/farms')} />}</div></Page>;
}
