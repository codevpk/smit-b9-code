import { useEffect, useState } from 'react'
import { Button, Col, Row, Spin, Typography } from 'antd'

const { Title } = Typography

const UseEffect = () => {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [color, setColor] = useState("blue")

    useEffect(() => {

        setIsLoading(true)

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => { console.log(json); setUsers(json) })
            .catch((error) => {
                console.error('error', error)
            })
            .finally(() => {
                setIsLoading(false)
            })

        console.log('color', color)

    }, [color])

    return (
        <main className='py-5'>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title level={1} className='text-center mb-5'>UseEffect</Title>

                        {isLoading && <div className='text-center'><Spin size='large' /></div>}

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>UID</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>City</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>WhatsApp</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, i) => {
                                        const { id, name, username, address, email, phone, website, isActive } = user
                                        return <tr key={i}>
                                            <th>{id}</th>
                                            <td>{name}</td>
                                            <td>{username}</td>
                                            <td>{address.city}</td>
                                            <td><a href={`mailto:${email}`}>{email}</a></td>
                                            <td><a href={`tel:${phone.replaceAll("-", "")}`}>{phone}</a></td>
                                            <td><a href={`https://wa.me/${phone.replaceAll("-", "")}`} target="_blank" rel="noopener noreferrer">{phone}</a></td>
                                            <td><a href={`https://${website}`} target="_blank" rel="noopener noreferrer">{website}</a></td>
                                            <td>{isActive ? "Active" : "Inactive"}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Button type='primary' size='large' onClick={() => { setColor(window.getRandomId()) }}>Change color</Button>
                    </Col>
                </Row>
            </div>
        </main>
    )
}

export default UseEffect