"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useMarket } from "@/context/MarketContext.jsx";
export function LocationBar() {
  const m = useMarket();
  return <div className="market-location-bar"><span><EnvironmentOutlined /> {m.location ? <>Delivering to <strong>{[m.location.city, m.location.postcode].filter(Boolean).join(', ')}</strong></> : 'Discover farms and choose your delivery location'}</span><button onClick={() => m.setLocationOpen(true)}>{m.location ? 'Change location' : 'Choose location'} <ArrowRightOutlined /></button></div>;
}
