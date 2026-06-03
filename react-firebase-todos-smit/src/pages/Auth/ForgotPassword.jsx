import { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/config/firebase'

const { Title } = Typography
const { Item } = Form

const initialState = { email: "" }

const ForgotPassword = () => {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = () => {

    let { email } = state

    setIsProcessing(true)

    sendPasswordResetEmail(auth, email, {
      url: `${import.meta.env.VITE_APP_URL}/auth/login`
    })
      .then(() => {
        window.toastify("Email sent successfully. Please check your mail box.", "success")
      })
      .catch((error) => {
        console.log('error', error)
        window.toastify("Something went wrong. Please try again.", "error")

      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  return (
    <main className='auth p-4'>
      <div className="card p-3 p-md-4">
        <Title level={1} className='text-center'>Forgot Password</Title>
        <Form layout='vertical'>
          <Row>
            <Col span={24}>
              <Item label="Email" required>
                <Input type="email" size='large' placeholder='Enter your email address' name='email' onChange={handleChange} />
              </Item>
            </Col>
            <Col span={24}>
              <Button type='primary' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Send Email</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  )
}

export default ForgotPassword