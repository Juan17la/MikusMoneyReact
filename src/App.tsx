import { Routes, Route } from 'react-router'
import Account from './pages/Account.tsx'
import Login from './pages/Login.tsx'
import Error404 from './pages/404.tsx'

import { PrivateRoute } from './Routes/PrivateRoute.tsx'
import { PublicOnlyRoute } from './Routes/PublicOnlyRoute.tsx'

function App() {
  return (
   <>
    <Routes>
      {/* RUTAS PUBLICAS */}
      <Route path='/login' element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path='/register' element={<PublicOnlyRoute><h1>Register please, dummy!</h1></PublicOnlyRoute>} />

      {/* RUTAS PRIVADAS */}
      <Route path='/account' element={<PrivateRoute><Account /></PrivateRoute>} />
      
      {/* RUTAS LANDING */}
      <Route path='/' element={<h1>Welcome to Mikus Money!</h1>} />
      
      {/* ERROR 404 NOT FOUND */}
      <Route path='*' element={<Error404 />} />
    </Routes>
   </> 
  )
}

export default App
