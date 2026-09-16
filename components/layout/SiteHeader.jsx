'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from 'antd';
import { MenuOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { primaryNav } from '@/constants/content.js';
import { isActiveNav, routes } from '@/lib/routes.js';
import { useGo } from '@/hooks/useGo.js';
import { useIsScrolled } from '@/hooks/useIsScrolled.js';
import { useMarket } from '@/context/MarketContext.jsx';
import { useStorefront } from '@/context/StorefrontContext.jsx';
import Brand from './Brand.jsx';

/** Sticky storefront header: brand, search, basket badge, account links and mobile nav. */
export default function SiteHeader() {
  const market = useMarket();
  const go = useGo();
  const pathname = usePathname();
  const isScrolled = useIsScrolled();
  const { setActiveCategory } = useStorefront();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => { setMobileNavOpen(false); }, [pathname]);

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
        <Brand onHome={() => { setActiveCategory('all'); go(routes.home); }} />
        <button className="store-search" aria-label="Search products and farms" onClick={() => market.setSearchOpen(true)}>
          <SearchOutlined /><span>Search products, farms and categories…</span>
        </button>
        <div className="store-header-actions" aria-label="Quick actions">
          <Badge count={market.count} color="#103B37">
            <button className="store-cart" type="button" onClick={() => go(routes.cart)} aria-label="Open cart"><ShoppingCartOutlined /></button>
          </Badge>
          <Link className="store-login" href={routes.login}><UserOutlined className="store-login-icon" /><span>Login</span></Link>
          <Link className="store-signup" href={routes.register}>Sign up</Link>
        </div>
      </div>
      <nav id="store-navigation" className="store-navigation" aria-label="Primary navigation" hidden={!mobileNavOpen}>
        {primaryNav.map((item) => (
          <button
            className={isActiveNav(item.href, pathname) ? 'active' : ''}
            onClick={() => {
              if (item.href === routes.home || item.href === routes.products) setActiveCategory('all');
              go(item.href);
              setMobileNavOpen(false);
            }}
            key={item.href}
          >
            {item.label}
          </button>
        ))}
        <button onClick={() => { go(routes.account); setMobileNavOpen(false); }}>My account</button>
        <button onClick={() => { go(routes.login); setMobileNavOpen(false); }}>Login</button>
        <button onClick={() => { go(routes.register); setMobileNavOpen(false); }}>Sign up</button>
      </nav>
    </header>
  );
}
