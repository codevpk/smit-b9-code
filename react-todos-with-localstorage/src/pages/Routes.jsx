import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '@/context/Auth'

import PrivateRoute from '@/components/PrivateRoute'

import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'

const Index = () => {
  const { isAuth } = useAuth()

  return (
    <Routes>
      <Route path='/*' element={<Frontend />} />
      <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/dashboard" />} />
      <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard} />} />
      <Route path='*' element={<h1>Page Not Found!</h1>} />
    </Routes>
  )
}

export default Index