"use client";

import { HeartFilled } from "@ant-design/icons";
import { HeartOutlined } from "@ant-design/icons";
import { useMarket } from "@/context/MarketContext.jsx";
export function SaveButton({
  id,
  label,
  className = ''
}) {
  const m = useMarket();
  const isSaved = m.saved.includes(id);
  return <button className={`market-save ${isSaved ? 'is-saved' : ''} ${className}`} aria-label={`${isSaved ? 'Unsave' : 'Save'} ${label}`} aria-pressed={isSaved} onClick={() => m.toggleSaved(id)}>{isSaved ? <HeartFilled /> : <HeartOutlined />}</button>;
}
