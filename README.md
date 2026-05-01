<div align="center">

# 🛒 Marketmandu — E-commerce Frontend

**A modern, full-featured Angular 21 e-commerce single-page application with a customer storefront and a full admin dashboard.**

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NgRx](https://img.shields.io/badge/NgRx-19-764ABC?logo=redux&logoColor=white)](https://ngrx.io)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![PrimeNG](https://img.shields.io/badge/PrimeNG-21-007ACC)](https://primeng.org)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Application Routes](#-application-routes)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Environment Configuration](#-environment-configuration)
- [State Management](#-state-management)
- [Authentication Flow](#-authentication-flow)
- [Docker Deployment](#-docker-deployment)
- [Coding Conventions](#-coding-conventions)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔎 Overview

**Marketmandu** is the frontend application for a modern e-commerce platform. It offers a seamless shopping experience for end-users and a powerful administration suite for store managers. Built on the latest Angular (standalone components + signals) with a predictable NgRx-backed state layer, the application delivers fast, reactive, and maintainable UI with a polished TailwindCSS/PrimeNG design system.

---

## ✨ Key Features

### 🛍️ Customer Storefront
- **Product discovery** — rich home page with carousels, category browsing, and responsive product grids
- **Powerful search** — server-side search with sorting and pagination (`search.model.ts`)
- **Product details** — detailed views with imagery, stock, pricing, and add-to-cart actions
- **Shopping cart** — add / remove / bulk update / clear, persisted via NgRx effects
- **Checkout & orders** — secure checkout flow, order placement, and order-success confirmation
- **Authentication** — signup, login, JWT access token with automatic refresh-token rotation

### 🧑‍💼 Admin Dashboard
- **Analytics dashboard** — KPIs, stats cards, and Chart.js-powered pie & line charts
- **Product management** — create, update, delete, bulk-delete products; active/inactive and stock tracking
- **Orders management** — searchable, sortable orders table with detailed order drill-down (timeline, addresses, pricing breakdown, items)
- **User management** — list all users, view per-user details, bulk actions, role/status badges
- **Role-based access** — `adminGuard` protects all `/admin/**` routes, `authGuard` protects customer-only actions

### 🎨 UX / UI
- Responsive, mobile-first design with TailwindCSS v4
- PrimeNG (Aura theme) + PrimeIcons + `@ng-icons/heroicons`
- Hot-toast notifications (`@ngxpert/hot-toast`)
- Smooth scroll-in animations via IntersectionObserver
- Custom currency pipe and `is-mobile-view` directive

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Angular `21.0.0` (standalone components, signals, `@if` / `@for` control flow) |
| **Language** | TypeScript `5.9` (strict mode, `strictTemplates`) |
| **State** | `@ngrx/store` `19`, `@ngrx/effects`, `@ngrx/store-devtools` |
| **Styling** | TailwindCSS `4.1` + PostCSS |
| **UI Kit** | PrimeNG `21` (Aura theme), PrimeIcons, `@ng-icons/heroicons` |
| **Charts** | Chart.js `4.5` |
| **Notifications** | `@ngxpert/hot-toast` |
| **HTTP** | `@angular/common/http` with functional interceptors |
| **Testing** | Vitest `4` + `jsdom` |
| **Build / Serve** | `@angular/build` (esbuild-based application builder) |
| **Deploy** | Docker multi-stage build → Nginx `alpine` |

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── admin/                 # Admin feature module
│   │   │   └── components/
│   │   │       ├── dashboard/         # Dashboard shell
│   │   │       ├── dashboarditem/     # KPI cards, charts
│   │   │       ├── products/          # Product CRUD table
│   │   │       ├── orders/            # Orders table
│   │   │       ├── ordersdetails/     # Single order drill-down
│   │   │       ├── users/             # Users table
│   │   │       └── userdetails/       # Single user view
│   │   │
│   │   ├── auth/                  # Authentication feature
│   │   │   └── components/
│   │   │       ├── login.component/
│   │   │       └── register.component/
│   │   │
│   │   ├── custumer/              # Customer-facing feature
│   │   │   └── components/
│   │   │       ├── cus.home/          # Storefront home
│   │   │       ├── productdetails/    # PDP
│   │   │       ├── search.component/  # Search results
│   │   │       ├── cart/              # Cart page
│   │   │       ├── checkout/          # Checkout flow
│   │   │       └── order-success/     # Post-order confirmation
│   │   │
│   │   ├── core/                  # Cross-cutting concerns
│   │   │   ├── guards/                # authGuard, adminGuard
│   │   │   ├── interceptors/          # authInterceptor (+ refresh token)
│   │   │   ├── models/                # auth, cart, product, order, dashboard, search
│   │   │   └── services/              # auth, customer, admin, payment, navigation
│   │   │
│   │   ├── shared/                # Reusable UI building blocks
│   │   │   ├── components/            # header, footer, searchbar, carousel,
│   │   │   │                          # typecarousel, cardbanner, producet-item
│   │   │   ├── directives/            # is-mobile-view
│   │   │   └── pipes/                 # currencypipecustum
│   │   │
│   │   ├── store/                 # NgRx state slices
│   │   │   ├── admin/                 # Dashboard state (actions/effects/reducers/selectors)
│   │   │   ├── auth/                  # Login, register, logout, restore-session
│   │   │   └── custumer/              # Products + cart state
│   │   │
│   │   ├── app.ts                 # Root standalone component
│   │   ├── app.config.ts          # Providers (router, store, effects, PrimeNG, toast, http)
│   │   └── app.routes.ts          # Lazy-loaded route definitions
│   │
│   ├── index.html
│   ├── main.ts                    # bootstrapApplication(App, appConfig)
│   └── styles.css                 # Global styles + Tailwind entry
│
├── public/                        # Static assets copied as-is to the build output
│
├── Dockerfile                     # Multi-stage: node:22-alpine build → nginx:alpine serve
├── nginx.conf                     # SPA-friendly fallback to index.html
├── tailwind.config.ts             # Design tokens (primary / secondary / accent palettes)
├── angular.json                   # Angular CLI/build config
├── tsconfig*.json                 # Strict TypeScript config
└── package.json
```

---

## 🧭 Application Routes

| Path | Component | Guard | Description |
|------|-----------|-------|-------------|
| `/` | `CusHome` | — | Storefront landing page |
| `/product/:id/:slug` | `Productdetails` | — | Product detail page |
| `/search` | `SearchComponent` | — | Search results |
| `/login` | `LoginComponent` | — | Sign in |
| `/signup` | `RegisterComponent` | — | Create account |
| `/cart` | `Cart` | `authGuard` | Shopping cart |
| `/checkout` | `Checkout` | `authGuard` | Checkout flow |
| `/ordersuccess` | `OrderSuccess` | `authGuard` | Post-order confirmation |
| `/admin/dashboard` | `Dashboard` | `adminGuard` | Admin KPIs & charts |
| `/admin/products` | `Products` | `adminGuard` | Product management |
| `/admin/orders` | `Orders` | `adminGuard` | Orders table |
| `/admin/orders/:id` | `Ordersdetails` | `adminGuard` | Order detail view |
| `/admin/user/:id` | `Userdetails` | `adminGuard` | User detail view |
| `**` | → `/` | — | Wildcard redirect |

All feature routes are **lazy-loaded** via `loadComponent()` for optimal bundle splitting.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 22.x`
- **npm** `>= 10.9.2`
- A running backend API that exposes the endpoints consumed by `AuthServices`, `CusServices`, and `AdminService` (see [Environment Configuration](#-environment-configuration))

### Install

```bash
git clone <your-fork-url>
cd <repo-folder>
npm install --legacy-peer-deps
```

> ⚠️ `--legacy-peer-deps` matches the flag used in the project's `Dockerfile` and avoids peer-dependency conflicts between PrimeNG RC and Angular 21.

### Run (dev server)

```bash
npm start
# → http://localhost:4200
```

The dev server watches source files and reloads automatically.

### Production Build

```bash
npm run build
# Output: dist/ecommerce/browser
```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the Angular dev server on port `4200` |
| `npm run build` | Production build (optimized, hashed, budgets enforced) |
| `npm run watch` | Development build with file watcher |
| `npm test` | Run unit tests via `@angular/build:unit-test` (Vitest + jsdom) |
| `npm run ng <cmd>` | Passthrough to the Angular CLI |

**Production budgets** (see `angular.json`):
- Initial bundle: warn `500 kB` / error `1 MB`
- Any component style: warn `4 kB` / error `8 kB`

---

## 🔐 Environment Configuration

The app reads the API base URL from `src/app/environments/environment.development.ts`:

```ts
// src/app/environments/environment.development.ts
export const environment = {
  production: false,
  apiURL: 'http://localhost:3000', // or your backend URL
};
```

> The `/src/app/environments/` folder is **gitignored** (see `.gitignore`) — you must create it locally before running the app. Services consume `${environment.apiURL}` to build endpoints such as `/auth/*`, `/ecommerce/products`, `/ecommerce/cart`, `/ecommerce/orders`, etc.

---

## 🗄️ State Management

NgRx is wired in `app.config.ts` with the following feature slices:

| Slice key | Reducer | Purpose |
|-----------|---------|---------|
| `RegisterReducer` | `registerReducer` | Registration flow state |
| `LoginReducer` | `loginReducer` | Authenticated user + JWT |
| `GetAllProductsReducer` | `getProductReducer` | Storefront product catalog |
| `CartReducer` | `cartReducer` | Shopping cart items |
| `DashboardReducer` | `dashboardReducer` | Admin dashboard data (products / orders / users) |

**Effects** handle side-effects such as login, register, logout, session restore, product fetching, and full cart lifecycle (add / update / bulk-update / remove / bulk-remove / clear).

Redux DevTools is enabled in development via `provideStoreDevtools`.

---

## 🔒 Authentication Flow

1. **Login / Signup** — `AuthServices.loginService` / `registerService` post credentials to `/auth/login` and `/auth/signup`.
2. **Token storage** — successful auth payload is persisted to `localStorage` under the key `marketManduAuth`.
3. **Request signing** — every outbound HTTP request goes through `authInterceptor`, which:
   - Sets `withCredentials: true` (for the httpOnly refresh cookie)
   - Attaches `x-access-token: <jwt>` to all non-refresh endpoints
4. **Automatic refresh** — on `401`, the interceptor calls `POST /auth/refresh-token`, dispatches `restoreSessionAction`, updates the stored JWT, and **retries the original request**. Concurrent requests queue on a `BehaviorSubject` until the new token is available.
5. **Guards** — `authGuard` blocks unauthenticated access; `adminGuard` additionally checks `role === 'admin'` from store or localStorage.
6. **Session expiry** — refresh failure clears storage, shows a toast, and redirects to `/login`.

---

## 🐳 Docker Deployment

A production-ready multi-stage `Dockerfile` is included.

### Build the image

```bash
docker build -t marketmandu-frontend .
```

### Run the container

```bash
docker run -d -p 8080:80 --name marketmandu marketmandu-frontend
# → http://localhost:8080
```

**What it does:**

1. **Stage 1 — build** (`node:22-alpine`) — installs dependencies with `--legacy-peer-deps` and runs `npm run build`.
2. **Stage 2 — serve** (`nginx:alpine`) — copies `dist/ecommerce/browser` into `/usr/share/nginx/html` and uses a SPA-aware `nginx.conf` (`try_files $uri $uri/ /index.html;`) so client-side routes resolve correctly on refresh.

---

## 📐 Coding Conventions

- **Standalone components only** — no `NgModule`s; dependencies declared in the component's `imports` array.
- **Signals-first** — prefer `signal()` / `computed()` over manual subscriptions where practical.
- **Control flow** — use Angular's `@if`, `@for`, `@switch` blocks.
- **Strict TS** — `strict`, `noImplicitReturns`, `noPropertyAccessFromIndexSignature`, `strictTemplates` are all on. Avoid `any`.
- **Formatting** — Prettier is configured in `package.json` (`printWidth: 100`, single quotes, Angular HTML parser).
- **Folder naming** — features under `admin/`, `auth/`, `custumer/`; shared UI under `shared/`; cross-cutting under `core/`; state under `store/`.
- **Lazy loading** — every route uses `loadComponent()`.

---

## 🤝 Contributing

1. Fork the repository and create a feature branch: `git checkout -b feat/my-feature`
2. Commit using conventional messages (e.g. `feat:`, `fix:`, `chore:`)
3. Run `npm test` and ensure `npm run build` succeeds before opening a PR
4. Open a Pull Request describing the change, screenshots for UI work are appreciated

---

## 📄 License

This project is currently **private** (see `"private": true` in `package.json`). Add a license file (e.g. `MIT`) before any public release.

---

<div align="center">

Made with ❤️ using **Angular 21**, **NgRx**, **TailwindCSS**, and **PrimeNG**.

</div>
