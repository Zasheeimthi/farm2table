'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { MarketTools } from '@/components/modals/MarketTools';
import { useMarket } from '@/context/MarketContext';

export function SiteShell({ children }) {
  const path = usePathname();
  const router = useRouter();
  const market = useMarket();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const migrateHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/') && !hash.startsWith('#//')) router.replace(hash.slice(1));
    };
    migrateHash();
    window.addEventListener('hashchange', migrateHash);
    return () => window.removeEventListener('hashchange', migrateHash);
  }, [router]);
  useEffect(() => {
    const sync = () => setIsScrolled(window.scrollY > 24);
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    const reveal = () => document.querySelectorAll('.scroll-reveal:not(.is-visible), .image-reveal:not(.is-visible)').forEach(el => observer.observe(el));
    reveal();
    const mutations = new MutationObserver(reveal);
    mutations.observe(document.getElementById('top'), { childList: true, subtree: true });
    return () => { observer.disconnect(); mutations.disconnect(); };
  }, [path]);
  return <div id="top" className="page-shell">
    <Header route={{ path }} setActiveCategory={market.setActiveCategory} cartCount={market.count} isScrolled={isScrolled} />
    {children}
    {!['/', '/about', '/contact'].includes(path) && <Footer />}
    <MarketTools />
  </div>;
}
