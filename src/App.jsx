
import { Routes, Route } from 'react-router'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'



function App() {


  return (
    <>

      <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} /> 
        </Route>
      </Routes>
      </AuthProvider>
    </>
  )
}

export default App
