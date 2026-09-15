'use client';

import React from 'react';
import { useMarket } from '@/components/providers/MarketProvider';
import { money, subtotalOf } from '@/lib/market-model';
import { useCatalog } from '@/components/providers/CatalogProvider';

export default function OrderSummary({ lines, children }) {
  const { farmData, productData, categoryTabs } = useCatalog();

  const m = useMarket(); const items = lines || m.lines;
  return <aside className="market-order-summary"><span className="market-kicker">From their farms to your table</span><h2>Your order summary</h2><div className="market-summary-products">{items.map((l) => <div key={l.id}><img src={l.product.image} alt="" /><span><strong>{l.product.title}</strong><small>{farmData[l.product.farmId].name} · {l.quantity} × {l.pack === 'family' ? '3-pack' : 'single pack'}</small></span><b>{money(l.total)}</b></div>)}</div><dl><div><dt>Subtotal</dt><dd>{money(subtotalOf(items))}</dd></div><div><dt>Delivery <small>(preview)</small></dt><dd>Free</dd></div><div className="market-total"><dt>Total</dt><dd>{money(subtotalOf(items))}</dd></div></dl>{children}</aside>;
}
