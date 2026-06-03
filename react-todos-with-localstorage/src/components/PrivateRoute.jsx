import { useAuth } from '@/context/Auth'
import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ Component }) => {

    const { isAuth } = useAuth()

    if (!isAuth) { return <Navigate to="/auth/login" replace /> }

    return (
        <Component />
    )
}

export default PrivateRoute