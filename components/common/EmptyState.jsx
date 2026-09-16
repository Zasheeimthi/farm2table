'use client';

import { ArrowRightOutlined, ShoppingCartOutlined } from '@ant-design/icons';

/** Shared empty state for baskets, filters and unknown routes. */
export default function EmptyState({ title, text, action, onAction }) {
  return (
    <div className="market-empty">
      <span className="market-empty-icon"><ShoppingCartOutlined /></span>
      <h2>{title}</h2>
      <p>{text}</p>
      {action && <button className="market-primary" onClick={onAction}>{action} <ArrowRightOutlined /></button>}
    </div>
  );
}
