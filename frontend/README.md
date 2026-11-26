# FOREVER Customer Storefront

The customer-facing FOREVER fashion store is a React 18 application built with Vite. It consumes the shared Express API in `../backend`.

[Live storefront](https://wear-forever.vercel.app/) · [Admin panel](https://forever-admin-seven-lovat.vercel.app/) · [Project guide](../FOREVER-Project-Guide.pdf)

## What it includes

- Editorial home page with hero, latest collection, lookbook, bestsellers, policy highlights, testimonials, and newsletter presentation
- Product collection with category/subcategory filters, price sorting, text search, and optional browser speech search
- Product detail pages with image gallery, size selection, add-to-cart/buy-now, product sharing, and related products
- Cart, registration/login, delivery details, checkout, payment verification, and customer order history
- Responsive navigation, page transitions, motion-aware loading, and toast feedback

Voice search uses the browser's `webkitSpeechRecognition` implementation with the `en-IN` locale. It is not available in every browser.

## Routes

| Route | Screen |
| --- | --- |
| `/` | Home |
| `/collection` | Product collection and filters |
| `/product/:productId` | Product details |
| `/cart` | Shopping cart |
| `/login` | Customer login and registration |
| `/place-order` | Delivery information and payment method |
| `/verify` | Checkout return/confirmation |
| `/orders` | Customer order history |
| `/about` | Brand information |
| `/contact` | Contact page |

## Shared state and API

`src/context/ShopContext.jsx` provides the product list, search state, authentication token, cart operations, currency, delivery fee, and totals. Products are loaded from `GET /api/product/list`; authenticated cart actions use the backend cart endpoints.

Set the backend URL in `frontend/.env`:

```dotenv
VITE_BACKEND_URL=http://localhost:4000
```

For Razorpay checkout, also configure the provider's public key ID:

```dotenv
VITE_RAZORPAY_KEY_ID=
```

These are client-side build values. Never place private payment, database, or JWT signing keys in this file.

## Development

```powershell
npm install
npm run dev
```

Vite is configured for port `5173`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production bundle in `dist/` |
| `npm run preview` | Preview the production bundle locally |
| `npm run lint` | Run ESLint on JavaScript/JSX files |

## Related applications

- Shared project setup and backend configuration: [`../README.md`](../README.md)
- Store admin: [`../admin/README.md`](../admin/README.md)
- API: [`../backend/`](../backend/)
- Full project guide: [`../FOREVER-Project-Guide.pdf`](../FOREVER-Project-Guide.pdf)

## Implementation notes

- Customer-facing prices are displayed in Indian rupees (`₹`); the backend uses INR for payment flows.
- Product ratings shown on the product detail page are static presentation content; review submission and review persistence are not implemented.
- Checkout and external-provider flows require a running backend and valid provider configuration.
