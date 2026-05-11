import { useState } from "react"
import { Button, Col, ColorPicker, Row, Typography } from 'antd'

const { Title } = Typography

const UseState = () => {

    const [color, setColor] = useState("white")
    const [backgroundColor, setBackgroundColor] = useState("#1d3557")
    const [fullName, setFullName] = useState("Umair")

    const handleClick = () => {
        let color = "green"
        setColor(color)

        setFullName("Hamid")
    }


    return (
        <main className="py-5" style={{ backgroundColor }}>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title level={1} className='text-center mt-5' style={{ color }}>UseState</Title>
                        <Title level={2} className='text-center mt-5' style={{ color }}>{fullName}</Title>
                        <Button type="primary" size="large" onClick={handleClick}>Click</Button>
                        <hr />
                        <ColorPicker onChange={(obj, color) => { setBackgroundColor(color) }} />
                    </Col>
                </Row>
            </div>
        </main>
    )
}

export default UseState