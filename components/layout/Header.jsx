'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from 'antd';
import { usePathname } from 'next/navigation';
import { MenuOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useMarket } from '@/components/providers/MarketProvider';
import { useUi } from '@/components/providers/UiProvider';
import { useGo } from '@/lib/navigation';
import Brand from '@/components/layout/Brand';

export default function Header() {
  const go = useGo();

  const market = useMarket();
  const pathname = usePathname();
  const { setActiveCategory } = useUi();
  const cartCount = market.count;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const syncScroll = () => setIsScrolled(window.scrollY > 24);
    syncScroll();
    window.addEventListener('scroll', syncScroll, { passive: true });
    return () => window.removeEventListener('scroll', syncScroll);
  }, []);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  useEffect(() => { setMobileNavOpen(false); }, [pathname]);
  const nav = [
    ['Home', '/'],
    ['Farms', '/farms'],
    ['Products', '/products'],
    ['About', '/about'],
    ['Contact us', '/contact']
  ];

  return (
    <header className={`store-header ${pathname !== '/' ? 'store-header-page' : ''} ${mobileNavOpen ? 'store-menu-open' : ''} ${isScrolled ? 'scrolled' : ''}`}>
      <div className="store-header-inner">
      <button
        className="store-menu-toggle"
        type="button"
        aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileNavOpen}
        aria-controls="store-navigation"
        onClick={() => setMobileNavOpen((isOpen) => !isOpen)}
      >
        <MenuOutlined />
      </button>
      <Brand onHome={() => { setActiveCategory('all'); go('/'); }} />
      <button className="store-search" aria-label="Search products and farms" onClick={() => market.setSearchOpen(true)}>
        <SearchOutlined /><span>Search products, farms and categories…</span>
      </button>
      <div className="store-header-actions" aria-label="Quick actions">
        <Badge count={cartCount} color="#103B37">
          <button className="store-cart" type="button" onClick={() => go('/cart')} aria-label="Open cart"><ShoppingCartOutlined /></button>
        </Badge>
        <a className="store-login" href="/auth/login"><UserOutlined className="store-login-icon" /><span>Login</span></a>
        <a className="store-signup" href="/auth/register">Sign up</a>
      </div>
      </div>
      <nav id="store-navigation" className="store-navigation" aria-label="Primary navigation" hidden={!mobileNavOpen}>
        {nav.map(([label, path]) => (
          <button
            className={pathname === path || (path === '/farms' && pathname.startsWith('/farm/')) ? 'active' : ''}
            onClick={() => {
              if (path === '/' || path === '/products') setActiveCategory('all');
              go(path);
              setMobileNavOpen(false);
            }}
            key={path}
          >
            {label}
          </button>
        ))}
        <button onClick={() => { go('/account'); setMobileNavOpen(false); }}>My account</button>
        <button onClick={() => { go('/auth/login'); setMobileNavOpen(false); }}>Login</button>
        <button onClick={() => { go('/auth/register'); setMobileNavOpen(false); }}>Sign up</button>
      </nav>
    </header>
  );
}
