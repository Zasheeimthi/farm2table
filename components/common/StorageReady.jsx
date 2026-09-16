'use client';
import { useMarket } from '@/context/MarketContext';
export function StorageReady({ children }) {
  const { ready } = useMarket();
  return ready ? children : <main className="page-view marketplace" aria-busy="true" />;
}
