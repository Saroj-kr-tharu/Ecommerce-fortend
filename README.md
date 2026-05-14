<div align="center">

# 🛒 MarketMandu — E-commerce Frontend

### _A modern, cloud-native Angular 21 e-commerce platform with a customer storefront, full admin suite, multi-gateway payments, and production-grade CI/CD._

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NgRx](https://img.shields.io/badge/NgRx-19-764ABC?logo=redux&logoColor=white)](https://ngrx.io)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![PrimeNG](https://img.shields.io/badge/PrimeNG-21-007ACC)](https://primeng.org)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-deployed-326CE5?logo=kubernetes&logoColor=white)](https://kubernetes.io)
[![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-D24939?logo=jenkins&logoColor=white)](https://www.jenkins.io/)
[![Nginx](https://img.shields.io/badge/Nginx-alpine-009639?logo=nginx&logoColor=white)](https://nginx.org/)

<img src="Images/figma/overview.png" alt="MarketMandu — Platform Overview" width="90%" />

<sub><i>Figure 1 — End-to-end overview of the MarketMandu platform: frontend, backend, infrastructure, and integrations.</i></sub>

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Application Routes](#-application-routes)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [State Management](#-state-management)
- [Authentication & Security](#-authentication--security)
- [Payment Integrations](#-payment-integrations)
- [Docker Deployment](#-docker-deployment)
- [Kubernetes Deployment](#-kubernetes-deployment)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Coding Conventions](#-coding-conventions)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔎 Overview

**MarketMandu** is the frontend application for a modern, cloud-native e-commerce platform. It delivers a seamless shopping experience for end-users and a powerful administration suite for store managers. Built on the latest Angular (standalone components + signals) with a predictable NgRx-backed state layer, the application ships with:

- ⚡ **Fast, reactive UI** powered by Angular 21 signals and the new `@angular/build` esbuild pipeline
- 🧩 **Modular architecture** with strict separation between `core`, `shared`, `store`, and feature modules (`admin`, `auth`, `custumer`)
- 💳 **Multi-gateway payments** — eSewa, Khalti, and Stripe
- ☸️ **Production-ready deployment** — Docker multi-stage build, Nginx SPA hosting, Kubernetes manifests with HPA autoscaling
- 🔒 **Automated security scanning** in CI via Trivy and OWASP Dependency-Check

---

## ✨ Key Features

### 🛍️ Customer Storefront
- **Product discovery** — rich home page with carousels, category browsing, and responsive product grids
- **Powerful search** — server-side search with sorting and pagination
- **Product details** — detailed views with imagery, stock, pricing, and add-to-cart actions
- **Shopping cart** — add / remove / bulk update / clear, persisted via NgRx effects
- **Checkout & orders** — secure checkout flow, order placement, order history, and post-order confirmation
- **Authentication** — signup, login, JWT access token with automatic refresh-token rotation
- **Email notifications** — transactional emails for account activity, orders, and payments

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
- Custom currency pipe (`Rs.`) and `is-mobile-view` directive

---

## 📸 Screenshots

### 🏠 Storefront / Home

<table>
  <tr>
    <td width="50%"><img src="Images/home1.jpg" alt="Home page — hero" /></td>
    <td width="50%"><img src="Images/home2.jpg" alt="Home page — categories" /></td>
  </tr>
  <tr>
    <td><img src="Images/home3.jpg" alt="Home page — featured" /></td>
    <td><img src="Images/home4.jpg" alt="Home page — carousel" /></td>
  </tr>
  <tr>
    <td><img src="Images/home5.jpg" alt="Home page — products" /></td>
    <td><img src="Images/home6.jpg" alt="Home page — trending" /></td>
  </tr>
  <tr>
    <td><img src="Images/home7.jpg" alt="Home page — footer" /></td>
    <td><img src="Images/home8.jpg" alt="Home page — mobile" /></td>
  </tr>
</table>

### 🎯 Promotional Banners

<table>
  <tr>
    <td width="25%"><img src="Images/banner1.jpg" alt="Banner 1" /></td>
    <td width="25%"><img src="Images/banner2.jpg" alt="Banner 2" /></td>
    <td width="25%"><img src="Images/banner3.jpg" alt="Banner 3" /></td>
    <td width="25%"><img src="Images/banner4.jpg" alt="Banner 4" /></td>
  </tr>
</table>

### 🛒 Product Catalog & Details

<table>
  <tr>
    <td width="50%"><img src="Images/product1.jpg" alt="Product list" /></td>
    <td width="50%"><img src="Images/product2.jpg" alt="Product details" /></td>
  </tr>
  <tr>
    <td><img src="Images/product3.jpg" alt="Product gallery" /></td>
    <td><img src="Images/product4.jpg" alt="Product pricing" /></td>
  </tr>
  <tr>
    <td><img src="Images/product5.jpg" alt="Product reviews" /></td>
    <td><img src="Images/product6.jpg" alt="Product recommendations" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img src="Images/product7.jpg" alt="Product search results" width="60%" /></td>
  </tr>
</table>

### 🔐 Authentication

<table>
  <tr>
    <td width="50%"><img src="Images/login1.jpg" alt="Login form" /></td>
    <td width="50%"><img src="Images/login2.jpg" alt="Login validation" /></td>
  </tr>
  <tr>
    <td><img src="Images/register1.jpg" alt="Register form" /></td>
    <td><img src="Images/register2.jpg" alt="Register success" /></td>
  </tr>
</table>

### 🧺 Shopping Cart

<table>
  <tr>
    <td width="50%"><img src="Images/cart1.jpg" alt="Cart — items" /></td>
    <td width="50%"><img src="Images/cart2.jpg" alt="Cart — quantity update" /></td>
  </tr>
  <tr>
    <td><img src="Images/cart3.jpg" alt="Cart — summary" /></td>
    <td><img src="Images/cart4.jpg" alt="Cart — empty state" /></td>
  </tr>
</table>

### 💳 Checkout & Order Success

<table>
  <tr>
    <td width="50%"><img src="Images/checkout1.jpg" alt="Checkout — address" /></td>
    <td width="50%"><img src="Images/checkout2.jpg" alt="Checkout — payment" /></td>
  </tr>
  <tr>
    <td><img src="Images/checkout3.jpg" alt="Checkout — review" /></td>
    <td><img src="Images/ordersucess1.jpg" alt="Order success" /></td>
  </tr>
</table>

### 📦 Customer Orders

<table>
  <tr>
    <td width="50%"><img src="Images/order1.jpg" alt="My orders list" /></td>
    <td width="50%"><img src="Images/order2.jpg" alt="Order detail" /></td>
  </tr>
  <tr>
    <td><img src="Images/order3.jpg" alt="Order timeline" /></td>
    <td><img src="Images/order4.jpg" alt="Order items" /></td>
  </tr>
  <tr>
    <td><img src="Images/order5.jpg" alt="Order status" /></td>
    <td><img src="Images/order6.jpg" alt="Order invoice" /></td>
  </tr>
</table>

### 🧑‍💼 Admin Dashboard

<table>
  <tr>
    <td width="50%"><img src="Images/admin1.jpg" alt="Admin — dashboard KPIs" /></td>
    <td width="50%"><img src="Images/admin2.jpg" alt="Admin — charts" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img src="Images/admin3.jpg" alt="Admin — products management" width="75%" /></td>
  </tr>
</table>

### 👥 User Management (Admin)

<table>
  <tr>
    <td width="50%"><img src="Images/user1.jpg" alt="Users list" /></td>
    <td width="50%"><img src="Images/user2.jpg" alt="User detail" /></td>
  </tr>
  <tr>
    <td><img src="Images/user3.jpg" alt="User orders" /></td>
    <td><img src="Images/user4.jpg" alt="User bulk actions" /></td>
  </tr>
  <tr>
    <td><img src="Images/user5.jpg" alt="User roles" /></td>
    <td><img src="Images/user6.jpg" alt="User filters" /></td>
  </tr>
</table>

### 🗂️ Admin — Orders Drill-down

<table>
  <tr>
    <td width="50%"><img src="Images/order7.jpg" alt="Admin orders table" /></td>
    <td width="50%"><img src="Images/order8.jpg" alt="Admin order drill-down" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img src="Images/order9.jpg" alt="Admin order timeline" width="75%" /></td>
  </tr>
</table>

### 💰 Payment Gateways

<table>
  <tr>
    <td width="33%" align="center"><strong>eSewa</strong><br/><img src="Images/esewa1.jpg" alt="eSewa payment" /></td>
    <td width="33%" align="center"><strong>Khalti</strong><br/><img src="Images/khalti1.jpg" alt="Khalti payment" /></td>
    <td width="33%" align="center"><strong>Stripe</strong><br/><img src="Images/stripe1.jpg" alt="Stripe payment" /></td>
  </tr>
  <tr>
    <td><img src="Images/khalti2.jpg" alt="Khalti flow 2" /></td>
    <td><img src="Images/khalti3.jpg" alt="Khalti flow 3" /></td>
    <td><img src="Images/khalti4.jpg" alt="Khalti flow 4" /></td>
  </tr>
  <tr>
    <td><img src="Images/stripe2.jpg" alt="Stripe flow 2" /></td>
    <td><img src="Images/stripe3.jpg" alt="Stripe flow 3" /></td>
    <td><img src="Images/stripe4.jpg" alt="Stripe flow 4" /></td>
  </tr>
</table>

### 📧 Transactional Email Notifications

<table>
  <tr>
    <td width="50%"><img src="Images/email1.jpg" alt="Welcome email" /></td>
    <td width="50%"><img src="Images/email2.jpg" alt="Order confirmation email" /></td>
  </tr>
  <tr>
    <td><img src="Images/email3.jpg" alt="Payment receipt email" /></td>
    <td><img src="Images/email4.jpg" alt="Shipping email" /></td>
  </tr>
  <tr>
    <td><img src="Images/email5.jpg" alt="Delivery email" /></td>
    <td><img src="Images/email6.jpg" alt="Promotional email" /></td>
  </tr>
</table>

### ☁️ Cloud Infrastructure (AWS S3 + CloudFront)

<table>
  <tr>
    <td width="33%" align="center"><strong>S3 Storage</strong><br/><img src="Images/s31.jpg" alt="S3 bucket" /></td>
    <td width="33%" align="center"><strong>CloudFront CDN</strong><br/><img src="Images/cdn1.jpg" alt="CloudFront" /></td>
    <td width="33%" align="center"><strong>CDN Edge</strong><br/><img src="Images/cdn2.jpg" alt="CloudFront edge" /></td>
  </tr>
</table>

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
| **Payments** | eSewa, Khalti, Stripe |
| **Testing** | Vitest `4` + `jsdom` |
| **Build / Serve** | `@angular/build` (esbuild-based application builder) |
| **Containerization** | Docker multi-stage build → Nginx `alpine` |
| **Orchestration** | Kubernetes (Deployment, Service, HPA) |
| **CI/CD** | Jenkins + Trivy + OWASP Dependency-Check |
| **Asset Delivery** | AWS S3 + CloudFront (CDN) |

---

## 🏗️ Architecture

MarketMandu follows a **cloud-native, microservices-friendly architecture** with a clear separation between the presentation tier (this repository), backend services, data stores, and third-party integrations. The frontend is a stateless Angular SPA served by Nginx, deployed as a horizontally-scaled Kubernetes Deployment behind an Ingress, with assets accelerated through AWS CloudFront.

<div align="center">
  <img src="Images/figma/architecture.png" alt="MarketMandu architecture diagram" width="92%" />
  <br/>
  <sub><i>Figure 2 — Application architecture: clients → Ingress → Nginx + Angular pods (HPA) → Backend API → Database / S3+CloudFront / payment gateways.</i></sub>
</div>

### Reference flow (text view)

```
                              ┌──────────────────────────┐
                              │        End Users         │
                              └────────────┬─────────────┘
                                           │ HTTPS
                                           ▼
                              ┌──────────────────────────┐
                              │    Ingress / LB (K8s)    │
                              └────────────┬─────────────┘
                                           │
                      ┌────────────────────┴────────────────────┐
                      ▼                                         ▼
        ┌──────────────────────────┐            ┌──────────────────────────┐
        │   fortend-dep (Pod)      │   ◄────►   │   fortend-dep (Pod)      │
        │   Nginx + Angular SPA    │   HPA      │   Nginx + Angular SPA    │
        │   (min: 2, max: 3)       │            │                          │
        └────────────┬─────────────┘            └────────────┬─────────────┘
                     │                                       │
                     └───────────────────┬───────────────────┘
                                         │ REST / JWT
                                         ▼
                              ┌──────────────────────────┐
                              │     Backend API          │
                              │  /auth  /ecommerce  ...  │
                              └────────────┬─────────────┘
                                           │
                 ┌─────────────────────────┼─────────────────────────┐
                 ▼                         ▼                         ▼
         ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
         │   Database   │          │  AWS S3 +    │          │   Payment    │
         │              │          │  CloudFront  │          │  Gateways    │
         └──────────────┘          └──────────────┘          └──────────────┘
                                                              eSewa / Khalti
                                                                  Stripe
```

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
│   │   │       ├── orders/            # My orders
│   │   │       ├── orderdetails/      # Order detail
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
├── K8s/                           # Kubernetes manifests
│   ├── 01_fortend-deployment.yml      # Deployment (2 replicas, resource limits)
│   ├── 02_fortend-service.yml         # ClusterIP Service on :80
│   └── 03_fortend-hpa.yml             # Horizontal Pod Autoscaler (CPU 30%)
│
├── Images/                        # README screenshots & marketing assets
├── Dockerfile                     # Multi-stage: node:22-alpine → nginx:alpine
├── Jenkinsfile                    # CI/CD pipeline (scan → build → push → deploy)
├── nginx.conf                     # SPA-friendly fallback to index.html
├── set-env.js                     # Generates src/app/environments at build time
├── security_report_generator.py   # Aggregates Trivy + OWASP reports to PDF
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
| `/Orders/:id` | `Orders` | `authGuard` | Customer orders list |
| `/Ordersdetail/:id` | `Orderdetails` | `authGuard` | Customer order detail |
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
- A running backend API that exposes the endpoints consumed by `AuthServices`, `CusServices`, and `AdminService`

### Install

```bash
git clone https://github.com/Saroj-kr-tharu/Ecommerce-fortend.git
cd Ecommerce-fortend
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

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Generate `environments/` and start the Angular dev server on port `4200` |
| `npm run build` | Production build (optimized, hashed, budgets enforced) |
| `npm run watch` | Development build with file watcher |
| `npm test` | Run unit tests via `@angular/build:unit-test` (Vitest + jsdom) |
| `npm run set-env` | Run `set-env.js` to regenerate environment files from env vars |
| `npm run ng <cmd>` | Passthrough to the Angular CLI |

**Production budgets** (see `angular.json`):
- Initial bundle: warn `500 kB` / error `1 MB`
- Any component style: warn `4 kB` / error `8 kB`

---

## 🔐 Environment Configuration

Environment files are **generated at build-time** by `set-env.js` from environment variables, then written to `src/app/environments/`. The folder itself is `.gitignore`d so secrets never land in the repo.

The following variables are consumed by `set-env.js` and the `Dockerfile`:

| Variable | Purpose |
|----------|---------|
| `apiURL` | Base URL of the backend REST API (e.g. `http://localhost:3000`) |
| `PAYMENT_BACKEND_URL` | Payments microservice URL |
| `esewa_url` | eSewa endpoint for redirect-based checkout |
| `esewa_secret` | eSewa merchant secret key |
| `CLOUDFRONT_DOMAIN` | CDN domain used to resolve product imagery |

**Local development:** export these in your shell (or a `.env` loader) **before** running `npm start`, or create `src/app/environments/environment.development.ts` manually:

```ts
export const environment = {
  production: false,
  apiURL: 'http://localhost:3000',
  PAYMENT_BACKEND_URL: 'http://localhost:4000',
  esewa_url: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
  esewa_secret: '<your-esewa-uat-secret>', // public UAT/sandbox key for local dev only
  CLOUDFRONT_DOMAIN: 'https://<your-distribution>.cloudfront.net',
};
```

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

## 🔒 Authentication & Security

1. **Login / Signup** — `AuthServices.loginService` / `registerService` post credentials to `/auth/login` and `/auth/signup`.
2. **Token storage** — successful auth payload is persisted to `localStorage` under the key `marketManduAuth`.
3. **Request signing** — every outbound HTTP request goes through `authInterceptor`, which:
   - Sets `withCredentials: true` (for the httpOnly refresh cookie)
   - Attaches `x-access-token: <jwt>` to all non-refresh endpoints
4. **Automatic refresh** — on `401`, the interceptor calls `POST /auth/refresh-token`, dispatches `restoreSessionAction`, updates the stored JWT, and **retries the original request**. Concurrent requests queue on a `BehaviorSubject` until the new token is available.
5. **Guards** — `authGuard` blocks unauthenticated access; `adminGuard` additionally checks `role === 'admin'` from store or localStorage.
6. **Session expiry** — refresh failure clears storage, shows a toast, and redirects to `/login`.

### 🛡️ Supply-Chain & Image Hardening

- **OWASP Dependency-Check** — runs in Jenkins with the project's NVD API key; publishes XML report.
- **Trivy** — both filesystem (`trivy fs`) and image (`trivy image`) scans run in CI with JSON reports.
- **Consolidated PDF report** — `security_report_generator.py` aggregates all scanner outputs into a single PDF that is emailed to stakeholders on every build.
- **Minimal runtime image** — final runtime is `nginx:alpine` with `apk upgrade` applied.

---

## 💳 Payment Integrations

MarketMandu ships with three payment gateways wired through `PaymentService`:

| Gateway | Region | Flow |
|---------|--------|------|
| **eSewa** | 🇳🇵 Nepal | HMAC-signed redirect form (`esewa_url`, `esewa_secret`) |
| **Khalti** | 🇳🇵 Nepal | API-initiated redirect with verification callback |
| **Stripe** | 🌍 International | Checkout Session via backend |

All gateways redirect back to `/ordersuccess` on success and dispatch order-finalization effects.

---

## 🐳 Docker Deployment

A production-ready multi-stage `Dockerfile` is included.

### Build the image

```bash
docker build \
  --build-arg apiURL="http://api.marketmandu.local" \
  --build-arg PAYMENT_BACKEND_URL="http://payments.marketmandu.local" \
  --build-arg esewa_url="https://rc-epay.esewa.com.np/api/epay/main/v2/form" \
  --build-arg esewa_secret="<your-secret>" \
  --build-arg CLOUDFRONT_DOMAIN="https://<dist>.cloudfront.net" \
  -t marketmandu-fortend:latest .
```

### Run the container

```bash
docker run -d -p 8080:80 --name marketmandu marketmandu-fortend:latest
# → http://localhost:8080
```

**What it does:**

1. **Stage 1 — build** (`node:22-alpine`) — installs dependencies with `--legacy-peer-deps`, runs `node set-env.js` to inject environment variables, and runs `npm run build`.
2. **Stage 2 — serve** (`nginx:alpine`) — copies `dist/ecommerce/browser` into `/usr/share/nginx/html` and uses a SPA-aware `nginx.conf` (`try_files $uri $uri/ /index.html;`) so client-side routes resolve correctly on refresh.

---

## ☸️ Kubernetes Deployment

Production manifests are in [`K8s/`](./K8s). All resources are deployed to the **`marketmandu-ns`** namespace.

### Resources

| File | Kind | Purpose |
|------|------|---------|
| [`01_fortend-deployment.yml`](./K8s/01_fortend-deployment.yml) | `Deployment` | 2 replicas of the Nginx+Angular container, rolling updates |
| [`02_fortend-service.yml`](./K8s/02_fortend-service.yml) | `Service` | ClusterIP service exposing port `80` |
| [`03_fortend-hpa.yml`](./K8s/03_fortend-hpa.yml) | `HorizontalPodAutoscaler` | Scales 2 → 3 replicas at 30% CPU utilization |

### Deployment topology

```yaml
# Deployment
replicas: 2
image: sarojdockerworkspace/marketmandu-fortend:latest
imagePullPolicy: Always
resources:
  requests: { memory: 150Mi, cpu: 100m }
  limits:   { memory: 300Mi, cpu: 250m }
ports:
  - containerPort: 80
```

```yaml
# HPA
minReplicas: 2
maxReplicas: 3
metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 30
behavior:
  scaleDown:
    stabilizationWindowSeconds: 30
    policies:
      - type: Percent
        value: 1
        periodSeconds: 15
```

### Apply to a cluster

```bash
# 1. Create the namespace (once)
kubectl create namespace marketmandu-ns

# 2. Apply all manifests in order
kubectl apply -f K8s/

# 3. Verify
kubectl get all -n marketmandu-ns
kubectl get hpa -n marketmandu-ns

# 4. Trigger a rolling restart after pushing a new image tag
kubectl rollout restart deployment/fortend-dep -n marketmandu-ns
kubectl rollout status  deployment/fortend-dep -n marketmandu-ns

# 5. Port-forward for local testing (no Ingress required)
kubectl port-forward -n marketmandu-ns svc/fortend-svc 8080:80
# → http://localhost:8080
```

> 💡 The `Service` is `ClusterIP` by design — expose it publicly via an `Ingress` controller (e.g. NGINX Ingress, Traefik) or a `LoadBalancer` override suitable for your cloud.

### 🗺️ Kubernetes Topology

<div align="center">
  <img src="Images/figma/k8s%20deployemnt.png" alt="Kubernetes deployment topology" width="92%" />
  <br/>
  <sub><i>Figure 3 — Cluster topology: Ingress → Service → Deployment (replicas) with HPA, namespaced under <code>marketmandu-ns</code>.</i></sub>
</div>

### 📸 Cluster Snapshots

<table>
  <tr>
    <td width="50%" align="center"><strong>Cluster (kind)</strong><br/><img src="Images/kind%201%20.jpg" alt="kind cluster bootstrap" /></td>
    <td width="50%" align="center"><strong>Pods & Workloads</strong><br/><img src="Images/kube1.jpg" alt="kubectl get all" /></td>
  </tr>
  <tr>
    <td align="center"><strong>Services</strong><br/><img src="Images/kube%202%20.jpg" alt="Services view" /></td>
    <td align="center"><strong>Deployments</strong><br/><img src="Images/kube%203%20.jpg" alt="Deployments view" /></td>
  </tr>
  <tr>
    <td align="center"><strong>Horizontal Pod Autoscaler</strong><br/><img src="Images/hpa%201%20.jpg" alt="HPA in action" /></td>
    <td align="center"><strong>Ingress</strong><br/><img src="Images/ingress%201%20.jpg" alt="Ingress resource" /></td>
  </tr>
  <tr>
    <td align="center"><strong>Persistent Volume Claim</strong><br/><img src="Images/pvc%201%20.jpg" alt="PVC" /></td>
    <td align="center"><strong>Live Application</strong><br/><img src="Images/live%201%20.jpg" alt="Live application running on cluster" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img src="Images/live%202%20.jpg" alt="Live application — secondary view" width="75%" /></td>
  </tr>
</table>

<div align="center">
  <img src="Images/figma/LIVE.png" alt="Live deployment topology" width="85%" />
  <br/>
  <sub><i>Figure 4 — Live deployment view of MarketMandu running in the cluster.</i></sub>
</div>

---

## 🔁 CI/CD Pipeline

Defined in [`Jenkinsfile`](./Jenkinsfile) and triggered on pushes to `main`. The pipeline performs supply-chain scanning, builds and pushes a hardened container image, rolls out the new version to Kubernetes, and emails a consolidated security report to stakeholders.

<div align="center">
  <img src="Images/figma/cicd%20architecture.png" alt="CI/CD pipeline architecture" width="92%" />
  <br/>
  <sub><i>Figure 5 — CI/CD architecture: GitHub → Jenkins → OWASP/Trivy scans → Docker Hub → Kubernetes rollout → Email notification.</i></sub>
</div>

<div align="center">
  <img src="Images/figma/jenkins.png" alt="Jenkins pipeline stages" width="92%" />
  <br/>
  <sub><i>Figure 6 — Jenkins declarative pipeline stages.</i></sub>
</div>

| # | Stage | What happens |
|---|-------|--------------|
| 1 | **Cleanup Workspace** | `cleanWs()` to ensure a pristine build agent |
| 2 | **Clone Code** | Pulls the `main` branch of the repository |
| 3 | **OWASP Dependency Check** | Scans dependencies against NVD (API key from Jenkins credentials), publishes XML |
| 4 | **Trivy FS Scan** | Filesystem vulnerability scan → `trivy-report/trivy-fs-report.json` |
| 5 | **Docker Image Build** | Multi-stage image with all `--build-arg`s sourced from Jenkins credentials |
| 6 | **Trivy Image Scan** | Scans the built container image for CVEs |
| 7 | **Push to Docker Hub** | `docker login` + `docker push <user>/marketmandu-fortend:latest` |
| 8 | **K8s Deployment / Pod Restart** | Rolls out the new image on the target cluster |
| 9 | **Generate Security Report** | `security_report_generator.py` → consolidated PDF |
| 10 | **Email Notification** | HTML email via `emailext` on both **success** ✅ and **failure** ❌ with the PDF attached |

**Secrets used (Jenkins credentials):** `dockerHubCreds`, `NVD_API_KEY`, `apiURL`, `PAYMENT_BACKEND_URL`, `esewa_url`, `esewa_secret`, `CLOUDFRONT_DOMAIN`.

### 🧪 Pipeline Run Snapshots

<table>
  <tr>
    <td width="50%"><img src="Images/jenkins%201.jpg" alt="Jenkins — pipeline overview" /></td>
    <td width="50%"><img src="Images/jenkins%202%20.jpg" alt="Jenkins — stage view" /></td>
  </tr>
  <tr>
    <td><img src="Images/jenkins%203%20.jpg" alt="Jenkins — checkout stage" /></td>
    <td><img src="Images/jenkins%204%20.jpg" alt="Jenkins — OWASP Dependency-Check" /></td>
  </tr>
  <tr>
    <td><img src="Images/jenkins%205.jpg" alt="Jenkins — Trivy filesystem scan" /></td>
    <td><img src="Images/jenkins%206%20.jpg" alt="Jenkins — Docker image build" /></td>
  </tr>
  <tr>
    <td><img src="Images/jenkins%207.jpg" alt="Jenkins — Trivy image scan" /></td>
    <td><img src="Images/jenkins%208.jpg%20.jpg" alt="Jenkins — push to Docker Hub" /></td>
  </tr>
  <tr>
    <td><img src="Images/jenkins%209.jpg" alt="Jenkins — Kubernetes rollout" /></td>
    <td><img src="Images/jenkins%2010.jpg" alt="Jenkins — security report generation" /></td>
  </tr>
  <tr>
    <td><img src="Images/jenkins%2011.jpg" alt="Jenkins — email notification" /></td>
    <td><img src="Images/jenkins%2012.jpg" alt="Jenkins — successful build" /></td>
  </tr>
</table>

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
4. Open a Pull Request describing the change — screenshots for UI work are appreciated

---

## 📄 License

This project is currently **private** (see `"private": true` in `package.json`). Add a license file (e.g. `MIT`) before any public release.

---

<div align="center">

### 👨‍💻 Author

**Saroj Kumar Tharu** &nbsp;•&nbsp; [GitHub](https://github.com/Saroj-kr-tharu)

---

Made with ❤️ using **Angular 21**, **NgRx**, **TailwindCSS**, **PrimeNG**, **Docker**, **Kubernetes**, and **Jenkins**.

</div>
