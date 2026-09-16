import 'leaflet/dist/leaflet.css';
import '@/styles/styles.css';
import '@/styles/marketplace.css';
import '@/styles/refinements.css';
import '@/styles/location-map.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import Providers from '@/components/common/Providers.jsx';
import MarketTools from '@/components/common/MarketTools.jsx';
import ScrollManager from '@/components/layout/ScrollManager.jsx';
import SiteFooter from '@/components/layout/SiteFooter.jsx';
import SiteHeader from '@/components/layout/SiteHeader.jsx';

export const metadata = {
  title: {
    default: 'Farm to Table | Fresh food from local farms',
    template: '%s | Farm to Table'
  },
  description: 'Discover fresh produce, dairy, pantry goods, and more from trusted local farms. Shop seasonal food and have it delivered with care.',
  icons: { icon: '/favicon.svg' }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

/**
 * Shared layout for every screen.
 *
 * The storefront header, footer and global dialogs live here (exactly one
 * instance each) and `children` is the page's own <main>. The `.page-shell`
 * wrapper is kept because the stylesheet relies on the header and the page
 * being siblings inside it.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Providers>
            <div id="top" className="page-shell">
              <SiteHeader />
              {children}
              <SiteFooter />
              <MarketTools />
            </div>
            <ScrollManager />
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
