import { createContext, useContext, useReducer } from "react"

const AuthContext = createContext()
const initialState = { isAuth: false, user: {} }

const reducer = (state, { type, payload }) => {
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

    alert("Alert me")

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default Auth