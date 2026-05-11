import React, { createContext, useContext, useReducer, useState } from 'react'

const AuthContext = createContext()

const initialState = { isAuth: false, user: {} }

const reducer = (state, action) => {
    const user = { fullName: "Umair", email: "umair@codevpk.com" }
    const { type, payload = user } = action

    switch (type) {
        case "SET_LOGIN":
            return { isAuth: true, user: payload.user }
        case "SET_LOGOUT":
            return initialState
        default:
            return state
    }
}

const Auth = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default Auth