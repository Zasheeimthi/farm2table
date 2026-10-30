# Farm to Table admin design preview

Open `public/admin-design.html` directly in a modern browser. It is a single portable HTML file with embedded CSS, JavaScript, images and SVG icons. No installation, external fonts, CDN, server or backend connection is required. Refreshing resets the sample data.

## Review basis

The live admin was inspected read-only on 16 October 2026, with user authorization. Reviewed: sign-in, orders listing, navigation, farm creation fields, category creation fields, customers, reviews, and sales-report navigation. Supplied screenshots also informed order details. No records were submitted or changed in the live application. The later steps of farm onboarding were not advanced because they require completing the initial form.

The existing six sections remain: Orders, Farms, Categories, Customers, Reviews, Reports. Inconsistent screen titles were observed (including Reviews appearing as Sales Summary). The concept gives each view a consistent title and navigation state.

## Design decisions

- Pine green navigation, warm neutral workspace, quiet borders and restrained status colours preserve the brand while making operational content easier to scan.
- Orders prioritise reference/date, customer/location, fulfilment, payment and amount. Contact and full address details belong in the detail view.
- Search, status tabs and explicit payment/date filters help users locate records. Filters stay in place when returning from a detail view.
- Payment and fulfilment remain separate. A paid order is not automatically a delivered order.
- Mobile orders become cards, navigation becomes a drawer, summary tiles use two columns, and forms use one column. Wider secondary tables scroll within their panels.
- Shared buttons, status badges, form fields, tables, panels and dialogs maintain uniform spacing and type.
- Native modal dialogs, labelled fields, visible focus styles, validation, reduced-motion support and text status labels support keyboard and accessible use.

Research used: Nielsen Norman Group, [Data Tables: Four Major User Tasks](https://www.nngroup.com/articles/data-tables/) and [User Intent Affects Filter Design](https://www.nngroup.com/articles/applying-filters/). The concept applies find/compare/inspect/action tasks and immediate filtering with visible results.

## Try the flows

1. Orders: search for Emma, filter by payment or date, change status tabs, sort, paginate, and export the filtered results as CSV.
2. Order detail: open an order, update its simulated fulfilment status, schedule a simulated delivery window, or print the order.
3. Farms: search, open a farm to edit its details, or add a sample farm with validated fields.
4. Categories: add/edit a category, change visibility, and optionally select a local PNG/JPEG/WebP image under 2 MB.
5. Customers: search, inspect a customer profile, and follow through to their order.
6. Reviews: hide or publish a sample review through a confirmation dialog.
7. Reports: switch between summary, sales table and monthly view; change the period and export sample data.
8. Sign-in: use the arrow beside Super Admin to see the redesigned login. Any valid email and nonempty password enter the demo. No credentials are sent or stored.

## Scope and integration notes

This is an interactive design prototype, not a replacement backend. All customers, contact details, orders, ratings and metrics are demonstration data; farm photographs are representative existing project assets. No supplied admin credentials are included. Refreshing discards local edits.

Status updates, review moderation and delivery scheduling are proposed local flows. They require existing API mapping, authorization, audit events and error/loading handling before production implementation. No carrier booking, payment operation, password reset, email or notification is sent. Farm onboarding is a consolidated concept using the verified initial form fields, not a claim that unseen onboarding steps were reproduced. Product quantities and amounts are internally consistent sample values; VAT is illustrative and must use backend-calculated values in production.

The storefront and production admin files were not changed. This note, the standalone HTML preview and `admin-design-preview.png` were added.

## Verification

Checked JavaScript syntax and embedded asset completeness. Browser checks covered desktop layout, a 390 px mobile layout, mobile navigation, order search, payment filtering, status updates, farm creation, category creation and reporting-period totals. The browser reported no console errors during these checks. CSV export, printing, password-recovery messaging and local image selection are implemented but were not exercised end to end.

## Farm workspace expansion

The five additional user-supplied farm screenshots now inform a dedicated directory → Info / Zone / Location / Profile flow. Manage farm opens a full page instead of an edit dialog. The directory offers both cards and a compact table. Info includes photo selection, contact/business details, commission, multiple categories and address. Profile includes partner contact fields and a simulated password-validation form. These pages retain Montserrat throughout.

Zone includes polygon drawing, draggable vertices, accessible numeric point entry, point removal, clearing with confirmation, restoration and saving. Location supports clicking to place the pin and numeric coordinate editing. Both maps are explicitly illustrative, offline SVG diagrams, not geographic maps. They do not calculate real service coverage or geocode an address. Map-provider integration remains production work.

Drafts survive tab navigation for each farm during the page session; refreshing resets all demo changes. The password form validates length and matching values but never stores or transmits them. Farm information, zone saving, coordinate saving, profile saving and mobile page width were checked in the browser without console errors. Drag gestures, photo upload and password simulation were not exercised end to end.

Readable farm extension sources are in `design/admin-farms.js` and `design/admin-farms.css`. Run `node design/sync-admin-farms.mjs` after editing either to refresh the embedded HTML. The delivered HTML remains self-contained.
