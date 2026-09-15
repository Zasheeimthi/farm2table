# Farm to Table — Next.js storefront

A Next.js (App Router) storefront for Farm to Table, converted from the original
Vite + React single-page app. The design, markup, CSS and copy are carried over
unchanged; the routing, data layer and component structure are rebuilt around
Next.js conventions so the storefront is ready for API and backend integration.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm test           # unit tests for the basket/pricing model
```

The storefront runs against a bundled seed catalog out of the box, so it is fully
browsable with no backend configured.

## What changed from the Vite version

| Concern | Before | Now |
| --- | --- | --- |
| Routing | hash router (`#/farm/solmarka`) in one `App.jsx` switch | file-based routes (`/farm/solmarka`) |
| Monoliths | `App.jsx` (781 lines) + `marketplace.jsx` (270 lines) | 44 components under `components/` |
| Navigation | `setRoute()` / `go()` writing `window.location.hash` | `useGo()` + `next/link` |
| Links | `<a href="#/cart">` | `<Link href="/cart">` |
| Catalog | imported directly from `catalog.jsx` | `CatalogProvider`, seeded from the server, refreshable from the API |
| Data fetching | none | `/api/*` route handlers + `lib/api-client.js` |
| Storage reads | `localStorage` read during render | hydrates after mount, so SSR output is stable |
| Leaflet | imported directly (touches `window`) | `ssr: false` dynamic import |
| SEO | single `index.html` | per-route metadata + `generateMetadata` for products and farms |

The old Vite entry points (`index.html`, `vite.config.js`, `src/`) were removed.
They remain in git history if you need to compare.

## Architecture

```
app/
  layout.jsx              server layout: fetches the catalog, sets global metadata
  providers.jsx           client stack: antd theme + catalog + market + UI state
  <route>/page.jsx         one file per URL, thin wrappers around components
  api/                     route handlers (the backend integration surface)
components/
  layout/                  Header, Footer, Brand, SiteChrome
  home/                    HomePage, Reviews, FAQSection
  catalog/                 product cards, category artwork/filter/icon
  market/                  marketplace pages (farms, products, cart, checkout, auth)
  map/                     Leaflet map, loaded client-only
  providers/               CatalogProvider, MarketProvider, UiProvider
lib/
  catalog.js               seed catalog (fallback data)
  market-model.js          pure pricing/basket math - isomorphic, unit tested
  api-client.js            browser-side client for /api/*
  navigation.js            useGo() hook
  storage.js               SSR-safe localStorage hook
  server/                  server-only: backend client + catalog assembly
styles/                    original CSS, pinned in cascade order by index.css
```

### Data flow

1. `app/layout.jsx` (server) calls `getCatalog()`.
2. `getCatalog()` calls your backend when `BACKEND_API_URL` is set, otherwise
   returns the seed catalog. A backend failure also falls back to seed data, so
   an outage degrades to a browsable storefront rather than an empty page.
3. The catalog is passed into `CatalogProvider`, so the first HTML paint already
   contains real products and farms — no loading spinner, and crawlers see the
   content.
4. When the catalog came from a live backend, the client re-fetches
   `/api/catalog` on mount to pick up price or stock changes.

## Connecting your backend

Copy `.env.example` to `.env.local` and set:

```bash
BACKEND_API_URL=https://api.yourdomain.com
BACKEND_API_KEY=...              # optional, sent as a Bearer token
BACKEND_API_KEY_HEADER=...       # optional, override the auth header name
GEOCODER_URL=https://photon.komoot.io   # optional, address lookup provider
```

Then check which source is live:

```bash
curl localhost:3000/api/health
# { "ok": true, "backendConfigured": true, "catalogSource": "api", ... }
```

### Endpoints

Every call runs server-side, so your backend URL and API keys never reach the
browser and there is no CORS to configure.

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/catalog` | whole catalog in one call |
| GET | `/api/products` | filter by `category`, `farm`, `search`, `sort` |
| GET | `/api/products/:slug` | one product, its farm, and related items |
| GET | `/api/farms` | producers with product counts |
| GET | `/api/farms/:farmId` | one producer and everything they sell |
| GET | `/api/search?q=` | combined product + farm search |
| GET | `/api/orders` | order history |
| POST | `/api/orders` | place an order |
| POST | `/api/auth/login` | sign in |
| POST | `/api/auth/register` | create an account |
| POST | `/api/auth/forgot-password` | trigger a reset email |
| GET | `/api/location/search?q=` | address lookup (proxied) |
| GET | `/api/location/reverse?lat=&lon=` | point → address (proxied) |
| GET | `/api/health` | which catalog source is live |

### Expected backend response shapes

`GET {BACKEND_API_URL}/farms` and `/products` should return an array (or
`{ data: [...] }`). Field names are mapped in `lib/server/catalog.js`:

```jsonc
// /products
{ "title": "Whole Milk 1L", "category": "dairy", "farmId": "solmarka",
  "price": "56 kr", "image": "/photography/milk.jpg", "tag": "Organic" }

// /farms
{ "id": "solmarka", "name": "Solmarka Farm", "location": "Blekede, Sweden",
  "image": "/storefront/farm-detail-hero-solmarka.jpg", "summary": "...",
  "practices": ["Biodynamic"] }
```

`title`/`name`, `farmId`/`farm_id`, `price` (number or string) and
`image`/`imageUrl` are all accepted — adjust the two `to*` mappers in
`lib/server/catalog.js` if your field names differ.

### Order placement

`POST /api/orders` re-prices the basket from the **server-side** catalog rather
than trusting the totals sent by the browser, so a tampered client cannot change
the amount charged. It validates the delivery address before forwarding.

## Notes and follow-ups

- **Images** use plain `<img>` to preserve the existing layout exactly. Next's
  `<Image>` would add optimisation, but needs `fill`/sizing work per card.
- **Payments** are still a preview: the checkout collects card details locally
  and "Place order" creates a local order. Wire `POST /api/orders` to your PSP.
- **Auth** endpoints return `501` until `BACKEND_API_URL` is set, which is why
  the UI still says account services are not connected.
- **Cart/orders persistence** uses `localStorage`/`sessionStorage` via
  `lib/storage.js`. Move to a server session when accounts go live.
- The catalogue and address picker are the only third-party calls; the geocoder
  is proxied so it can be swapped without touching the client.
