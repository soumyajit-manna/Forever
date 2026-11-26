# FOREVER

FOREVER is a full-stack fashion e-commerce project with a customer storefront, a separate store-admin application, and a shared REST API. It is developed as a B.Tech CSE final-year project.

## Applications

| Part | Folder | Responsibility |
| --- | --- | --- |
| Customer storefront | [`frontend/`](./frontend/) | Browse and search products, choose sizes, manage a cart, check out, and view orders. |
| Admin panel | [`admin/`](./admin/) | Sign in, add/list/remove products, upload product images, and update delivery status. |
| Backend API | [`backend/`](./backend/) | Authentication, product/cart/order APIs, MongoDB persistence, and provider integrations. |

The storefront and admin panel are separate React/Vite applications. They both use the backend configured through `VITE_BACKEND_URL`.

[Open the Forever Project Guide](./FOREVER-Project-Guide.pdf) for the architecture, route map, data models, integrations, source inventory, and setup reference.

## Technology

- **Languages:** JavaScript ES modules, JSX, CSS, HTML, and JSON; there is no TypeScript application source
- **Frontend:** React 18, Vite, React Router, Tailwind CSS, Axios, Framer Motion, React Icons, React Toastify
- **Admin:** React 18, Vite, React Router, Tailwind CSS, Axios, Framer Motion, React Toastify, PropTypes
- **Backend:** Node.js ES modules, Express, Mongoose, MongoDB, CORS, Multer, dotenv
- **Authentication:** JWT, bcrypt, validator
- **Services:** Cloudinary, Stripe, Razorpay, EmailJS
- **Build and lint:** PostCSS, Autoprefixer, ESLint, and the Vite React plugin
- **Deployment configuration:** Vercel SPA rewrites for the two web apps and a Vercel Node build/route configuration for the API

## Features

### Customer storefront

- Homepage sections for latest collections, lookbook, bestsellers, policies, testimonials, and newsletter presentation
- Product collection filtering by category/subcategory, price sorting, text search, and browser-dependent voice search
- Product details with image selection, size selection, related products, and sharing actions
- Size-aware cart with signed-in cart synchronization
- Account registration/login, checkout, payment verification, and order history
- Checkout options for Cash on Delivery, Stripe, and Razorpay

### Admin panel

- Admin sign-in backed by backend environment credentials
- Create products with category, subcategory, sizes, bestseller flag, and up to four images
- Review and remove products
- Review orders and update delivery status
- Responsive layout styled to match the FOREVER storefront, including the INR symbol (`₹`) for prices

The current product-admin workflow is create, list, and remove; product editing is not implemented.

### Backend

- REST route groups for users, products, cart, and orders
- JWT-protected customer cart/order routes and admin product/order-management routes
- MongoDB models for products, users/carts, and orders
- Cloudinary uploads and EmailJS transaction-email attempts
- Stripe and Razorpay order/payment flows

## Repository layout

```text
FOREVER/
├── frontend/   Customer-facing React application
├── admin/      Store administration React application
├── backend/    Express API, models, routes, and integrations
└── README.md   Project overview and shared setup
```

Each application folder has its own `package.json` and npm lockfile. Install and run each one from its own directory.

## Local development

Use three terminals from the project root.

### 1. Configure the backend

Create `backend/.env` with the values required by your own services:

```dotenv
PORT=4000
MONGODB_URI=
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
STRIPE_SECRET_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
EMAILJS_PRIVATE_KEY=
```

Do not commit real credentials. The backend connects to the `e-commerce` database below `MONGODB_URI`.

```powershell
cd backend
npm install
npm run server
```

The API defaults to `http://localhost:4000`.

### 2. Run the customer storefront

Create `frontend/.env`:

```dotenv
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=
```

```powershell
cd frontend
npm install
npm run dev
```

Vite is configured for port `5173`.

### 3. Run the admin panel

Create `admin/.env`:

```dotenv
VITE_BACKEND_URL=http://localhost:4000
```

```powershell
cd admin
npm install
npm run dev
```

Vite is configured for port `5174`.

Only public client configuration belongs in `VITE_*` variables. Keep database credentials, JWT signing secrets, EmailJS private keys, and payment secrets in the backend environment.

## EmailJS configuration

The backend sends `to_email`, `subject`, and `html` template parameters. Configure the EmailJS template recipient as `{{to_email}}`, the subject as `{{subject}}`, and the message body to include `{{{html}}}`. Enable API requests for non-browser applications in EmailJS account security settings.

Welcome, order, payment, and delivery-status messages are attempted by the backend. Email failures are logged and returned as `emailSent: false`; they do not roll back a successful registration or order operation. The welcome email CTA points to the supplied storefront URL, `https://wear-forever.vercel.app`.

## Available scripts

| Folder | Command | Purpose |
| --- | --- | --- |
| `frontend` | `npm run dev` | Start Vite development server |
| `frontend` | `npm run build` | Create production build |
| `frontend` | `npm run lint` | Run ESLint |
| `admin` | `npm run dev` | Start Vite development server |
| `admin` | `npm run build` | Create production build |
| `admin` | `npm run lint` | Run ESLint |
| `backend` | `npm run server` | Start API with Nodemon |
| `backend` | `npm start` | Start API with Node |

No automated test script is defined in the current package manifests.

## Live links

- **Customer storefront:** <https://wear-forever.vercel.app/>
- **Admin panel:** <https://forever-admin-seven-lovat.vercel.app/>

These URLs were supplied for this project. Their current availability and production API configuration have not been independently verified.

## Current scope and follow-up

- Product ratings shown on the product page are static presentation content; there is no review model/API.
- Wishlist, real customer reviews, product editing, inventory management, and admin analytics are not implemented.
- Customer/storefront and backend prices use INR; the admin interface now uses `₹` and formats prices using the Indian locale.
- Payment configuration and end-to-end verification require valid provider credentials and should be tested in a non-production environment first.

## Developer

**Soumyajit Manna** — Final Year B.Tech (CSE) Student · Full Stack Web Developer

- Portfolio: <https://soumyajit-dev-portfolio.vercel.app>
- GitHub: <https://github.com/soumyajit-manna>
- LinkedIn: <https://www.linkedin.com/in/soumyajit-manna-731372270>

## License

This project is developed for educational and academic purposes.
