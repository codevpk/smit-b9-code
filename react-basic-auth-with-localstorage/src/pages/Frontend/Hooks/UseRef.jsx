import { useRef } from 'react'
import { Button, Col, Divider, Row, Typography } from 'antd'
import { useAuth } from '@/context/Auth'

import naat from "@/assets/audios/naat.mp3"

const { Title } = Typography

const UseRef = () => {

    const { user, dispatch } = useAuth()
    const audioPlayer = useRef(null)

    const handlePlay = () => {
        // console.log('audioPlayer', audioPlayer)
        audioPlayer.current.play()
    }
    const handlePause = () => {
        audioPlayer.current.pause()
    }

    return (
        <main className='py-5'>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title level={1} className='text-center'>UseRef</Title>
                        <Button type='primary' onClick={handlePlay}>Play</Button>
                        <Button type='primary' onClick={handlePause}>Pause</Button>

                        <Divider className='my-5'>Context</Divider>
                        <Button type='primary' onClick={() => { dispatch({ type: "SET_LOGIN", payload: { user: { fullName: "Talha", email: "talha@gmail.com" } } }) }}>Change Name</Button>
                        <Title level={2} className='text-center'>{user.fullName}</Title>

                        <Divider className='my-5'>Audio Player</Divider>

                        <audio ref={audioPlayer} src={naat}></audio>
                    </Col>
                </Row>
            </div>
        </main>
    )
}

export default UseRef