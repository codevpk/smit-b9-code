import { Button, Col, Row, Space, Typography } from 'antd'
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons"
import { useAuth } from '@/context/Auth'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const Hero = () => {

    const { user, handleLogout } = useAuth()

    const navigate = useNavigate()

    return (
        <div id='hero' className='py-5'>
            <div className="container">
                <Row>
                    <Col span={24} className='text-center'>
                        <Title level={1}>Dashboard Home</Title>
                        <Title level={2} className='mb-5'>{user.fullName}</Title>
                        <Space>
                            <Button type='primary' size='large' icon={<HomeOutlined />} onClick={() => navigate("/")}>Home</Button>
                            <Button type='primary' size='large' danger icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Button>
                        </Space>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Hero