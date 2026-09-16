# Farm to Table — Vite/React → Next.js App Router

The storefront was migrated from a Vite + React single-page app (hash routing) to Next.js 15
with the App Router. **The UI, styling, copy, imagery, interactions and user flow are unchanged** —
only the code structure and the routing/build layer were replaced.

## What changed

| Before | After |
| --- | --- |
| Vite + `@vitejs/plugin-react` build | Next.js 15 App Router (`next.config.mjs`, `next build`) |
| `index.html` + `src/main.jsx` SPA entry | `app/layout.js` (root layout, metadata, CSS) |
| Hash router in `src/App.jsx` (`window.location.hash`) | File-based routes under `app/` |
| `src/App.jsx`, `src/marketplace.jsx` monoliths | Feature components under `components/*` |
| `src/*.css` imported from `main.jsx` | `styles/*.css` imported once in `app/layout.js`, same cascade order |
| `<img src="/photography/…">` | `next/image` through `components/common/CatalogImage.jsx` |
| Google Fonts `@import` in CSS | unchanged (see *Fonts* below) |
| `localStorage`/`window` read at module scope | server-safe stores + client components |

## Structure

```
app/                        file-based routes (server components)
  layout.js                 html/body, metadata, CSS, header + footer + dialogs
  page.js                   home
  farms/ products/ farm/[farmId]/ product/[slug]/ …
components/
  layout/                   Brand, SiteHeader, SiteFooter, ScrollManager
  common/                   Page, Breadcrumb, PageHeading, EmptyState, CheckoutProgress,
                            QuantityStepper, SaveButton, CategoryIcon, CategoryChips,
                            LocationBar, FarmLink, MarketModal, CatalogImage, MarketTools
  home/                     HeroSection, CategoryFilter, CategoryDiscovery, FeaturedFarms,
                            FeaturedProducts, FarmStory, CarePanel, VisitSection,
                            ReviewsSection, FaqSection, ShoppingJourney, WhyChooseSection
  shop/ farm/ product/      FarmsView, ProductsView, FarmCard, FarmView, ProductCard,
                            MarketProductCard, ProductDetailView
  cart/ checkout/ account/ auth/ content/ map/
context/                    MarketContext (basket, location, saved, orders, dialogs)
hooks/                      useStored, useGo, useIsScrolled, usePaymentCards
lib/                        catalog, products, market-model, routes, geocoding, image-assets
constants/                  content (nav, reviews, FAQ…), theme (antd)
utils/                      money, date and count formatting
styles/                     styles.css, marketplace.css, refinements.css, location-map.css
tests/                      node:test suites for the market model and catalogue
```

## Route map

| Old hash route | New route |
| --- | --- |
| `#/` | `/` |
| `#/farms?category=…&search=…` | `/farms?category=…&search=…` |
| `#/farm/<farmId>` | `/farm/<farmId>` (8 farm pages pre-rendered) |
| `#/products?category=…&farm=…&search=…` | `/products?…` |
| `#/product/<slug>` | `/product/<slug>` (49 product pages pre-rendered, slug = `slugify(title)`) |
| `#/cart`, `#/checkout`, `#/payment` | `/cart`, `/checkout`, `/payment` |
| `#/confirmation?order=HEA-…` | `/confirmation?order=…` |
| `#/account`, `#/orders`, `#/orders/<id>`, `#/saved` | `/account`, `/orders`, `/orders/<id>`, `/saved` |
| `#/auth/login?next=…&form=1` | `/auth/login?next=…&form=1` (also `register`, `forgot-password`) |
| `#/about`, `#/contact` | `/about`, `/contact` |
| anything else | `app/not-found.js` (the “off the farm” screen) |
| – | `/shop`, `/producers`, `/categories`, `/categories/<id>`, `/producers/<id>` redirect permanently to their new equivalents |

## Server and client components

* **Server** — `app/layout.js`, every `app/**/page.js` and `app/not-found.js`. They read route
  params/`searchParams`, resolve catalogue data, export `metadata` and render client views.
* **Client** — anything that needs state, effects, browser storage, Leaflet or antd modals
  (`components/**` with `'use client'` at the top, plus `MarketProvider`).
* Leaflet and the geocoder are browser-only, so they are loaded through
  `components/map/MapClients.jsx` with `next/dynamic(..., { ssr: false })`; the map itself is
  still `leaflet` + OpenStreetMap tiles with the original `.delivery-pin` marker.
* `hooks/useStored.js` renders the server default on the server **and** on the first client
  render, then adopts the stored value in a layout effect (before paint). That keeps hydration
  deterministic while the basket, saved items, delivery location and preview orders still come
  back instantly, with no hydration mismatches.

## Key decisions

1. **Fonts stay a CSS `@import`.** `next/font/google` downloads the families during `next build`;
   `fonts.googleapis.com` is not reachable from the build sandbox, so using it would break the
   build. The import lives in `styles/styles.css` exactly as before. To move to `next/font`,
   replace that import with `next/font/google` for Cormorant, Montserrat and Instrument Sans and
   point `--heading-font` / `--body-font` at the generated variables.
2. **antd with `@ant-design/nextjs-registry`** (in `app/layout.js`) plus the original theme in
   `components/common/Providers.jsx`, so server-rendered markup arrives with the styles already
   inlined (no style flash).
3. **CSS untouched.** The three original stylesheets were moved to `styles/` verbatim and are
   imported in the original order (`styles.css` → `marketplace.css` → `refinements.css` →
   `location-map.css`) after `leaflet/dist/leaflet.css`.
4. **`next/image` without changing the design.** All artwork is local, so `CatalogImage` renders
   `next/image` with intrinsic dimensions taken from `lib/image-assets.js` (generated from the
   files in `public/`, with a 1600×1067 fallback for anything missing). Because `next/image`
   renders a plain `<img>` element, every existing `.market-* img` selector keeps working
   (object-fit, aspect ratios, `mix-blend-mode`).
5. **State management is unchanged** — the same context API (`useMarket`) and the same storage
   keys (`farmtable:cart`, `farmtable:saved`, `farmtable:location`, `farmtable:checkout`,
   `farmtable:preview-orders`, `farmtable:authenticated`), so an existing basket still loads.

## Verification

* `npm run build` → compiles cleanly, 75 pages generated (49 products, 8 farms, 3 account
  screens, static pages + on-demand screens), shared First Load JS 103 kB.
* `npm test` → 11 tests pass; `npm run lint` → clean (ESLint 9 flat config + Next core-web-vitals).
* All routes were fetched from the production server and checked for status codes, headings,
  the `.page-shell` wrapper and the header/main/footer order.
* Class-name parity: every class token used by the old pages is present in the new markup (299
  checked), so the existing CSS keeps matching the same elements.
* Every `/storefront`, `/photography` and `/ferme` asset referenced by the new code exists, and
  the image optimizer returns 200 for the artwork.

## Not in scope

* Sign-in, registration, password reset and the newsletter/contact forms remain previews
  (they set the same session flags and show the same notices as before) — no backend was added.
* `build-*.log` files from the Vite build are still in the repository and can be deleted.
