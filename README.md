# 🛋️ Aura Furniture

> A modern furniture e-commerce web application designed to provide a beautiful, responsive, and user-friendly online furniture shopping experience.

<div align="center">

![Aura Furniture](https://img.shields.io/badge/Aura-Furniture-8B5E3C?style=for-the-badge)

![GitHub last commit](https://img.shields.io/github/last-commit/raveeshaNethsarani/Aura-Furniture)
![GitHub repo size](https://img.shields.io/github/repo-size/raveeshaNethsarani/Aura-Furniture)
![GitHub stars](https://img.shields.io/github/stars/raveeshaNethsarani/Aura-Furniture)
![GitHub forks](https://img.shields.io/github/forks/raveeshaNethsarani/Aura-Furniture)

</div>

---

## ✨ Overview

**Aura Furniture** is a modern furniture e-commerce platform developed as an individual software development project.

The goal of the project is to create a visually appealing and intuitive digital furniture store where customers can explore furniture products, view product details, manage their shopping cart, and enjoy a smooth online shopping experience.

### Project Highlights

* 🎨 Modern and elegant UI/UX
* 📱 Fully responsive design
* 🛋️ Furniture product catalog
* 🔎 Product search and filtering
* 🛒 Shopping cart
* ❤️ Wishlist
* 👀 Product quick view
* 📦 Product details
* ⚡ Smooth animations and interactions
* 🧩 Reusable component architecture

---

## 🎯 Project Goals

* Build a professional furniture e-commerce interface.
* Provide a smooth and intuitive shopping experience.
* Create reusable and maintainable React components.
* Implement responsive layouts.
* Follow modern frontend development practices.
* Build a scalable foundation for future backend integration.

---

## 🛠️ Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square\&logo=react\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square\&logo=typescript\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square\&logo=vite\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square\&logo=tailwindcss\&logoColor=white)

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* React Router
* React Hook Form
* Zod
* Lucide React

### UI / UX

* shadcn/ui
* Tailwind CSS
* Lucide Icons
* Responsive Design
* Component-based architecture
* CSS animations
* Micro-interactions

### Development Tools

![Git](https://img.shields.io/badge/Git-F05032?style=flat-square\&logo=git\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square\&logo=github\&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square\&logo=visualstudiocode\&logoColor=white)

* Git
* GitHub
* VS Code
* ESLint
* Prettier

---

## 🚀 Features

### 🏠 Home Page

* Modern hero section
* Featured furniture collections
* Category navigation
* Promotional sections
* Featured products
* Responsive layout

### 🛋️ Product Catalog

* Product listing
* Product categories
* Search
* Filtering
* Sorting
* Responsive product cards

### 👀 Product Quick View

Users can quickly inspect product information without leaving the product listing page.

### 📦 Product Details

Each product can display:

* Product images
* Product name
* Price
* Description
* Category
* Available options
* Quantity selection
* Add to cart

### 🛒 Shopping Cart

* Add products
* Remove products
* Update quantities
* Calculate totals
* Cart drawer
* Persistent cart state

### ❤️ Wishlist

Users can save their favorite furniture products for later.

### 📱 Responsive Design

The interface is optimized for:

* Desktop
* Laptop
* Tablet
* Mobile

---

## 📂 Project Structure

```text
Aura-Furniture/
├── public/
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── cart/
│   │   ├── layout/
│   │   ├── product/
│   │   └── ui/
│   │
│   ├── context/
│   │   └── ShopContext.tsx
│   │
│   ├── pages/
│   ├── lib/
│   ├── hooks/
│   ├── data/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
│
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone git@github.com:raveeshaNethsarani/Aura-Furniture.git
```

### Navigate to the project

```bash
cd Aura-Furniture
```

### Install dependencies

Using Yarn:

```bash
yarn install
```

Or using npm:

```bash
npm install
```

### Start the development server

Using Yarn:

```bash
yarn dev
```

Or using npm:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🌿 Git Workflow

Aura Furniture follows a feature-based Git workflow.

### Main Branch

```text
main
```

The `main` branch contains the stable version of the application.

### Feature Branches

```text
feat/navbar
feat/product-catalog
feat/product-details
feat/cart
feat/checkout
```

### Bug Fix Branches

```text
fix/mobile-menu
fix/cart-total
fix/product-image
```

### Workflow

```text
                    main
                      ▲
                      │
                 Pull Request
                      │
        ┌─────────────┼─────────────┐
        │             │             │
    feat/navbar   feat/catalog   feat/cart
```

---

## 💻 Development Workflow

Create a new feature from the latest `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature
```

After completing the feature:

```bash
git add .
git commit -m "feat: add your feature"
git push -u origin feat/your-feature
```

Then create a Pull Request:

```text
feat/your-feature → main
```

After testing and review, merge the Pull Request into `main`.

---

## 🧪 Code Quality

The project follows modern development practices including:

* TypeScript
* ESLint
* Prettier
* Reusable components
* Responsive design
* Feature-based Git workflow
* Pull Request based development

---

## 🔮 Future Improvements

* [ ] Backend API integration
* [ ] MongoDB database
* [ ] User authentication
* [ ] User registration and login
* [ ] Product management dashboard
* [ ] Order management
* [ ] Online payments
* [ ] Order tracking
* [ ] Customer reviews
* [ ] Wishlist persistence
* [ ] Email notifications
* [ ] Admin dashboard
* [ ] Product inventory management

---

## 📸 Screenshots

Screenshots will be added as the UI development progresses.

### Home Page

Coming soon.

### Product Catalog

Coming soon.

### Product Details

Coming soon.

### Shopping Cart

Coming soon.

---

## 🌐 Live Demo

🚧 **Coming Soon**

---

## 👩‍💻 Author

### Raveesha Nethsarani

Full Stack Developer passionate about building modern, scalable, and user-friendly web applications.

* GitHub: [@raveeshaNethsarani](https://github.com/raveeshaNethsarani)
* Repository: [Aura Furniture](https://github.com/raveeshaNethsarani/Aura-Furniture)

---

## 📄 License

This project is developed as an individual project for educational and portfolio purposes.

---

<div align="center">

### 🛋️ Aura Furniture

**Designed with passion. Built with code.**

⭐ If you find this project interesting, consider giving it a star!

</div>
