# KrishnaKam website starter (Cloudflare Pages)

This is a deployable starter inspired by the KrishnaKam screenshots. It includes a responsive storefront, category tabs, cart, WhatsApp order handoff, and a basic Cloudflare Pages Functions + D1 foundation for admin/order APIs.

## Before going live
- Replace the sample WhatsApp number, address, phone, and social links in `public/config.js`.
- Confirm product names, prices, ingredients, stock, delivery rules, and all business claims.
- This starter does **not** implement a complete admin login UI yet. Do not expose admin data or allow writes until authentication is implemented and tested.
- UPI checkout is a manual-payment workflow only when you add a verified UPI ID/QR and server-side order/payment verification. Do not trust a customer-submitted "paid" checkbox.
- Do not store card details.
- Cloudflare Pages/D1 free quotas and features can change.

## Deploy with GitHub + Cloudflare Pages
1. Extract this ZIP.
2. In your GitHub repository, choose **Add file → Upload files**, upload the *contents* of this folder (not the ZIP), then commit to `main`.
3. In Cloudflare Dashboard → **Workers & Pages**, open the Pages project connected to the repo.
4. Build settings:
   - Framework preset: **None**
   - Build command: leave blank
   - Build output directory: `public`
5. Save and deploy. Your static site should appear on a `*.pages.dev` address.
6. Open the deployed site and test it on desktop and mobile.
7. In the Pages project → **Custom domains**, add `krishnakam.in` and follow Cloudflare's exact instructions. Do not delete unrelated DNS records.
8. To add database-backed features, create a D1 database and bind it as `DB` under Settings → Functions → D1 database bindings, then apply `schema.sql` using Wrangler/Cloudflare's D1 console.

## Local preview (optional)
From this folder, run `npx wrangler pages dev public` after installing Node.js and Wrangler.

## Files
- `public/index.html`: storefront
- `public/styles.css`: styling and responsive layout
- `public/app.js`: categories, cart, WhatsApp order
- `public/config.js`: business configuration
- `functions/api/health.js`: API health endpoint
- `functions/api/products.js`: reads products from D1 if bound; otherwise returns sample products
- `schema.sql`: starter D1 schema
