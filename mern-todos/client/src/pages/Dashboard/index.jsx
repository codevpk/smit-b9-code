import { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { items } from "./MenuItems"
import Routes from "./Routes"
import { useAuth } from '@/context/Auth';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography

const Dashboard = () => {

    const { user } = useAuth()

    const [collapsed, setCollapsed] = useState(false);

    const year = new Date().getFullYear();

    return (
        <Layout className='min-vh-100 dashboard'>
            <Sider breakpoint="md" collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="py-3">
                    <Title level={4} className='mb-0 text-center text-white'>React Todos</Title>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header className='p-0 px-4 bg-white d-flex align-items-center justify-content-end' style={{ height: 60 }}>
                    <Typography.Title level={5}>
                        {user.email}
                    </Typography.Title>
                </Header>
                <Content className='p-3 pb-0'>
                    <div className="card p-3 border-0 h-100">
                        <Routes />
                    </div>
                </Content>
                <Footer className='text-center' style={{ padding: "13.5px 16px" }}>&copy; {year}. All Rights Reserved.</Footer>
            </Layout>
        </Layout>
    )
}

export default Dashboard