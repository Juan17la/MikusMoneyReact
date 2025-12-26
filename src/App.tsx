import { Routes, Route } from 'react-router'
import Home from './pages/Home.tsx'

function App() {
  return (
   <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<h1>Login HIIII</h1>} />
      <Route path='/register' element={<h1>Register please, dummy!</h1>} />
    </Routes>
   </> 
  )
}

export default App
