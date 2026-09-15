'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MarketTools from '@/components/market/MarketTools';
import { useUi } from '@/components/providers/UiProvider';

/**
 * Persistent page frame: header, route content, footer and the market overlays.
 *
 * Kept as a client component so it can host the scroll-reveal observer and the
 * scroll-to-top behaviour that used to live in the single-page App component.
 * `page-shell` must directly wrap `<main>` - refinements.css styles
 * `.page-shell > main.page-view` and `.store-header-page ~ .page-view`.
 */
export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const { activeCategory } = useUi();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const revealItems = document.querySelectorAll('.scroll-reveal, .image-reveal');
    if (!revealItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname, activeCategory]);

  return (
    <div id="top" className="page-shell">
      <Header />
      {children}
      <Footer />
      <MarketTools />
    </div>
  );
}
