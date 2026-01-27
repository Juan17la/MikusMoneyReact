# Miku's Money React Frontend

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Axios** for API requests
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Project Structure

```
src/
├── api/              # API service layer
├── components/       # Reusable UI components
├── context/          # React context providers
├── layouts/          # Layout components
├── pages/            # Page components
├── Routes/           # Route protection components
└── interface/        # TypeScript interfaces
```

## Pages

### Public Pages
- **Landing Page** (`/`) - Application home page
- **Login** (`/auth/login`) - User authentication
- **Register** (`/auth/register`) - New user registration

### Protected Pages
- **Account** (`/account`) - User account overview
- **Transactions** (`/transactions`) - Transaction history
- **Deposit Form** (`/transactions/deposit`) - Deposit money
- **Withdraw Form** (`/transactions/withdraw`) - Withdraw money
- **Transfer Form** (`/transactions/transfer`) - Transfer between accounts
- **Savings** (`/savings`) - Savings overview
- **Savings Create** (`/savings/create`) - Create new savings pig
- **Savings Deposit** (`/savings/:id/deposit`) - Deposit to savings pig

## Routes

### Route Protection

The application uses two types of route guards:

- **PrivateRoute** - Protects routes that require authentication. Redirects to `/auth/login` if not authenticated.
- **PublicOnlyRoute** - Prevents authenticated users from accessing public-only pages (like login/register). Redirects to `/account` if already authenticated.

### Route Structure

```
/ (Landing Page)
/auth/login (Login)
/auth/register (Register)
/account (Account Dashboard)
/transactions (Transaction List)
/transactions/deposit (Deposit Form)
/transactions/withdraw (Withdraw Form)
/transactions/transfer (Transfer Form)
/savings (Savings List)
/savings/create (Create Savings)
/savings/:id/deposit (Deposit to Savings)
* (404 Page)
```

## API Services

- **authenticationService** - Login, register, and authentication
- **accountService** - Account management
- **transactionsService** - Transaction operations
- **savingsPigService** - Savings management
- **axiosInstance** - Configured Axios instance with interceptors

## Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```