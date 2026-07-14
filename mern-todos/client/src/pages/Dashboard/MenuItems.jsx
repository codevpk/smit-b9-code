import { DesktopOutlined, HomeOutlined, PieChartOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const root = "/dashboard"

const items = [
    { key: "0", label: <Link to={`${root}`}>Home</Link>, icon: <HomeOutlined /> },
    {
        key: "1", label: "Users", icon: <UserOutlined />,
        children: [
            { key: "1.1", label: <Link to={`${root}/users/all`}>All Users</Link>, icon: <UserOutlined /> },
            { key: "1.2", label: <Link to={`${root}/users/add`}>Add User</Link>, icon: <UserAddOutlined /> },
        ]
    },
    {
        key: "2", label: "Todos", icon: <PieChartOutlined />,
        children: [
            { key: "2.1", label: <Link to={`${root}/todos/all`}>All Todos</Link>, icon: <PieChartOutlined /> },
            { key: "2.2", label: <Link to={`${root}/todos/add`}>Add Todo</Link>, icon: <PieChartOutlined /> },
        ]
    },
    { key: "3", label: <Link to={`${root}/settings`}>Settings</Link>, icon: <SettingOutlined /> },
]

export { items }