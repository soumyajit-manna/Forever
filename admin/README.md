# FOREVER Store Admin

The admin app is the staff-facing workspace for the FOREVER fashion store. It is a standalone React 18/Vite application that uses the shared API in `../backend`.

[Live storefront](https://wear-forever.vercel.app/) · [Admin panel](https://forever-admin-seven-lovat.vercel.app/) · [Project guide](../FOREVER-Project-Guide.pdf)

## Admin workflows

- Sign in with credentials configured by the backend administrator
- Add a product with name, description, price, category, subcategory, sizes, bestseller flag, and up to four images
- Review the product catalogue and remove an item
- View customer orders and update their delivery status

Product editing is not currently supported; the product API has add, list, and remove operations.

## Interface and responsiveness

The admin panel follows the customer storefront's visual system: DM Sans body text, Cormorant Garamond headings, warm paper backgrounds, charcoal text, rust accents, and fine neutral borders.

- Wide screens use a side navigation and a two-column product form.
- Tablet/mobile screens place management navigation above the content and adapt product/order rows into stacked cards.
- Image upload tiles, form controls, status selectors, and action buttons remain keyboard focusable.
- Prices are displayed in Indian rupees (`₹`) and formatted with the `en-IN` locale.

## Routes

| Route | Screen |
| --- | --- |
| `/add` | Add a product |
| `/list` | Product catalogue |
| `/orders` | Orders and fulfilment |

The root path redirects to `/add` after sign-in.

## Backend configuration

Create `admin/.env` and point it to the API:

```dotenv
VITE_BACKEND_URL=http://localhost:4000
```

Admin credentials are validated by the backend endpoint `POST /api/user/admin`; configure `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `JWT_SECRET` in `backend/.env`. The browser app stores the returned admin token in local storage and sends it in the `token` request header.

The panel uses these protected API operations:

- `POST /api/product/add` and `POST /api/product/remove`
- `POST /api/order/list` and `POST /api/order/status`

Image uploads are sent as multipart form data and stored by the backend through Cloudinary. Order status changes trigger an EmailJS delivery-status message attempt.

## Development

```powershell
npm install
npm run dev
```

Vite is configured for port `5174`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production bundle in `dist/` |
| `npm run preview` | Preview the production bundle locally |
| `npm run lint` | Run ESLint on JavaScript/JSX files |

## Related documentation

- Shared project and backend setup: [`../README.md`](../README.md)
- Customer storefront: [`../frontend/README.md`](../frontend/README.md)
- Project guide: [`../FOREVER-Project-Guide.pdf`](../FOREVER-Project-Guide.pdf)
