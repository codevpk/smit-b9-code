import { Space, Typography } from "antd"
import { Link } from "react-router-dom"
import { useAuth } from "@/context/Auth"

const { Text } = Typography

const Navbar = () => {

    const { user, isAuth, dispatch } = useAuth()

    const handleLogin = () => {
        dispatch({ type: "SET_LOGIN", payload: { user: { fullName: "Talha", email: "talha@gmail.com" } } })
        window.toastify("Login successful", "success")
    }

    const handleLogout = () => {
        dispatch({ type: "SET_LOGOUT" })
        window.toastify("Logout successful", "success")
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">React App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">Contact</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Hooks</a>
                                <ul className="dropdown-menu">
                                    <li><Link to='/hooks/useState' className="dropdown-item">useState</Link></li>
                                    <li><Link to='/hooks/useEffect' className="dropdown-item">useEffect</Link></li>
                                    <li><Link to='/hooks/useRef' className="dropdown-item">useRef</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <Space size="small">
                                {isAuth
                                    ? <>
                                        <Text className="text-white">Welcome! {user.fullName}</Text>
                                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                    </>
                                    : <>
                                        {/* <Text className="text-white">Welcome! {name}</Text> */}
                                        <button className="btn btn-success" onClick={handleLogin}>Login</button>
                                        {/* <Link to="/auth/login" className="btn btn-success">Login</Link> */}
                                        <Link to="/auth/register" className="btn btn-info">Register</Link>
                                    </>
                                }
                            </Space>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar