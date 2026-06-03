import { Route, Routes } from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'

import PageNotFound from '@/components/PageNotFound'

const Auth = () => {
    return (
        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default Auth