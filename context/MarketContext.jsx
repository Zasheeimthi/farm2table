'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { productData } from '@/lib/catalog.js';
import { cartLines, changeCart, normalizeCart, subtotalOf, validLocation } from '@/lib/market-model.js';
import { routes } from '@/lib/routes.js';
import { useStored } from '@/hooks/useStored.js';

const MarketContext = createContext(null);

export const useMarket = () => useContext(MarketContext);

/**
 * Basket, saved items, delivery location, checkout draft, preview orders and
 * the two storefront dialogs — shared by every screen through the app layout.
 */
export function MarketProvider({ children }) {
  const router = useRouter();
  const [storedCart, setCart] = useStored('cart', []);
  const [locationValue, setLocation] = useStored('location', null, true);
  const [savedValue, setSaved] = useStored('saved', []);
  const [draftValue, setDraft] = useStored('checkout', {}, true);
  const [orderValue, setOrders] = useStored('preview-orders', [], true);
  const [authenticatedValue, setAuthenticated] = useStored('authenticated', false, true);

  const location = validLocation(locationValue) ? locationValue : null;
  const saved = Array.isArray(savedValue) ? savedValue : [];
  const draft = draftValue && typeof draftValue === 'object' ? draftValue : {};
  const orders = Array.isArray(orderValue) ? orderValue : [];
  const authenticated = authenticatedValue === true;

  const [locationOpen, setLocationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const pendingAdd = useRef(null);

  const cart = useMemo(() => normalizeCart(storedCart, productData), [storedCart]);
  const lines = useMemo(() => cartLines(cart, productData), [cart]);
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = subtotalOf(lines);

  const go = useCallback((path) => router.push(path), [router]);

  const addNow = useCallback((product, quantity = 1, pack = 'single') => {
    setCart((current) => changeCart(normalizeCart(current, productData), product, quantity, pack));
    setNotice(`${quantity} × ${product.title} added to your basket`);
  }, [setCart]);

  const add = useCallback((product, quantity = 1, pack = 'single', redirectToCart = false) => {
    if (!location) {
      pendingAdd.current = { product, quantity, pack, redirectToCart };
      setLocationOpen(true);
      return;
    }
    addNow(product, quantity, pack);
    if (redirectToCart) go(routes.cart);
  }, [location, addNow, go]);

  const confirmLocation = useCallback((address) => {
    setLocation(address);
    setDraft((current) => ({ ...current, ...address }));
    setLocationOpen(false);
    if (pendingAdd.current) {
      const { product, quantity, pack, redirectToCart } = pendingAdd.current;
      pendingAdd.current = null;
      addNow(product, quantity, pack);
      if (redirectToCart) go(routes.cart);
    }
  }, [setLocation, setDraft, addNow, go]);

  const closeLocation = useCallback(() => {
    pendingAdd.current = null;
    setLocationOpen(false);
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setCart((current) => normalizeCart(current, productData)
      .map((line) => `${line.slug}:${line.pack}` === id ? { ...line, quantity: Math.min(99, Math.max(0, quantity)) } : line)
      .filter((line) => line.quantity > 0));
  }, [setCart]);

  const toggleSaved = useCallback((id) => {
    setSaved((current) => {
      const list = Array.isArray(current) ? current : [];
      return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
    });
  }, [setSaved]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(''), 4500);
    return () => clearTimeout(timer);
  }, [notice]);

  return (
    <MarketContext.Provider
      value={{
        cart,
        lines,
        count,
        subtotal,
        add,
        updateQuantity,
        setCart,
        location,
        setLocation,
        locationOpen,
        setLocationOpen,
        confirmLocation,
        closeLocation,
        searchOpen,
        setSearchOpen,
        saved,
        toggleSaved,
        notice,
        setNotice,
        draft,
        setDraft,
        orders,
        setOrders,
        authenticated,
        setAuthenticated,
        go
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}
