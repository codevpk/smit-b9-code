import { Avatar, Dropdown, Space } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/Auth'
import { LogoutOutlined, DashboardOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const Navbar = () => {

    const { isAuth, user, handleLogout } = useAuth()

    const navigate = useNavigate()

    const items = [
        {
            key: '0',
            label: user.fullName,
        },
        {
            key: '1',
            label: 'Dashboard',
            icon: <DashboardOutlined />,
            onClick: () => navigate("/dashboard")
        },
        {
            key: '2',
            label: 'Settings',
            icon: <SettingOutlined />,
            onClick: () => navigate("/dashboard/account/settings")
        },
        {
            type: 'divider',
        },
        {
            key: '3',
            label: 'Logout',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: handleLogout
        },
    ]

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">Todos</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/todos" className="nav-link">My Todos</Link>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <Space>
                                {!isAuth
                                    ? <>
                                        <Link to="/auth/login" className="btn btn-success">Login</Link>
                                        <Link to="/auth/register" className="btn btn-info">Register</Link>
                                    </>
                                    : <>
                                        <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
                                            <Avatar size={36} style={{ cursor: "pointer" }} icon={<UserOutlined />} />
                                            {/* <Avatar style={{ cursor: "pointer", backgroundColor: "#fdf0d5", color: "black" }}>{user.fullName[0]}</Avatar> */}
                                            {/* <Avatar style={{ cursor: "pointer" }} src={<img draggable={false} src="https://umairahmad.net/img/testimonial-1.jpg" alt="avatar" />} /> */}
                                        </Dropdown>
                                        {/* <Text className='text-white'>Welcome, {user.fullName}!</Text> */}
                                        {/* <Link to="/dashboard" className="btn btn-info">Dashboard</Link>
                                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button> */}
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