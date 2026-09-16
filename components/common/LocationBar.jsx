'use client';

import { ArrowRightOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useMarket } from '@/context/MarketContext.jsx';

/** "Delivering to …" strip that opens the delivery-location dialog. */
export default function LocationBar() {
  const market = useMarket();

  return (
    <div className="market-location-bar">
      <span>
        <EnvironmentOutlined />{' '}
        {market.location
          ? <>Delivering to <strong>{[market.location.city, market.location.postcode].filter(Boolean).join(', ')}</strong></>
          : 'Discover farms and choose your delivery location'}
      </span>
      <button onClick={() => market.setLocationOpen(true)}>
        {market.location ? 'Change location' : 'Choose location'} <ArrowRightOutlined />
      </button>
    </div>
  );
}
