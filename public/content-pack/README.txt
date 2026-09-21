FARM TO TABLE — EMAIL AND POLICY CONTENT PACK

Open index.html to browse. Files work as standalone HTML and are also served at /content-pack/index.html by the existing Next.js app. No email platform integration is included.

EMAIL HANDOFF
Each emails/*.html has a matching plain-text .txt file. Subject lines and preheaders are in manifest.json. Use the HTML as the HTML part and the text as the plain-text part of a multipart email. Core email layout styles are inline; responsive refinements and web fonts are in the head. Cormorant headings and Montserrat body text match the website. Local font files power browser previews. For sending, replace heading_font_url and body_font_url with public HTTPS URLs to these WOFF2 files. Email clients that block web fonts fall back to Georgia/Arial; the exact font appearance cannot be forced in every inbox. Logo alt text remains available when images are blocked.

Replace all {{variables}} using your email provider or backend. HTML-escape text values. Validate and attribute-escape all URLs; allow only trusted HTTPS destinations. Replace logo_url, farm_image_url, verify_art_url, reset_art_url and secure_art_url with absolute HTTPS URLs for the matching storefront images and content-pack/assets PNG files. Replace hero_image_url with an absolute HTTPS image URL (the existing /storefront/hero-produce.jpg can be hosted for this purpose). Never use relative image URLs in sent emails. Populate business_name, business_address, support_url, privacy_url, site_url and year from verified settings. Do not send until no unresolved variables remain.

Verification and reset links must be generated securely by the authentication backend, be single-use and expire as stated in expiry_duration. No security logic is provided by these HTML files. The preview’s 30-minute expiry is only an example.

Send promotion, seasonal-newsletter and abandoned-cart templates only to eligible marketing recipients. Implement working unsubscribe and preference links, honour suppression lists, and configure appropriate unsubscribe headers in your sending provider. Keep welcome and order/account messages transactional; do not insert promotional offers into them. Authenticate the sender domain using your provider’s SPF, DKIM and DMARC setup. HTML changes alone do not fix spam placement.

Preview data, offer codes, prices, delivery dates and refund timelines are illustrative. Check real rendering in Gmail, Outlook and Apple Mail, including mobile and images disabled, before sending. Browser checks do not establish email-client compatibility.

POLICY HANDOFF
All policies are visible drafts, excluded from indexing via a robots meta tag, and are not linked from the public storefront. Confirm jurisdiction (currently assumed Sweden/EU), legal entity, seller/operator roles, registration and contact details, payment/order acceptance rules, fulfilment, refunds, complaint channels, data map, lawful bases, retention, processors, international transfers and cookie inventory. Replace all [BRACKETED DETAILS], review legal accuracy and remove the draft notice only after approval. Confirm current online withdrawal requirements and implement any required withdrawal function. A cookie policy does not implement consent or block tracking. No consent manager is included.

Reference material for review:
https://www.imy.se/en/
https://europa.eu/youreurope/citizens/consumers/shopping/returns/index_en.htm
https://commission.europa.eu/digital-life/protecting-you-when-buying-online_en

MAINTENANCE
Sources: scripts/build-content-pack.mjs and scripts/content-pack-design.mjs. Artwork source: scripts/build-email-art.mjs; run it to regenerate the three PNG illustrations. Run node scripts/build-content-pack.mjs from the project root to regenerate the pack. Regeneration replaces generated files, so edit the generator for durable changes. This collection intentionally does not change the existing storefront or send email.
