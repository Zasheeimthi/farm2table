import { HomePage } from '@/components/home/HomePage';
export const metadata = {
  title: { absolute: 'Farm to Table | Digital gårdsbutik för lokala producenter' },
  description: 'Sälj direkt till kunder med en egen digital gårdsbutik och gemensam marknadsplats. Samla produkter, beställningar och betalningar med Farm to Table.',
  openGraph: { title: 'Från din gård till fler bord | Farm to Table', description: 'Enklare försäljning och starkare kundrelationer för lokala producenter. Lokal mat. Större möjligheter.', locale: 'sv_SE', type: 'website', images: [{ url: '/brand/farm-to-table-brochure.png', width: 2172, height: 724, alt: 'Farm to Table. Lokal mat. Större möjligheter.' }] },
  twitter: { card: 'summary_large_image', title: 'Från din gård till fler bord | Farm to Table', description: 'Digital gårdsbutik och marknadsplats för lokala producenter.', images: ['/brand/farm-to-table-brochure.png'] },
};
export default function Page() { return <HomePage />; }
