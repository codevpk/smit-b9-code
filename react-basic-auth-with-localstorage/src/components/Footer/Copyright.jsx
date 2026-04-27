import { Col, Row, Typography } from "antd"

const { Paragraph } = Typography


const Copyright = () => {
    const year = new Date().getFullYear()
    return (
        <footer className="bg-primary py-2">
            <div className="container">
                <Row>
                    <Col span={24}>
                        {/* <Paragraph className="mb-0 text-center text-white">&copy; {year}. All Rights Reserved.</Paragraph> */}
                        <Paragraph style={{ marginBottom: 0, textAlign: "center", color: "white" }}>&copy; {year}. All Rights Reserved.</Paragraph>
                    </Col>
                </Row>
            </div>
        </footer>
    )
}

export default Copyright