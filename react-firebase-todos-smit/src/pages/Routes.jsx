import { Navigate, Route, Routes } from 'react-router-dom'

import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'

import PageNotFound from '@/components/PageNotFound'
import { useAuth } from '@/context/Auth'
import PrivateRoute from '@/components/PrivateRoute'

const Index = () => {
    const { isAuth } = useAuth()
    return (
        <>
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='auth/*' element={!isAuth ? <Auth /> : <Navigate to="/dashboard" />} />
                <Route path='dashboard/*' element={<PrivateRoute Component={Dashboard} />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default Index