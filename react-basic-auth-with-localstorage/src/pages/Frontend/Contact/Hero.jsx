import { Col, Row, Typography } from 'antd'

const { Title, Paragraph, Text } = Typography

const Hero = () => {
    return (
        <div>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title level={1}>Contact</Title>
                        <Paragraph>Hero Section</Paragraph>
                        <Text>Hero Section</Text>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Hero