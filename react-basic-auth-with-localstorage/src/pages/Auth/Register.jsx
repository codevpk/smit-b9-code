import { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const { Title, Text } = Typography
const { Item } = Form

const initialState = { fullName: "", email: "", password: "", confirmPassword: "" }

const Register = () => {

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const navigate = useNavigate()

    const handleChange = e => setState({ ...state, [e.target.name]: e.target.value })

    const handleSubmit = () => {

        let { fullName, email, password, confirmPassword } = state

        fullName = fullName.trim()

        if (fullName.length < 3) { return window.toastify("Please enter your full name", "error") }
        if (!window.isValidEmail(email)) { return window.toastify("Please enter a valid email address", "error") }
        if (password.length < 6) { return window.toastify("Please enter a strong password", "error") }
        if (confirmPassword !== password) { return window.toastify("Password do not match.", "error") }

        const user = {
            fullName, email, password,
            id: window.getRandomId(),
            createdAt: Date.now(),
            status: "active",
            role: "student"
        }
        console.log('user', user)

        setIsProcessing(true)

        const users = JSON.parse(localStorage.getItem("users")) || []
        users.push(user)
        localStorage.setItem("users", JSON.stringify(users))

        setTimeout(() => {
            setIsProcessing(false)
            window.toastify("A new user has been successfully registered.", "success")
            setState(initialState)
            navigate("/auth/login")
        }, 1000);

    }

    return (
        <main className='auth p-3 d-flex justify-content-center align-items-center'>
            <div className="card w-100 p-3 p-md-4">
                <Title level={2} className='text-center mb-0'>Register</Title>
                <Text className='text-center my-3'>Already have an account? <Link to="/auth/login">Login</Link></Text>

                <Form layout='vertical'>
                    <Row>
                        <Col span={24}>
                            <Item label="Full Name" required>
                                <Input type="text" size='large' placeholder='Enter your full name' name='fullName' value={state.fullName} onChange={handleChange} />
                            </Item>
                        </Col>
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
                            <Item label="Confirm Password" required>
                                <Input.Password size='large' placeholder='Enter your password again' name='confirmPassword' value={state.confirmPassword} onChange={handleChange} />
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Register</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    )
}

export default Register