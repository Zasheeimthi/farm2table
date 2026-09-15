'use client';

/**
 * Browser-side API client.
 *
 * Components never talk to the backend directly - they call these helpers,
 * which hit our own /api/* route handlers. That keeps the backend URL and any
 * API keys server-side, and avoids CORS entirely.
 */

async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}) },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(payload?.message || `Request failed (${response.status})`);
    error.status = response.status;
    error.details = payload?.details;
    throw error;
  }
  return payload;
}

export const api = {
  catalog: (options) => request('/api/catalog', options),
  farms: (params = {}) => request(`/api/farms${toQuery(params)}`),
  farm: (id) => request(`/api/farms/${encodeURIComponent(id)}`),
  products: (params = {}) => request(`/api/products${toQuery(params)}`),
  product: (slug) => request(`/api/products/${encodeURIComponent(slug)}`),
  search: (params = {}) => request(`/api/search${toQuery(params)}`),
  createOrder: (order) => request('/api/orders', { method: 'POST', body: order }),
  orders: () => request('/api/orders'),
  login: (credentials) => request('/api/auth/login', { method: 'POST', body: credentials }),
  register: (details) => request('/api/auth/register', { method: 'POST', body: details }),
  forgotPassword: (details) => request('/api/auth/forgot-password', { method: 'POST', body: details })
};

function toQuery(params) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value != null && value !== '')
  ).toString();
  return query ? `?${query}` : '';
}
