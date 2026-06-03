import Auth from "./Auth"

const AppProvider = ({ children }) => {
    return (
        <Auth>
            {children}
        </Auth>
    )
}

export default AppProvider