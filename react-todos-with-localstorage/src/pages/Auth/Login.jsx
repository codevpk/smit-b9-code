import { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
// import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/Auth'

const { Title } = Typography
const { Item } = Form

const initialState = { email: "", password: "" }

const Login = () => {

    const { dispatch } = useAuth()

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    // const navigate = useNavigate()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {

        let { email, password } = state

        setIsProcessing(true)
        try {
            const users = JSON.parse(localStorage.getItem("users")) || []

            const user = users.find(user => user.email === email && user.password === password)

            if (!user) { return window.toastify("Invalid email or password", "error") }

            localStorage.setItem("user", JSON.stringify(user))

            dispatch({ type: "SET_LOGIN", payload: { user } })

            window.toastify("Login successful", "success")

            // setTimeout(() => {
            //     navigate("/")
            // }, 700);
        } catch (error) {
            console.error(error)
            window.toastify("Something went wrong", "error")
        } finally {
            setTimeout(() => {
                setIsProcessing(false)
            }, 500);
        }
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