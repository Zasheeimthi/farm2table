'use client';

import React from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMarket } from '@/components/providers/MarketProvider';
import { useGo } from '@/lib/navigation';
import { money } from '@/lib/market-model';
import Page from '@/components/market/Page';
import Breadcrumb from '@/components/market/Breadcrumb';
import Heading from '@/components/market/Heading';
import LocationBar from '@/components/market/LocationBar';
import Empty from '@/components/market/Empty';
import Progress from '@/components/market/Progress';
import OrderSummary from '@/components/market/OrderSummary';
import Quantity from '@/components/market/Quantity';
import { useCatalog } from '@/components/providers/CatalogProvider';

export default function CartPage() {
  const go = useGo();
  const { farmData, productData, categoryTabs } = useCatalog();

  const m = useMarket(); const groups = [...new Set(m.lines.map((l) => l.product.farmId))];
  return <Page className="market-cart"><div className="market-container"><Breadcrumb items={[[ 'Your basket' ]]} /><Heading eyebrow="Picked by you. Grown with care." title={<>A basket full of <em>good things.</em></>}>{m.count ? `${m.count} ${m.count === 1 ? 'item' : 'items'} from ${groups.length} ${groups.length === 1 ? 'producer' : 'producers'}. Every origin, clearly shown.` : 'Your next fresh delivery starts with a farm.'}</Heading>{!m.lines.length ? <Empty title="Your basket is waiting." text="Explore our farm community and add a little freshness to your day." action="Explore local farms" onAction={() => go('/farms')} /> : <><Progress step={0} /><LocationBar /><div className="market-checkout-layout"><div><div className="market-cart-groups">{groups.map((farmId) => <section className="market-cart-group" key={farmId}><header><img src={farmData[farmId].image} alt="" /><span><small>Fresh from</small><a href={`/farm/${farmId}`}>{farmData[farmId].name}</a></span><a href={`/farm/${farmId}`}>Shop more <ArrowRightOutlined /></a></header>{m.lines.filter((l) => l.product.farmId === farmId).map((l) => <article className="market-cart-line" key={l.id}><a href={`/product/${l.slug}`}><img src={l.product.image} alt={l.product.title} /></a><div className="market-cart-line-copy"><a href={`/product/${l.slug}`}><h3>{l.product.title}</h3></a><p>{l.pack === 'family' ? '3-pack bundle · 10% saved' : 'Single pack'} · {money(l.unitPrice)} each</p><button className="market-remove" onClick={() => m.updateQuantity(l.id, 0)} aria-label={`Remove ${l.product.title} ${l.pack} from basket`}><DeleteOutlined /> Remove</button></div><Quantity value={l.quantity} label={`${l.product.title} ${l.pack}`} onChange={(q) => m.updateQuantity(l.id, q)} /><strong className="market-line-total">{money(l.total)}</strong></article>)}</section>)}</div><a className="market-continue" href="/farms"><ArrowLeftOutlined /> Keep exploring our farms</a></div><OrderSummary lines={m.lines}><button className="market-primary" onClick={() => go(m.authenticated ? '/checkout' : '/auth/login?next=/checkout')}>Continue to checkout <ArrowRightOutlined /></button></OrderSummary></div></>}</div></Page>;
}
