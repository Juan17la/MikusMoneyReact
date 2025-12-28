import { Routes, Route } from 'react-router'

import Account from './pages/Account.tsx'

import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'

import Error404 from './pages/404.tsx'

import { PrivateRoute } from './Routes/PrivateRoute.tsx'
import { PublicOnlyRoute } from './Routes/PublicOnlyRoute.tsx'


function App() {
  return (
   <>
    <Routes>
      {/* RUTAS PUBLICAS */}
      <Route path='/login' element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path='/register' element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />

      {/* RUTAS PRIVADAS */}
      <Route path='/account' element={<PrivateRoute><Account /></PrivateRoute>} />
      
      {/* RUTAS LANDING */}
      <Route path='/' element={<PublicOnlyRoute><h1>Welcome to Mikus Money!</h1></PublicOnlyRoute>} />
      
      {/* ERROR 404 NOT FOUND */}
      <Route path='*' element={<Error404 />} />
    </Routes>
   </> 
  )
}

export default App
