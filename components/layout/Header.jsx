"use client";

import { Badge } from "antd";
import { Brand } from "@/components/layout/Brand.jsx";
import Link from "next/link";
import { MenuOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useMarket } from "@/context/MarketContext.jsx";
import { useNavigate } from "@/hooks/useNavigate";
import { useState } from "react";
export function Header({
  route,
  setActiveCategory,
  cartCount,
  isScrolled
}) {
  const go = useNavigate();
  const market = useMarket();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  useEffect(() => {
    setMobileNavOpen(false);
  }, [route.path]);
  const nav = [['Home', '/'], ['Farms', '/farms'], ['Products', '/products'], ['About', '/about'], ['Contact us', '/contact']];
  return <header className={`store-header ${route.path !== '/' ? 'store-header-page' : ''} ${mobileNavOpen ? 'store-menu-open' : ''} ${isScrolled ? 'scrolled' : ''}`}>
      <div className="store-header-inner">
      <button className="store-menu-toggle" type="button" aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileNavOpen} aria-controls="store-navigation" onClick={() => setMobileNavOpen(isOpen => !isOpen)}>
        <MenuOutlined />
      </button>
      <Brand onHome={() => {
        setActiveCategory('all');
        go('/');
      }} />
      <button className="store-search" aria-label="Search products and farms" onClick={() => market.setSearchOpen(true)}>
        <SearchOutlined /><span>Search products, farms and categories…</span>
      </button>
      <div className="store-header-actions" aria-label="Quick actions">
        <Badge count={cartCount} color="#103B37">
          <button className="store-cart" type="button" onClick={() => go('/cart')} aria-label="Open cart"><ShoppingCartOutlined /></button>
        </Badge>
        <Link className="store-login" href="/auth/login"><UserOutlined className="store-login-icon" /><span>Login</span></Link>
        <Link className="store-signup" href="/auth/register">Sign up</Link>
      </div>
      </div>
      <nav id="store-navigation" className="store-navigation" aria-label="Primary navigation" hidden={!mobileNavOpen}>
        {nav.map(([label, path]) => <button className={route.path === path || path === '/farms' && route.path.startsWith('/farm/') ? 'active' : ''} onClick={() => {
        if (path === '/' || path === '/products') setActiveCategory('all');
        go(path);
        setMobileNavOpen(false);
      }} key={path}>
            {label}
          </button>)}
        <button onClick={() => {
        go('/account');
        setMobileNavOpen(false);
      }}>My account</button>
        <button onClick={() => {
        go('/auth/login');
        setMobileNavOpen(false);
      }}>Login</button>
        <button onClick={() => {
        go('/auth/register');
        setMobileNavOpen(false);
      }}>Sign up</button>
      </nav>
    </header>;
}
