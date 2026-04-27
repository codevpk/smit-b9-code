import Button from '@/components/Button'
import { Col, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Paragraph, Text } = Typography

const Hero = () => {
    return (
        <div>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title level={1}>Home</Title>
                        <Paragraph>Hero Section</Paragraph>
                        <Text>Hero Section</Text>
                        <br />
                        <Link to="/about" className='btn btn-info'>About</Link>
                        <a href="https://google.com" target="_blank" rel="noopener noreferrer">Google</a>

                        <hr />
                        <Title level={2}>Button Component</Title>
                        <hr />
                        <Button type="primary" text={<Text className='text-warning'>Hero Section</Text>} />
                        <Button type="primary" variant="outline" text="Button" />
                        <Button type="secondary" text="ABC" />
                        <Button type="secondary" variant="outline" text="Ahmad" />
                        <Button type="success" text="Success" />
                        <Button type="success" variant="outline" text="Success" />
                        <Button type="danger" text="danger" />
                        <Button type="danger" variant="outline" text="danger" />
                        <Button type="warning" text="warning" />
                        <Button type="warning" variant="outline" text="warning" />
                        <Button type="info" text="info" />
                        <Button type="info" variant="outline" text="info" />

                        <hr />
                        <Title level={2}>Button Element</Title>
                        <hr />
                        <button className='btn btn-primary'>I'm a button</button>
                        <button className='btn btn-outline-primary'>I'm a button</button>
                        <button className='btn btn-secondary'>I'm a button</button>
                        <button className='btn btn-outline-secondary'>I'm a button</button>
                        <button className='btn btn-success'>I'm a button</button>
                        <button className='btn btn-outline-success'>I'm a button</button>
                        <button className='btn btn-danger'>I'm a button</button>
                        <button className='btn btn-outline-danger'>I'm a button</button>
                        <button className='btn btn-warning'>I'm a button</button>
                        <button className='btn btn-outline-warning'>I'm a button</button>
                        <button className='btn btn-info'>I'm a button</button>
                        <button className='btn btn-outline-info'>I'm a button</button>

                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Hero