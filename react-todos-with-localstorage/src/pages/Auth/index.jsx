import React from 'react'
import { Route, Routes } from 'react-router-dom'

const Auth = () => {
    return (
        <>
            <Routes>
                <Route path='login' element={<></>} />
                <Route path='register' element={<></>} />
                <Route path='forgot-password' element={<></>} />
                <Route path='reset-password' element={<></>} />
                <Route path='*' element={<></>} />
            </Routes>
        </>
    )
}

export default Auth