import { useAuth } from '@/context/Auth'
import { Button, Col, Row, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const Home = () => {

  const { user, handleLogout } = useAuth()

  const navigate = useNavigate()

  return (
    <main>
      <div className="container">
        <Row>
          <Col span={24} className='text-center'>
            <Title level={1}>Dashboard</Title>
            <Title level={2}>Home</Title>
            <Title level={3}>Email: {user.email}</Title>
            <Title level={3}>UID: {user.uid}</Title>
            <Space>
              <Button type='primary' size='large' onClick={() => { navigate("/") }}>Home</Button>
              <Button type='primary' size='large' danger onClick={handleLogout}>Logout</Button>
            </Space>
          </Col>
        </Row>
      </div>
    </main>
  )
}

export default Home