import { auth } from "@/config/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { createContext, useContext, useEffect, useReducer, useState } from "react"

const AuthContext = createContext()

const initialState = { isAuth: false, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGIN":
            return { isAuth: true, user: payload.user }
        case "SET_PROFILE":
            return { ...state, user: payload.user }
        case "SET_LOGOUT":
            return initialState
        default:
            return state
    }
}

const Auth = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)

    const readProfile = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: "SET_LOGIN", payload: { user } })
            }
            setIsAppLoading(false)
        })
    }
    useEffect(() => { readProfile() }, [])

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: "SET_LOGOUT" })
                window.toastify("Logout successful", "success")
            })
            .catch(() => {
                window.toastify("Something went wrong while logging out user.", "error")
            })
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch, isAppLoading, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default Auth

export const useAuth = () => useContext(AuthContext)