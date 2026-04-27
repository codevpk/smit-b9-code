import { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const { Title, Text } = Typography
const { Item } = Form

const initialState = { email: "", password: "" }

const Login = () => {

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const navigate = useNavigate()

    const handleChange = e => setState({ ...state, [e.target.name]: e.target.value })

    const handleSubmit = () => {

        let { email, password } = state

        if (!window.isValidEmail(email)) { return window.toastify("Please enter a valid email address", "error") }

        setIsProcessing(true)

        const users = JSON.parse(localStorage.getItem("users")) || []

        const user = users.find(item => email === item.email && password === item.password)

        console.log('user', user)
        if (!user) {
            setIsProcessing(false)
            return window.toastify("Invalid email or password", "error")
        }

        localStorage.setItem("user", JSON.stringify({ ...user, loggedInTime: Date.now() }))

        setTimeout(() => {
            setIsProcessing(false)
            window.toastify("Login successful", "success")
            navigate("/")
        }, 1000);

    }

    return (
        <main className='auth p-3 d-flex justify-content-center align-items-center'>
            <div className="card w-100 p-3 p-md-4">
                <Title level={2} className='text-center mb-0'>Login</Title>
                <Text className='text-center mt-3 mb-2'>Don't have an account? <Link to="/auth/register">Create Account</Link></Text>
                <Text className='text-center mb-3'>Forgot Password? <Link to="/auth/forgot-password">Reset</Link></Text>

                <Form layout='vertical'>
                    <Row>
                        <Col span={24}>
                            <Item label="Email" required>
                                <Input type="email" size='large' placeholder='Enter your email address' name='email' value={state.email} onChange={handleChange} />
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Item label="Password" required>
                                <Input.Password size='large' placeholder='Enter your password' name='password' value={state.password} onChange={handleChange} />
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Login</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    )
}

export default Login