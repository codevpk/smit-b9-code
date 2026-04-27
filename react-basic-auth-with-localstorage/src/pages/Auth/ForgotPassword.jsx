import { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography
const { Item } = Form

const initialState = { email: "" }

const ForgotPassword = () => {

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [user, setUser] = useState({})

    const handleChange = e => setState({ ...state, [e.target.name]: e.target.value })

    const handleSubmit = () => {

        setUser({})

        let { email } = state

        if (!window.isValidEmail(email)) { return window.toastify("Please enter a valid email address", "error") }

        setIsProcessing(true)

        const users = JSON.parse(localStorage.getItem("users")) || []

        const user = users.find(item => email === item.email)

        console.log('user', user)
        if (!user) {
            setIsProcessing(false)
            return window.toastify("User not found", "error")
        }

        setTimeout(() => {
            setIsProcessing(false)
            window.toastify("Email sent successfully", "success")
            setUser(user)
        }, 1000);

    }

    return (
        <main className='auth p-3 d-flex justify-content-center align-items-center'>
            <div className="card w-100 p-3 p-md-4">
                <Title level={2} className='text-center mb-0'>Forgot Password</Title>
                <Text className='text-center my-3'>Remember Password? <Link to="/auth/login">Login</Link></Text>

                <Form layout='vertical'>
                    <Row>
                        <Col span={24}>
                            <Item label="Email" required>
                                <Input type="email" size='large' placeholder='Enter your email address' name='email' value={state.email} onChange={handleChange} />
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Send Email</Button>
                        </Col>
                        {user.password &&
                            <Col span={24} className='mt-4'>
                                <Text className='text-center my-3'>Your password is: <b>{user.password}</b></Text>
                            </Col>
                        }
                    </Row>
                </Form>
            </div>
        </main>
    )
}

export default ForgotPassword