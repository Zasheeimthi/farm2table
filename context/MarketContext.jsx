"use client";

import { cartLines } from "@/lib/market-model";
import { changeCart } from "@/lib/market-model";
import { createContext } from "react";
import { normalizeCart } from "@/lib/market-model";
import { productData } from "@/lib/catalog";
import { subtotalOf } from "@/lib/market-model";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "@/hooks/useNavigate";
import { useRef } from "react";
import { useState } from "react";
import { useStored } from "@/hooks/useStored.js";
import { validLocation } from "@/lib/market-model";
export const MarketContext = createContext(null);
export const useMarket = () => useContext(MarketContext);
export function MarketProvider({
  children
}) {
  const go = useNavigate();
  const [storedCart, setCart, ready] = useStored('cart', []);
  const [activeCategory, setActiveCategory] = useState('all');
  const [locationValue, setLocation] = useStored('location', null, true);
  const location = validLocation(locationValue) ? locationValue : null;
  const [savedValue, setSaved] = useStored('saved', []);
  const saved = Array.isArray(savedValue) ? savedValue : [];
  const [draftValue, setDraft] = useStored('checkout', {}, true);
  const draft = draftValue && typeof draftValue === 'object' ? draftValue : {};
  const [orderValue, setOrders] = useStored('preview-orders', [], true);
  const orders = Array.isArray(orderValue) ? orderValue : [];
  const [authenticatedValue, setAuthenticated] = useStored('authenticated', false, true);
  const authenticated = authenticatedValue === true;
  const [locationOpen, setLocationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const pendingAdd = useRef(null);
  const cart = normalizeCart(storedCart, productData);
  const lines = cartLines(cart, productData);
  const addNow = (product, quantity = 1, pack = 'single') => {
    setCart(current => changeCart(normalizeCart(current, productData), product, quantity, pack));
    setNotice(`${quantity} × ${product.title} added to your basket`);
  };
  const add = (product, quantity = 1, pack = 'single', redirectToCart = false) => {
    if (!location) {
      pendingAdd.current = {
        product,
        quantity,
        pack,
        redirectToCart
      };
      setLocationOpen(true);
      return;
    }
    addNow(product, quantity, pack);
    if (redirectToCart) go('/cart');
  };
  const confirmLocation = address => {
    setLocation(address);
    setDraft(current => ({
      ...current,
      ...address
    }));
    setLocationOpen(false);
    if (pendingAdd.current) {
      const {
        product,
        quantity,
        pack,
        redirectToCart
      } = pendingAdd.current;
      pendingAdd.current = null;
      addNow(product, quantity, pack);
      if (redirectToCart) go('/cart');
    }
  };
  const closeLocation = () => {
    pendingAdd.current = null;
    setLocationOpen(false);
  };
  const updateQuantity = (id, quantity) => setCart(current => normalizeCart(current, productData).map(line => `${line.slug}:${line.pack}` === id ? {
    ...line,
    quantity: Math.min(99, Math.max(0, quantity))
  } : line).filter(line => line.quantity > 0));
  const toggleSaved = id => setSaved(current => {
    const list = Array.isArray(current) ? current : [];
    return list.includes(id) ? list.filter(item => item !== id) : [...list, id];
  });
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 4500);
    return () => clearTimeout(timer);
  }, [notice]);
  return <MarketContext.Provider value={{
    ready,
    activeCategory,
    setActiveCategory,
    cart,
    lines,
    count: cart.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: subtotalOf(lines),
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
    setAuthenticated
  }}>{children}</MarketContext.Provider>;
}
