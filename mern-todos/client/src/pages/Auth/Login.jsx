import { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { useAuth } from '@/context/Auth'
import axios from 'axios'

const { Title } = Typography
const { Item } = Form

const initialState = { email: "", password: "" }

const Login = () => {

  const { readProfile } = useAuth()

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {

    let { email, password } = state

    setIsProcessing(true)
    axios.post(`${window.apiURL}/auth/login`, { email, password })
      .then(({ status, data }) => {
        if (status === 200) {
          const { message, token } = data
          localStorage.setItem("token", token)
          readProfile(token)
          window.toastify(message, "success")
        }
      })
      .catch(error => {
        console.error("error", error)
        window.toastify("Something went wrong. Please try again.", "error")
      })
      .finally(() => {
        setIsProcessing(false)
      })

  }

  return (
    <main className='auth p-4'>
      <div className="card p-3 p-md-4">
        <Title level={1} className='text-center'>Login</Title>
        <Form layout='vertical'>
          <Row>
            <Col span={24}>
              <Item label="Email" required>
                <Input type="email" size='large' placeholder='Enter your email address' name='email' onChange={handleChange} />
              </Item>
            </Col>
            <Col span={24}>
              <Item label="Password" required>
                <Input.Password size='large' placeholder='Enter your password' name='password' onChange={handleChange} />
              </Item>
            </Col>
            <Col span={24}>
              <Button type='primary' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Login</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  )
}

export default Login