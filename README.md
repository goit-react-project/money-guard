# Money Guard

A personal finance tracking application. Easily manage your income and expenses, view statistics, and track live exchange rates.

---

## Live Demo

[https://goit-react-money-guard.vercel.app/](#)

---

## Features

- **User Authentication** — Registration, login and session management (Bearer token)
- **Transaction Management** — Add, edit and delete income/expense transactions
- **Statistics** — Category-based spending chart (Doughnut chart) with monthly/yearly filtering
- **Exchange Rates** — Live USD/EUR rates via Monobank API (1-hour cache)
- **Balance Tracking** — Real-time total balance display
- **Fully Responsive** — Mobile, tablet and desktop compatible design

---

## Tech Stack

### Frontend

| Technology                 | Version | Description                    |
| -------------------------- | ------- | ------------------------------ |
| React                      | 19      | UI library                     |
| React Router DOM           | 7       | Page routing (lazy-loaded)     |
| Redux Toolkit              | 2       | State management               |
| React Redux                | 9       | Redux bindings                 |
| Redux Persist              | 6       | Auth token persistence         |
| Axios                      | 1       | HTTP requests                  |
| Formik + Yup               | 2 + 1   | Form management and validation |
| Chart.js + react-chartjs-2 | 4 + 5   | Chart components               |
| React Toastify             | 11      | Notification system            |
| Vite                       | 8       | Build tool                     |

### Styling

- CSS Modules (component-scoped)
- Google Fonts — Poppins (400/600/700)

---

## Project Structure

```
src/
├── assets/
│   └── icons/                  # SVG icons (currentColor support)
├── components/
│   ├── AddTransactionForm/     # Add transaction form
│   ├── Balance/                # Total balance card
│   ├── ButtonAddTransactions/  # Floating add button
│   ├── Chart/                  # Doughnut chart
│   ├── Currency/               # Exchange rate table
│   ├── CurrencyTab/            # Mobile currency page
│   ├── EditTransactionForm/    # Edit transaction form
│   ├── ErrorBoundary/          # Error boundary
│   ├── Header/                 # Top header bar
│   ├── HomeTab/                # Home page content
│   ├── Loader/                 # Loading spinner
│   ├── LoginForm/              # Login form
│   ├── LogoutModal/            # Logout confirmation modal
│   ├── ModalAddTransaction/    # Add transaction modal
│   ├── ModalEditTransaction/   # Edit transaction modal
│   ├── Navigation/             # Navigation links
│   ├── RegistrationForm/       # Registration form
│   ├── StatisticsDashboard/    # Month/year selectors
│   ├── StatisticsTab/          # Statistics page
│   ├── StatisticsTable/        # Category table
│   ├── TransactionsItem/       # Single transaction row
│   ├── TransactionsList/       # Transactions list
│   └── routes/                 # PrivateRoute, PublicRoute
├── hooks/                      # Custom React hooks
├── pages/
│   ├── DashboardPage/          # Main layout (Header + Outlet)
│   ├── LoginPage/
│   └── RegistrationPage/
├── redux/
│   ├── auth/                   # authSlice, authOperations, authSelectors
│   ├── finance/                # financeSlice, financeOperations, financeSelectors
│   ├── global/                 # globalSlice (loading/error UI state)
│   └── store.js
└── utils/
    ├── axiosInstance.js        # Auth header management
    ├── categoryColors.js       # Category color mappings
    └── validationSchema.js     # Yup schemas
```

---

## Routes

```
/register               → RegistrationPage   (PublicRoute)
/login                  → LoginPage          (PublicRoute)
/dashboard              → DashboardPage      (PrivateRoute)
  /dashboard/home           → HomeTab
  /dashboard/statistics     → StatisticsTab
  /dashboard/currency       → CurrencyTab
```

---

## API

### Backend

- **Base URL:** `https://wallet.b.goit.study/api`
- **Auth:** Bearer token

| Endpoint                  | Method | Description        |
| ------------------------- | ------ | ------------------ |
| `/auth/sign-up`           | POST   | Register           |
| `/auth/sign-in`           | POST   | Login              |
| `/auth/sign-out`          | DELETE | Logout             |
| `/users/current`          | GET    | Current user       |
| `/transactions`           | GET    | Transaction list   |
| `/transactions`           | POST   | Add transaction    |
| `/transactions/:id`       | DELETE | Delete transaction |
| `/transactions/:id`       | PATCH  | Edit transaction   |
| `/transaction-categories` | GET    | Categories         |
| `/transactions-summary`   | GET    | Statistics summary |

### Exchange Rates

- **URL:** `https://api.monobank.ua/bank/currency`
- Cached in localStorage with a **1-hour TTL**

---

## Getting Started

### Requirements

- Node.js >= 18
- npm or yarn

### Steps

```bash
# Clone the repository
git clone https://github.com/your-username/money-guard.git
cd money-guard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the development server
npm run dev
```

### Environment Variables

```env
VITE_API_BASE_URL=https://wallet.b.goit.study/api
```

---

## Scripts

```bash
npm run dev       # Development server (http://localhost:5173)
npm run build     # Production build
npm run preview   # Preview the build
npm run lint      # ESLint check
```

---

## Architecture Decisions

### State Management

- Centralized state with Redux Toolkit
- `redux-persist` stores only the **auth token**
- Modal states are managed with local `useState`

### Auth Flow

```
App loads → token exists?
  ✓ → fetchCurrentUser() → redirect to Dashboard
  ✗ → redirect to Login
```

### Code Splitting

Pages are lazy-loaded with `React.lazy()` + `Suspense`:

```js
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));
const HomeTab = lazy(() => import('./components/HomeTab/HomeTab'));
```

### Error Handling

- Redux errors are caught with `thunkAPI.rejectWithValue()`
- User notifications via React Toastify
- `ErrorBoundary` component at the root level

---

## Team

GoIT FullStack Developer Bootcamp project.

---

## License

MIT
