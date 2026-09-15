import 'server-only';

/**
 * Upstream backend client.
 *
 * Set these in .env.local to point the storefront at your API:
 *
 *   BACKEND_API_URL=https://api.yourdomain.com
 *   BACKEND_API_KEY=...            # optional, sent as a Bearer token
 *   BACKEND_API_KEY_HEADER=...     # optional, override the auth header name
 *
 * When BACKEND_API_URL is not set the app runs against the local seed catalog,
 * so the storefront is fully browsable before the backend exists.
 */

export const backendUrl = () => (process.env.BACKEND_API_URL || '').replace(/\/$/, '');

export const hasBackend = () => Boolean(backendUrl());

export class BackendError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'BackendError';
    this.status = status;
  }
}

/**
 * Calls the upstream API. Server-only: credentials never reach the browser
 * because every call runs inside a route handler or a server component.
 */
export async function backendFetch(path, { method = 'GET', body, signal, headers = {}, ...rest } = {}) {
  const base = backendUrl();
  if (!base) throw new BackendError('BACKEND_API_URL is not configured', 503);

  const authHeader = process.env.BACKEND_API_KEY_HEADER || 'Authorization';
  const apiKey = process.env.BACKEND_API_KEY;

  const response = await fetch(`${base}${path.startsWith('/') ? path : `/${path}`}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(apiKey ? { [authHeader]: authHeader === 'Authorization' ? `Bearer ${apiKey}` : apiKey } : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
    cache: 'no-store',
    ...rest
  });

  if (!response.ok) {
    let detail = '';
    try {
      detail = (await response.json())?.message || '';
    } catch {
      /* Upstream did not return JSON; the status is enough. */
    }
    throw new BackendError(detail || `Backend request failed (${response.status})`, response.status);
  }

  if (response.status === 204) return null;
  return response.json();
}
