"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "@/components/layout/Breadcrumb.jsx";
import { DeleteOutlined } from "@ant-design/icons";
import { Empty } from "@/components/common/Empty.jsx";
import { Heading } from "@/components/layout/Heading.jsx";
import Link from "next/link";
import { LocationBar } from "@/components/common/LocationBar.jsx";
import { OrderSummary } from "@/components/cart/OrderSummary.jsx";
import { Page } from "@/components/layout/Page.jsx";
import { Progress } from "@/components/checkout/Progress.jsx";
import { Quantity } from "@/components/cart/Quantity.jsx";
import { farmData } from "@/lib/catalog";
import { money } from "@/lib/market-model";
import { useMarket } from "@/context/MarketContext.jsx";
import { useNavigate } from "@/hooks/useNavigate";
export function CartPage() {
  const go = useNavigate();
  const m = useMarket();
  const groups = [...new Set(m.lines.map(l => l.product.farmId))];
  return <Page className="market-cart"><div className="market-container"><Breadcrumb items={[['Your basket']]} /><Heading eyebrow="Picked by you. Grown with care." title={<>A basket full of <em>good things.</em></>}>{m.count ? `${m.count} ${m.count === 1 ? 'item' : 'items'} from ${groups.length} ${groups.length === 1 ? 'producer' : 'producers'}. Every origin, clearly shown.` : 'Your next fresh delivery starts with a farm.'}</Heading>{!m.lines.length ? <Empty title="Your basket is waiting." text="Explore our farm community and add a little freshness to your day." action="Explore local farms" onAction={() => go('/farms')} /> : <><Progress step={0} /><LocationBar /><div className="market-checkout-layout"><div><div className="market-cart-groups">{groups.map(farmId => <section className="market-cart-group" key={farmId}><header><img src={farmData[farmId].image} alt="" /><span><small>Fresh from</small><Link href={`/farm/${farmId}`}>{farmData[farmId].name}</Link></span><Link href={`/farm/${farmId}`}>Shop more <ArrowRightOutlined /></Link></header>{m.lines.filter(l => l.product.farmId === farmId).map(l => <article className="market-cart-line" key={l.id}><Link href={`/product/${l.slug}`}><img src={l.product.image} alt={l.product.title} /></Link><div className="market-cart-line-copy"><Link href={`/product/${l.slug}`}><h3>{l.product.title}</h3></Link><p>{l.pack === 'family' ? '3-pack bundle · 10% saved' : 'Single pack'} · {money(l.unitPrice)} each</p><button className="market-remove" onClick={() => m.updateQuantity(l.id, 0)} aria-label={`Remove ${l.product.title} ${l.pack} from basket`}><DeleteOutlined /> Remove</button></div><Quantity value={l.quantity} label={`${l.product.title} ${l.pack}`} onChange={q => m.updateQuantity(l.id, q)} /><strong className="market-line-total">{money(l.total)}</strong></article>)}</section>)}</div><Link className="market-continue" href="/farms"><ArrowLeftOutlined /> Keep exploring our farms</Link></div><OrderSummary lines={m.lines}><button className="market-primary" onClick={() => go(m.authenticated ? '/checkout' : '/auth/login?next=/checkout')}>Continue to checkout <ArrowRightOutlined /></button></OrderSummary></div></>}</div></Page>;
}
