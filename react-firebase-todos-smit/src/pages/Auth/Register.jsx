import { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/config/firebase'

const { Title } = Typography
const { Item } = Form

const initialState = { fullName: "", email: "", password: "", confirmPassword: "" }

const Register = () => {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const navigate = useNavigate()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = () => {

    let { fullName, email, password, confirmPassword } = state

    fullName = fullName.trim()

    if (fullName.length < 3) { return window.toastify("Please enter your full name", "error") }
    if (!window.isValidEmail(email)) { return window.toastify("Please enter your valid email address", "error") }
    if (password.length < 6) { return window.toastify("Password must be atleast 6 chars.", "error") }
    if (confirmPassword !== password) { return window.toastify("Password not match", "error") }

    const user = {
      id: window.getRandomId(),
      fullName, email, password,
      status: "active",
      role: "student",
      createdAt: Date.now(),
    }

    console.log('user', user)

    setIsProcessing(true)

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user', user)
        window.toastify("A new user has been successfully registered.", "success")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error', error)
        console.log('errorCode', errorCode)
        console.log('errorMessage', errorMessage)
        window.toastify("User not registered.", "error")
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  return (
    <main className='auth p-4'>
      <div className="card p-3 p-md-4">
        <Title level={1} className='text-center'>Register</Title>
        <Form layout='vertical'>
          <Row>
            <Col span={24}>
              <Item label="Full Name" required>
                <Input type="text" size='large' placeholder='Enter your full name' name='fullName' onChange={handleChange} />
              </Item>
            </Col>
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
              <Item label="Confirm Password" required>
                <Input.Password size='large' placeholder='Enter your password again' name='confirmPassword' onChange={handleChange} />
              </Item>
            </Col>
            <Col span={24}>
              <Button type='primary' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Register</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  )
}

export default Register