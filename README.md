# 🏦 Apex National Bank — Full-Stack Money Transfer System (MERN Stack)

[![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A production-grade, secure, and modern Banking & Money Transfer Web Application built using **MongoDB Atlas**, **Express.js**, **React (Vite)**, and **Node.js**.

Designed with **atomic MongoDB transactions (ACID compliance)**, JWT authentication, server-side overdraft prevention, real-time balance updates, interactive financial calculators, and a modern banking user experience with smooth scrolling and animations.

---

## 🔗 Project Links

| Resource | Link |
|---|---|
| **🌐 Live Application (Frontend)** | [https://apex-national-bank.vercel.app](https://apex-national-bank.vercel.app) *(or your deployed Vercel URL)* |
| **⚡ Live API Backend** | [https://apex-national-bank-api.onrender.com](https://apex-national-bank-api.onrender.com) *(or your deployed Render/Railway URL)* |
| **🐙 GitHub Repository** | [https://github.com/your-username/banking-money-transfer-system](https://github.com/your-username/banking-money-transfer-system) |

---

## 🌟 Key Features

### 1. 🏛️ Institutional Banking Landing Page
- **Fintech Aesthetic**: Clean white & electric blue design inspired by modern banking platforms.
- **Hero Showcase**: Left-to-right animated phone mockup displaying live balances and quick action chips.
- **Interactive Return Calculator**: Live compound interest calculator for Fixed Deposits & High-Yield Savings (7.5% p.a.).
- **Smooth Navigation**: Global smooth scrolling with floating "Back to Top" button and computed anchor offsets.
- **Trust & Compliance**: DICGC Deposit Insurance badge (₹5,00,000 cover), RBI disclosures, and 24x7 customer helpline.

### 2. ⚡ Atomic Money Transfers (ACID Guarantees)
- Processed with **MongoDB Transactions (`startSession` / `withTransaction`)** to prevent partial transfers.
- **Strict Server-Side Validation**:
  - Validates recipient account existence before debiting.
  - Prevents transfers to the same account.
  - Rejects negative or zero amount transfers.
  - Strictly prevents overdrafts (`400 Bad Request` if `amount > senderBalance`).

### 3. 💳 Multi-Account Banking Management
- Each user can hold multiple bank accounts (**Savings**, **Checking**, **Business**).
- Auto-generated unique account numbers (`ACC...`).
- Instant account switcher in Navbar and Dashboard.
- Ability to open new accounts with custom opening deposits in 30 seconds.

### 4. 📜 Real-Time Ledger & Transaction History
- Filter transactions by **All Activity**, **Debits (Sent)**, **Credits (Received)**, and **Failed**.
- Search by account number, recipient name, amount, or payment reference note.
- Pagination support for fast performance.
- Instant balance synchronization without full page reload.

### 5. 🔐 Enterprise Security
- Passwords hashed with `bcryptjs` (salt factor 10).
- Stateless JWT authentication via HTTP Bearer tokens.
- Protected client-side and server-side routes.
- Centralized error handling preventing internal stack trace leaks.

---

## 🏗️ Tech Stack

```
Frontend:  React 18, Vite, React Router v6, Axios, Tailwind CSS v4, Lucide React
Backend:   Node.js, Express.js, Mongoose ODM, JSON Web Token (JWT), bcryptjs, CORS
Database:  MongoDB Atlas (Cloud Multi-Region Cluster)
Hosting:   Vercel (Frontend) + Render / Railway (Backend)
```

---

## 📁 Project Structure

```
Bank Project/
├── server/                     # Express REST API Backend
│   ├── controllers/            # Route logic (authController, accountController, transactionController)
│   ├── middleware/             # auth.js (JWT verify), errorHandler.js
│   ├── models/                 # Mongoose schemas (User, Account, Transaction)
│   ├── routes/                 # authRoutes, accountRoutes, transactionRoutes
│   ├── scripts/                # Database seed script (seed.js)
│   ├── .env.example            # Backend env template
│   ├── package.json
│   └── server.js               # Express entry point (Port 5001)
│
├── client/                     # React + Vite Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Modals, TransactionHistory, ToastNotification
│   │   ├── context/            # AuthContext (state management & account switcher)
│   │   ├── pages/              # LandingPage, LoginPage, RegisterPage, DashboardPage
│   │   ├── services/           # Axios API client with bearer token interceptors
│   │   ├── App.jsx             # Router layout
│   │   ├── index.css           # Global smooth scroll, animations & design system
│   │   └── main.jsx
│   ├── .env.example            # Frontend env template
│   ├── package.json
│   └── vite.config.js          # Vite config with backend proxy to :5001
│
├── .gitignore                  # Git ignore rules
└── README.md                   # Full system documentation
```

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)

---

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/banking-money-transfer-system.git
cd banking-money-transfer-system
```

---

### Step 2: Configure Environment Variables

#### 1. Backend (`server/.env`):
Create `server/.env`:
```env
PORT=5001
MONGO_URI=mongodb+srv://kartikagouda644_db_user:L32eBNeFGfrNm7Tq@cluster0.xigxxfy.mongodb.net/bank_transfer_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=super_secret_jwt_key_bank_app_2026_production_safe
CLIENT_URL=http://localhost:5173
```

#### 2. Frontend (`client/.env`):
Create `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:5001/api
```

---

### Step 3: Install Dependencies & Seed Database

```bash
# 1. Install & seed backend
cd server
npm install
npm run seed

# 2. Install frontend
cd ../client
npm install
```

---

### Step 4: Run the Application

Open two terminal windows:

**Terminal 1 (Backend API):**
```bash
cd server
npm start
# API running at http://localhost:5001
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# Web application running at http://localhost:5173
```

Visit **`http://localhost:5173`** in your browser.

---

## 🧪 Demo Test Flow & Credentials

### Pre-Seeded Test Accounts

| Customer | Email | Password | Accounts & Starting Balances |
|---|---|---|---|
| **Alice Smith** | `alice@bank.com` | `Password123!` | `ACC1000000001` (₹15,000) & `ACC1000000002` (₹5,000) |
| **Bob Johnson** | `bob@bank.com` | `Password123!` | `ACC2000000002` (₹8,500) |
| **Charlie Brown** | `charlie@bank.com` | `Password123!` | `ACC3000000003` (₹2,000) |

---

### Step-by-Step Test Scenarios

#### ✅ Scenario 1: Successful Peer-to-Peer Transfer
1. Navigate to `http://localhost:5173/login`.
2. Click the **Alice** quick-fill button and submit.
3. On the dashboard, observe Alice's initial balance: **₹15,000**.
4. Click **"Transfer Money"**.
5. Enter Recipient Account: `ACC2000000002` (Bob).
6. Enter Amount: `₹1,500` and Note: `Rent payment`.
7. Click **"Authorize Transfer"**.
8. **Result**:
   - Success toast appears.
   - Alice's balance instantly updates to **₹13,500**.
   - A new Debit row is prepended in the Transaction Ledger.
   - *(Optional)* Log in as Bob (`bob@bank.com`) to confirm his balance increased by ₹1,500.

#### ❌ Scenario 2: Insufficient Balance (Overdraft Prevention)
1. In Alice's account, click **"Transfer Money"**.
2. Enter Recipient Account: `ACC2000000002`.
3. Enter Amount: `₹500,000` (exceeds balance).
4. **Result**:
   - The transfer button is disabled with an in-form warning.
   - If submitted, server returns `400 Bad Request` with: *"Insufficient funds. Available: ₹13,500"*.
   - Zero balance mutation occurs.

#### ❌ Scenario 3: Non-Existent Account Guard
1. Click **"Transfer Money"**.
2. Enter Recipient Account: `ACC9999999999`.
3. Enter Amount: `₹500`.
4. Click **"Authorize Transfer"**.
5. **Result**:
   - Server returns `404 Not Found` with *"Recipient account not found"*.

#### ➕ Scenario 4: Open a New Bank Account
1. On the dashboard or Navbar, click **"New Account"**.
2. Choose **Business Account** and enter an Opening Deposit of `₹10,000`.
3. Click **"Open Account"**.
4. **Result**:
   - A new account number is generated.
   - Total portfolio balance updates in real-time.
   - Switch between accounts seamlessly using the account selector dropdown.

---

## 📡 REST API Reference

### Authentication
- `POST /api/auth/register` — Register a new customer with opening deposit.
- `POST /api/auth/login` — Sign in and receive JWT token.
- `GET /api/auth/me` — Fetch authenticated customer profile (`Bearer <JWT>`).

### Accounts
- `POST /api/accounts` — Open a new bank account (Savings / Checking / Business).
- `GET /api/accounts` — List all bank accounts owned by authenticated customer.
- `GET /api/accounts/:accountNumber` — Fetch single account details and balance.
- `GET /api/accounts/:accountNumber/transactions` — Get paginated transactions for a specific account.

### Transactions
- `POST /api/transactions/transfer` — Execute an atomic fund transfer.
  ```json
  {
    "fromAccount": "ACC1000000001",
    "toAccount": "ACC2000000002",
    "amount": 1500,
    "description": "Monthly allowance"
  }
  ```
- `GET /api/transactions` — Get all transactions across customer accounts.

---

## 🌐 Production Deployment Guide

### 1. Deploy Backend on [Render](https://render.com)
1. Connect your GitHub repository to Render.
2. Create a **Web Service** with:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
3. Add Environment Variables:
   - `PORT` = `5001`
   - `MONGO_URI` = `<Your_MongoDB_Atlas_URI>`
   - `JWT_SECRET` = `<Your_Production_JWT_Secret>`
   - `CLIENT_URL` = `https://your-frontend.vercel.app`

### 2. Deploy Frontend on [Vercel](https://vercel.com)
1. Import repository on Vercel.
2. Configure Project Settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variable:
   - `VITE_API_BASE_URL` = `https://your-backend.onrender.com/api`
4. Click **Deploy**.

---

## 📄 License
This project is licensed under the MIT License — feel free to use it for learning or portfolio demonstration.
