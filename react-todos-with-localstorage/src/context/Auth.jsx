import { createContext, useContext, useEffect, useReducer, useState } from "react"

const AuthContext = createContext()
const initialState = { isAuth: false, user: {} }

const reducer = (state, { type, payload = {} }) => {

    const { user = {} } = payload

    switch (type) {
        case "SET_LOGIN":
            return { isAuth: true, user }
        case "SET_PROFILE":
            return { ...state, user }
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
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            dispatch({ type: "SET_LOGIN", payload: { user } })
        }
        setTimeout(() => {
            setIsAppLoading(false)
        }, 2000);
    }
    useEffect(() => { readProfile() }, [])

    const handleLogout = () => {
        localStorage.removeItem("user")
        dispatch({ type: "SET_LOGOUT" })
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch, handleLogout, isAppLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default Auth