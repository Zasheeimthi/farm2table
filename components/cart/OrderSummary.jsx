"use client";

import { farmData } from "@/lib/catalog";
import { money } from "@/lib/market-model";
import { subtotalOf } from "@/lib/market-model";
import { useMarket } from "@/context/MarketContext.jsx";
export function OrderSummary({
  lines,
  children
}) {
  const m = useMarket();
  const items = lines || m.lines;
  return <aside className="market-order-summary"><span className="market-kicker">From their farms to your table</span><h2>Your order summary</h2><div className="market-summary-products">{items.map(l => <div key={l.id}><img src={l.product.image} alt="" /><span><strong>{l.product.title}</strong><small>{farmData[l.product.farmId].name} · {l.quantity} × {l.pack === 'family' ? '3-pack' : 'single pack'}</small></span><b>{money(l.total)}</b></div>)}</div><dl><div><dt>Subtotal</dt><dd>{money(subtotalOf(items))}</dd></div><div><dt>Delivery <small>(preview)</small></dt><dd>Free</dd></div><div className="market-total"><dt>Total</dt><dd>{money(subtotalOf(items))}</dd></div></dl>{children}</aside>;
}
