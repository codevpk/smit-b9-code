import { auth, firestore } from "@/config/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
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

    const readProfile = async (user) => {
        const docSnap = await getDoc(doc(firestore, "users", user.uid));
        if (docSnap.exists()) {
            const user = docSnap.data()
            dispatch({ type: "SET_LOGIN", payload: { user } })
        }
        setIsAppLoading(false)
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) { readProfile(user) }
            else { setIsAppLoading(false) }
        })
    }, [])

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