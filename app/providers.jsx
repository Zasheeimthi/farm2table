'use client';

import React from 'react';
// antd v5 ships a ReactDOM.render-based wave effect; this patch adapts it to
// React 19 so Button ripples and Modal animations work instead of throwing.
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';
import CatalogProvider from '@/components/providers/CatalogProvider';
import MarketProvider from '@/components/providers/MarketProvider';
import { UiProvider } from '@/components/providers/UiProvider';

/** Ant Design theme, carried over unchanged from the Vite entry point. */
const theme = {
  token: {
    colorPrimary: '#FE5D02',
    colorSuccess: '#103B37',
    colorWarning: '#FE5D02',
    colorText: '#121212',
    colorTextSecondary: '#526762',
    colorBgBase: '#F8F3EC',
    colorBgContainer: '#FFFFFF',
    colorBorder: '#103B37',
    borderRadius: 4,
    fontFamily: 'Montserrat, Arial, sans-serif',
    controlHeight: 48
  },
  components: {
    Button: { borderRadius: 0, controlHeight: 48, fontWeight: 700, primaryShadow: 'none' },
    Card: { borderRadiusLG: 8, paddingLG: 22 },
    Input: { borderRadius: 2, controlHeight: 50 },
    Drawer: { colorBgElevated: '#F8F3EC' }
  }
};

/**
 * Client-side provider stack.
 *
 * CatalogProvider receives the catalog fetched on the server, so the very first
 * render already has products and farms in the HTML.
 */
export default function AppProviders({ catalog, children }) {
  return (
    <ConfigProvider theme={theme}>
      <CatalogProvider initialData={catalog}>
        <MarketProvider>
          <UiProvider>{children}</UiProvider>
        </MarketProvider>
      </CatalogProvider>
    </ConfigProvider>
  );
}
