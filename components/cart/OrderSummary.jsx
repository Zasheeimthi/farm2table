'use client';

import { farmData } from '@/lib/catalog.js';
import { subtotalOf } from '@/lib/market-model.js';
import { money } from '@/utils/format.js';
import { useMarket } from '@/context/MarketContext.jsx';
import CatalogImage from '@/components/common/CatalogImage.jsx';

/** Shared order summary card used by the basket, checkout, payment and orders screens. */
export default function OrderSummary({ lines, children }) {
  const market = useMarket();
  const items = lines || market.lines;

  return (
    <aside className="market-order-summary">
      <span className="market-kicker">From their farms to your table</span>
      <h2>Your order summary</h2>
      <div className="market-summary-products">
        {items.map((line) => (
          <div key={line.id}>
            <CatalogImage src={line.product.image} alt="" sizes="38px" />
            <span>
              <strong>{line.product.title}</strong>
              <small>{farmData[line.product.farmId].name} · {line.quantity} × {line.pack === 'family' ? '3-pack' : 'single pack'}</small>
            </span>
            <b>{money(line.total)}</b>
          </div>
        ))}
      </div>
      <dl>
        <div><dt>Subtotal</dt><dd>{money(subtotalOf(items))}</dd></div>
        <div><dt>Delivery <small>(preview)</small></dt><dd>Free</dd></div>
        <div className="market-total"><dt>Total</dt><dd>{money(subtotalOf(items))}</dd></div>
      </dl>
      {children}
    </aside>
  );
}
