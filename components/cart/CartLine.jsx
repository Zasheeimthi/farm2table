'use client';

import Link from 'next/link';
import { DeleteOutlined } from '@ant-design/icons';
import { money } from '@/utils/format.js';
import { routes } from '@/lib/routes.js';
import QuantityStepper from '@/components/common/QuantityStepper.jsx';
import CatalogImage from '@/components/common/CatalogImage.jsx';

/** Single basket row: artwork, pack details, quantity stepper and line total. */
export default function CartLine({ line, onRemove, onQuantity }) {
  return (
    <article className="market-cart-line">
      <Link href={routes.product(line.slug)}>
        <CatalogImage src={line.product.image} alt={line.product.title} sizes="70px" />
      </Link>
      <div className="market-cart-line-copy">
        <Link href={routes.product(line.slug)}><h3>{line.product.title}</h3></Link>
        <p>{line.pack === 'family' ? '3-pack bundle · 10% saved' : 'Single pack'} · {money(line.unitPrice)} each</p>
        <button
          className="market-remove"
          onClick={() => onRemove(line.id)}
          aria-label={`Remove ${line.product.title} ${line.pack} from basket`}
        >
          <DeleteOutlined /> Remove
        </button>
      </div>
      <QuantityStepper value={line.quantity} label={`${line.product.title} ${line.pack}`} onChange={(quantity) => onQuantity(line.id, quantity)} />
      <strong className="market-line-total">{money(line.total)}</strong>
    </article>
  );
}
