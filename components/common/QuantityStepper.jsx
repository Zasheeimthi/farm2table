'use client';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

/** Stepper shared by product cards, the product page and basket lines. */
export default function QuantityStepper({ value, onChange, label }) {
  return (
    <div className="market-quantity">
      <button aria-label={`Decrease ${label} quantity`} onClick={() => onChange(value - 1)} disabled={value <= 0}><MinusOutlined /></button>
      <span aria-live="polite">{value}</span>
      <button aria-label={`Increase ${label} quantity`} onClick={() => onChange(value + 1)} disabled={value >= 99}><PlusOutlined /></button>
    </div>
  );
}
