import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AppProviders from '@/app/providers';
import SiteChrome from '@/components/layout/SiteChrome';
import { getCatalog } from '@/lib/server/catalog';

// One entry point keeps the cascade deterministic - see styles/index.css.
import '@/styles/index.css';

export const metadata = {
  title: {
    default: 'Farm to Table | Fresh food from local farms',
    template: '%s | Farm to Table'
  },
  description:
    'Discover fresh produce, dairy, pantry goods, and more from trusted local farms. Shop seasonal food and have it delivered with care.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Farm to Table | Fresh food from local farms',
    description: 'Fresh local produce, premium pantry goods, and trusted farms delivered with care.',
    type: 'website'
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FE5D02'
};

export default async function RootLayout({ children }) {
  // Fetched on the server so the first paint already contains the catalog.
  // Served from the bundled seed data until BACKEND_API_URL is configured.
  const catalog = await getCatalog();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant:wght@500;600;700&family=Instrument+Sans:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        <AntdRegistry>
          <AppProviders catalog={catalog}>
            <SiteChrome>{children}</SiteChrome>
          </AppProviders>
        </AntdRegistry>
      </body>
    </html>
  );
}
