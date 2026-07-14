import { createContext, useContext, useEffect, useReducer, useState } from "react"
import axios from "axios"

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

    const readProfile = async (token) => {

        if (!token) { setIsAppLoading(false); return; }
        axios.get(`${window.apiURL}/auth/user`, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ status, data }) => {
                if (status === 200) {
                    const { user } = data
                    console.log('user', user)
                    dispatch({ type: "SET_LOGIN", payload: { user } })
                }
            })
            .catch(error => {
                console.error("error", error.response)
                if (error.response.data.message === "Invalid or expired token.")
                    localStorage.removeItem("token")
            })
            .finally(() => { setIsAppLoading(false) })
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        readProfile(token)
    }, [])

    const handleLogout = async () => {
        try {
            localStorage.removeItem("token")
            dispatch({ type: "SET_LOGOUT" })
            window.toastify("Logout successful", "success")
        } catch (error) {
            console.error(error)
            window.toastify("Something went wrong while logging out user.", "error")
        }
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch, readProfile, isAppLoading, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default Auth

export const useAuth = () => useContext(AuthContext)