import { Col, Row, Typography } from 'antd'

const { Title } = Typography

const Hero = () => {
    return (
        <div id='hero' className='py-5'>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title level={1} className='text-center'>Home</Title>
                        <Title level={2} className='text-center'>Hero</Title>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Hero