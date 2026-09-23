import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Cormorant, Instrument_Sans, Montserrat } from 'next/font/google';
import { Providers } from './providers';
import 'leaflet/dist/leaflet.css';
import '@/styles/styles.css';
import '@/styles/marketplace.css';
import '@/styles/refinements.css';
import '@/styles/location-map.css';

const cormorant = Cormorant({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-cormorant', display: 'swap' });
const instrument = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-instrument', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-montserrat', display: 'swap' });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://farmtotabledemo.netlify.app';
export const metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }, { url: '/brand/favicon.ico', sizes: '32x32' }], apple: '/brand/icon-180.png' },
  openGraph: { title: 'Farm to Table | Fresh food. Real connections.', description: 'From local farms to your table. Discover fresh seasonal food and the people who grow it.', siteName: 'Farm to Table', type: 'website', images: [{ url: '/brand/social-preview.jpg', width: 1200, height: 630, alt: 'Farm to Table — fresh food and local farms' }] },
  twitter: { card: 'summary_large_image', title: 'Farm to Table | Fresh food. Real connections.', description: 'From local farms to your table.', images: ['/brand/social-preview.jpg'] },
  title: { default: 'Farm to Table | Fresh food from local farms', template: '%s | Farm to Table' },
  description: 'Discover fresh produce, dairy, pantry goods, and more from trusted local farms. Shop seasonal food and have it delivered with care.',
};
export default function RootLayout({ children }) {
  return <html lang="en" className={`${cormorant.variable} ${instrument.variable} ${montserrat.variable}`}>
    <body><div id="root"><AntdRegistry><Providers>{children}</Providers></AntdRegistry></div></body>
  </html>;
}
