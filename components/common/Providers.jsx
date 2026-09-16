'use client';

import { ConfigProvider } from 'antd';
import { antdTheme } from '@/constants/theme.js';
import { MarketProvider } from '@/context/MarketContext.jsx';
import { StorefrontProvider } from '@/context/StorefrontContext.jsx';

/** App-wide client providers: Ant Design theme + storefront and market state. */
export default function Providers({ children }) {
  return (
    <ConfigProvider theme={antdTheme}>
      <StorefrontProvider>
        <MarketProvider>{children}</MarketProvider>
      </StorefrontProvider>
    </ConfigProvider>
  );
}
