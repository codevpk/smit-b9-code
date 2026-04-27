import { useEffect, useState } from "react"
import { Space, Typography } from "antd"
import { Link } from "react-router-dom"

const { Text } = Typography

const Navbar = () => {

    const [user, setUser] = useState({})

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"))

        if (user) { setUser(user) }

    }, [])

    const handleLogout = () => {
        localStorage.removeItem("user")
        window.toastify("Logout successful", "success")
        setUser({})
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
                        </ul>
                        <div className="d-flex">
                            <Space size="small">
                                {user.id
                                    ? <>
                                        <Text className="text-white">Welcome! {user.fullName}</Text>
                                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                    </>
                                    : <>
                                        <Link to="/auth/login" className="btn btn-success">Login</Link>
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