import { Col, Row, Typography } from 'antd'

const { Title } = Typography

const PageNotFound = () => {
    return (
        <main>
            <div className="container">
                <Row>
                    <Col span={24} className='text-center'>
                        <Title level={1}>404</Title>
                        <Title level={2}>Page Not Found</Title>
                    </Col>
                </Row>
            </div>
        </main>
    )
}

export default PageNotFound