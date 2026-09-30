# 🛋️ Aura Furniture

> A modern furniture e-commerce frontend built with Next.js, designed to provide a beautiful, responsive, and user-friendly online furniture shopping experience.

<div align="center">

![Aura Furniture](https://img.shields.io/badge/Aura-Furniture-8B5E3C?style=for-the-badge)

![GitHub last commit](https://img.shields.io/github/last-commit/Arcanum-Living/Aura-Furniture-shop)
![GitHub repo size](https://img.shields.io/github/repo-size/Arcanum-Living/Aura-Furniture-shop)

</div>

---

## ✨ Overview

**Aura Furniture** is a modern furniture e-commerce frontend developed as an individual software development project.

The goal of the project is to create a visually appealing and intuitive digital furniture store where customers can explore furniture products, view product details, manage their shopping cart and wishlist, and enjoy a smooth online shopping experience. It also includes a demo admin dashboard.

> **Frontend only.** Aura has no backend, database or real authentication yet. See [What is simulated](#-what-is-simulated) below.

### Project Highlights

* 🎨 Editorial, brand-driven UI with a shared motion system
* 🛋️ Product catalog with search, filters, sorting, and grid/list views
* 👀 Product quick view and full product detail pages
* 🛒 Cart drawer and cart page with free-shipping progress
* ❤️ Wishlist
* 📰 Design journal, collections, and studio content pages
* 🧑‍💼 Demo admin dashboard (products, orders, inventory, customers, and more)
* ♿ Respects the system "reduce motion" setting

---

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square\&logo=nextdotjs\&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square\&logo=react\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square\&logo=typescript\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square\&logo=tailwindcss\&logoColor=white)

| Area | Technology |
| --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack) |
| UI library | **React 19** |
| Language | **TypeScript 5** (`strict` mode) |
| Styling | **Tailwind CSS v4** |
| Animation | **Motion** (`motion/react`) with shared tokens in `src/components/motion` |
| Icons | **Lucide React** |
| Charts (admin) | **Recharts** |
| Utilities | `clsx` + `tailwind-merge` (`cn` helper) |
| Linting | ESLint 9 with `eslint-config-next` |
| Tests | Node's built-in test runner (`node:test`), compiled with the project's TypeScript |

### Development Tools

* Git & GitHub (pull-request workflow)
* GitHub Actions CI: lint, typecheck, tests and build on every pull request
* VS Code
* `.editorconfig` (UTF-8, LF, 2-space indentation)

---

## 🚀 Features

### 🏠 Home Page

* Split hero section
* Brand philosophy, curated spaces, and featured products
* Bespoke interior design and materials sections
* Journal preview and newsletter sign-up

### 🛋️ Product Catalog (`/shop`)

* Search, category, price, material, and stock filters
* Sorting and grid/list views
* Mobile filter drawer

### 📦 Product Details (`/shop/[slug]`)

* Image gallery, colour finishes, and quantity selection
* Materials, dimensions, and care information
* Reviews and related products
* Unknown products show the 404 page

### 🛒 Shopping Cart

* Cart drawer and full cart page
* Each product-and-colour combination is its own cart line
* Quantity updates, removal, and totals
* Saved in the browser between visits

### ❤️ Wishlist

* Save products from any product card or page
* "Move to Bag" moves an item into the cart

### 📰 Content

* Collections and collection pages
* Design journal and articles
* About, Craft, Interior Design, Contact, FAQ, Care Guide, Shipping & Returns, Privacy, and Terms pages

### 🧑‍💼 Admin Dashboard (`/admin`, demo)

* Dashboard with charts
* Products (create, edit, duplicate, delete), categories, collections, and inventory
* Orders, customers, reviews, messages, newsletter, journal, and settings
* Light and dark themes

---

## 🎭 What Is Simulated

Aura runs entirely in the browser. These features look real but are **mock implementations**:

| Feature | How it works today |
| --- | --- |
| Product, category, and article data | Static TypeScript arrays in `src/data` |
| Cart, wishlist, and sign-in | Saved in your browser's `localStorage` |
| Sign-in and registration | Any email and password (6+ characters) is accepted. No account is created |
| Checkout | "Proceed to Checkout" shows a confirmation after a short delay. No order or payment is made |
| Newsletter, enquiry, and password reset forms | Show a success message only. Nothing is sent |
| Admin dashboard | Uses its own mock data, saved in `localStorage`. It is not password-protected, and its changes do not affect the storefront |

---

## 📂 Project Structure

```text
Aura-Furniture-shop/
├── .github/workflows/ci.yml    # lint, typecheck, test, build
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (fonts, providers)
│   │   ├── not-found.tsx       # 404 page
│   │   ├── globals.css         # Tailwind v4 + design tokens
│   │   ├── (site)/             # Storefront: home, shop, collections, cart,
│   │   │                       #   wishlist, journal, content pages
│   │   ├── (auth)/             # Login and signup
│   │   └── (admin)/admin/      # Demo admin dashboard
│   ├── components/
│   │   ├── admin/              # Admin sidebar, header, charts, widgets
│   │   ├── auth/               # Login / signup form
│   │   ├── cart/               # Cart drawer
│   │   ├── content/            # Shared layout for text pages
│   │   ├── layout/             # Navbar, mobile menu, footer
│   │   ├── motion/             # Animation primitives and tokens
│   │   ├── shop/               # Product card, quick view, search overlay
│   │   └── ui/                 # Toast, spinner
│   ├── context/
│   │   ├── ShopContext.tsx     # Cart, wishlist, demo user, overlays, toasts
│   │   └── AdminContext.tsx    # Admin UI state and mock data
│   ├── data/                   # Mock products, categories, articles, admin data
│   ├── lib/
│   │   ├── cart.ts             # Pure cart logic (tested)
│   │   ├── persistedStore.ts   # Hydration-safe localStorage store (tested)
│   │   └── utils.ts            # cn() helper
│   └── types.ts                # Domain types
├── tests/                      # node:test suites
├── FRONTEND_AUDIT.md           # Technical audit and roadmap
├── eslint.config.mjs
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/Arcanum-Living/Aura-Furniture-shop.git
cd Aura-Furniture-shop
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |
| `npm test` | Compile and run the test suites in `tests/` |

---

## 🌿 Git Workflow

Aura Furniture follows a feature-based Git workflow.

### Main Branches

```text
main   # stable version of the application
dev    # integration branch
```

### Feature Branches

```text
feat/navbar
feat/product-catalog
feat/admin
```

### Bug Fix Branches

```text
fix/mobile-menu
fix/cart-total
```

### Workflow

```text
                    main
                      ▲
                      │
                 Pull Request
                      │
                     dev
                      ▲
        ┌─────────────┼─────────────┐
        │             │             │
    feat/navbar   feat/catalog   feat/cart
```

---

## 💻 Development Workflow

Create a new feature from the latest `dev`:

```bash
git checkout dev
git pull origin dev
git checkout -b feat/your-feature
```

After completing the feature:

```bash
npm run lint && npm run typecheck && npm test && npm run build
git add .
git commit -m "feat: add your feature"
git push -u origin feat/your-feature
```

Then open a Pull Request into `dev`. CI runs lint, typecheck, tests and the production build automatically.

---

## 🧪 Code Quality

* TypeScript `strict` mode
* ESLint (`eslint-config-next`, core web vitals + TypeScript rules)
* Unit tests for cart logic and persisted storage
* Regression tests that every internal link has a page and that source files contain no encoding corruption
* CI on every pull request

---

## 🔮 Roadmap

The full audit and prioritised roadmap are in [`FRONTEND_AUDIT.md`](FRONTEND_AUDIT.md).

* [x] Milestone 1: correctness fixes (cart, encoding, broken links, 404s)
* [ ] Milestone 2: accessibility and touch/responsive fixes
* [ ] Milestone 3: state architecture and Server Components
* [ ] Milestone 4: design system, forms (React Hook Form + Zod), and checkout UI
* [ ] Milestone 5: API-ready data layer
* [ ] Backend API, database, and real authentication
* [ ] Online payments and order tracking
* [ ] Role-protected admin connected to the real catalog

---

## 📸 Screenshots

Screenshots will be added as the UI development progresses.

---

## 🌐 Live Demo

🚧 **Coming Soon**

---

## 👩‍💻 Author

### Raveesha Nethsarani

Full Stack Developer passionate about building modern, scalable, and user-friendly web applications.

* GitHub: [@raveeshaNethsarani](https://github.com/raveeshaNethsarani)
* Repository: [Aura Furniture](https://github.com/Arcanum-Living/Aura-Furniture-shop)

---

## 📄 License

This project is developed as an individual project for educational and portfolio purposes.

---

<div align="center">

### 🛋️ Aura Furniture

**Designed with passion. Built with code.**

⭐ If you find this project interesting, consider giving it a star!

</div>
