"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "@/components/layout/Breadcrumb.jsx";
import { DeliveryReview } from "@/components/checkout/DeliveryReview.jsx";
import { Empty } from "@/components/common/Empty.jsx";
import { Heading } from "@/components/layout/Heading.jsx";
import Link from "next/link";
import { NotFound } from "@/components/common/NotFound.jsx";
import { OrderSummary } from "@/components/cart/OrderSummary.jsx";
import { Page } from "@/components/layout/Page.jsx";
import { money } from "@/lib/market-model";
import { subtotalOf } from "@/lib/market-model";
import { useMarket } from "@/context/MarketContext.jsx";
import { useNavigate } from "@/hooks/useNavigate";
export function OrdersPage({
  orderId
}) {
  const go = useNavigate();
  const m = useMarket();
  const order = orderId && m.orders.find(o => o.id === orderId);
  if (orderId && !order) return <NotFound />;
  return <Page><div className="market-container"><Breadcrumb items={[['My account', '/account'], ['Orders', order ? '/orders' : undefined], ...(order ? [[order.id]] : [])]} /><Heading eyebrow="Your farm-to-table journey" title={order ? 'Your preview order.' : <>Your orders, <em>in one place.</em></>}>Preview orders are saved for this browser session. Live orders will appear when account and ordering services are connected.</Heading>{order ? <div className="market-checkout-layout"><section className="market-form-card"><span className="market-status">{order.status}</span><h2>{order.id}</h2><DeliveryReview draft={order.draft} /><p>Payment method: {order.card ? `${order.card.brand} •••• ${order.card.last4}` : order.method === 'swish' ? 'Swish' : 'Klarna'}</p><button className="market-secondary" onClick={() => {
            m.setCart(order.lines.map(({
              slug,
              pack,
              quantity
            }) => ({
              slug,
              pack,
              quantity
            })));
            go('/cart');
          }}>Use this preview as my basket</button></section><OrderSummary lines={order.lines} /></div> : m.orders.length ? <div className="market-orders-list">{m.orders.map(o => <Link href={`/orders/${o.id}`} key={o.id}><div><span className="market-status">{o.status || 'Preview · not submitted'}</span><h2>{o.id}</h2><p>{new Date(o.created).toLocaleDateString('en-GB')} · {o.lines.reduce((s, l) => s + l.quantity, 0)} items · {new Set(o.lines.map(l => l.product.farmId)).size} producers</p></div><strong>{money(subtotalOf(o.lines))}</strong><ArrowRightOutlined /></Link>)}</div> : <Empty title="Your farm story starts here." text="Explore the farms, fill your basket, and try the checkout preview." action="Explore farms" onAction={() => go('/farms')} />}</div></Page>;
}
