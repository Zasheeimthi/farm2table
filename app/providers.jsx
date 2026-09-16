'use client';
import { ConfigProvider } from 'antd';
import { MarketProvider } from '@/context/MarketContext';
import { SiteShell } from '@/components/layout/SiteShell';
import { theme } from '@/constants/theme';
export function Providers({ children }) {
  return <ConfigProvider theme={theme}><MarketProvider><SiteShell>{children}</SiteShell></MarketProvider></ConfigProvider>;
}
