import { Col, Row, Typography } from 'antd'

const { Title, Paragraph, Text } = Typography

const Services = () => {
    return (
        <div>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title level={1}>Services Section</Title>
                        <Title level={2}>Services Section</Title>
                        <Title level={3}>Services Section</Title>
                        <Title level={4}>Services Section</Title>
                        <Title level={5}>Services Section</Title>
                        <Paragraph>Services Section</Paragraph>
                        <Text>Services Section</Text>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Services