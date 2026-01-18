import { Routes, Route } from 'react-router'

import Account from './pages/Account.tsx'

import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'

import Error404 from './pages/404.tsx'

import DepositForm from './pages/DepositForm.tsx'
import WithdrawForm from './pages/WithdrawForm.tsx'
import TransferForm from './pages/TransferForm.tsx'
import Transactions from './pages/Transactions.tsx'
import Savings from './pages/Savings.tsx'
import SavingsCreateForm from './pages/SavingsCreateForm.tsx'
import DepositSavingsForm from './pages/DepositSavingsForm.tsx'

import { PrivateRoute } from './Routes/PrivateRoute.tsx'
import { PublicOnlyRoute } from './Routes/PublicOnlyRoute.tsx'

function App() {
  return (
   <>
    <Routes>
      {/* AUTH ROUTES */}
      <Route path='/auth/login' element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path='/auth/register' element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />

      {/* PRIVATE ROUTES */}
      <Route path='/account' element={<PrivateRoute><Account /></PrivateRoute>} />

      {/* TRANSACTIONS ROUTES */}
      <Route path='/transactions' element={<PrivateRoute><Transactions /></PrivateRoute>} />
      <Route path='/transactions/deposit' element={<PrivateRoute><DepositForm /></PrivateRoute>} />
      <Route path='/transactions/withdraw' element={<PrivateRoute><WithdrawForm /></PrivateRoute>} />
      <Route path='/transactions/transfer' element={<PrivateRoute><TransferForm /></PrivateRoute>} />

      {/* SAVINGS ROUTES */}
      <Route path='/savings' element={<PrivateRoute><Savings /></PrivateRoute>} />
      <Route path='/savings/create' element={<PrivateRoute><SavingsCreateForm /></PrivateRoute>} />
      <Route path='/savings/:id/deposit' element={<PrivateRoute><DepositSavingsForm /></PrivateRoute>} />
      
      {/* LANDING */}
      <Route path='/' element={<PublicOnlyRoute><h1>Welcome to Mikus Money!</h1></PublicOnlyRoute>} />
      
      {/* ERROR 404 NOT FOUND */}
      <Route path='*' element={<Error404 />} />
    </Routes>
   </> 
  )
}

export default App
