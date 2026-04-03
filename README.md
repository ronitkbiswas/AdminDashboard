# ⚙️ Admin Dashboard (CRUD App)

A simple **Admin Dashboard built with React** that allows managing products and users with full CRUD functionality.

## Live link
https://admin-dashboard-ronitkbiswas.vercel.app/
---

## 🚀 Features

### 🔐 Authentication

* Basic login system
* Demo credentials:

  * **Username:** admin
  * **Password:** 1234

---

### 📦 Product Management

* Add new products
* Edit existing products
* Delete products
* Search products
* Filter by category
* View stats (total products, value, categories)

---

### 👥 User Management

* Add / Edit / Delete users
* Search users (name/email)
* Role-based tagging (Admin, Editor, Viewer)
* Active / Inactive status

---

### 📊 Analytics Dashboard

* Products by category
* Users by role
* Active vs inactive users
* Top 5 expensive products

---

### ⚙️ Settings

* Update site info
* Toggle preferences (dark mode, notifications)
* Simulated config panel

---

## 🧠 Tech Used

* React (useState, useEffect)
* LocalStorage (data persistence)
* Inline CSS (no external libraries)

---

## 💾 Data Storage

* Data is stored in **localStorage**
* Products → `admin_products`
* Users → `admin_users`

---

## 📂 Project Structure

* Single-file React app (App.jsx)
* Components inside same file:

  * Login
  * ProductsPage
  * UsersPage
  * AnalyticsPage
  * SettingsPage

---

## ▶️ How to Run

```bash
npm install
npm run dev
```

---

## ⚠️ Limitations

* No backend (pure frontend app)
* Authentication is not secure (hardcoded)
* Not production-ready

---

## 🎯 Purpose

This project is built for **learning CRUD operations, state management, and basic dashboard UI in React**.

---

## 🔥 Author

Built by Ronit
