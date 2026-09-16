'use client';

import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useMarket } from '@/context/MarketContext.jsx';

/** Heart toggle used on farm cards, product cards and the farm hero. */
export default function SaveButton({ id, label, className = '' }) {
  const market = useMarket();
  const isSaved = market.saved.includes(id);

  return (
    <button
      className={`market-save ${isSaved ? 'is-saved' : ''} ${className}`}
      aria-label={`${isSaved ? 'Unsave' : 'Save'} ${label}`}
      aria-pressed={isSaved}
      onClick={() => market.toggleSaved(id)}
    >
      {isSaved ? <HeartFilled /> : <HeartOutlined />}
    </button>
  );
}
