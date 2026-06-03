import { Col, Row, Typography } from 'antd'

const { Title } = Typography

const Add = () => {

    return (
        <div id='hero' className='py-5'>
            <div className="container">
                <Row>
                    <Col span={24} className='text-center'>
                        <Title level={1}>Todos Add</Title>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Add