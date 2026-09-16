/** Every URL the storefront knows about, in one place (file-based App Router routes). */

export const routes = {
  home: '/',
  farms: '/farms',
  products: '/products',
  cart: '/cart',
  checkout: '/checkout',
  payment: '/payment',
  confirmation: '/confirmation',
  account: '/account',
  orders: '/orders',
  saved: '/saved',
  about: '/about',
  contact: '/contact',
  login: '/auth/login',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',
  farm: (farmId) => `/farm/${farmId}`,
  product: (slug) => `/product/${slug}`,
  order: (orderId) => `/orders/${orderId}`,
  auth: (mode = 'login', query = '') => `/auth/${mode}${query}`,
  authWithNext: (mode, next, form = false) => `/auth/${mode}?next=${next}${form ? '&form=1' : ''}`,
  farmsByCategory: (categoryId) => `/farms?category=${encodeURIComponent(categoryId)}`,
  productsByCategory: (categoryId) => `/products?category=${encodeURIComponent(categoryId)}`,
  farmsBySearch: (query) => `/farms?search=${encodeURIComponent(query)}`,
  productsBySearch: (query) => `/products?search=${encodeURIComponent(query)}`,
  productsByFarm: (farmId) => `/products?farm=${encodeURIComponent(farmId)}`
};

export const isFarmsSection = (pathname) => pathname === routes.farms || pathname.startsWith('/farm/');

export const isActiveNav = (href, pathname) => {
  if (href === routes.home) return pathname === routes.home;
  if (href === routes.farms) return isFarmsSection(pathname);
  return pathname === href || pathname.startsWith(`${href}/`);
};
