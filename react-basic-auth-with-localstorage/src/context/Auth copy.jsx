import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const Auth = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState({ fullName: "Umair", email: "umair@codevpk.com" })

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default Auth