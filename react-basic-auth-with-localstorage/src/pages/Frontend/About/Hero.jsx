import { Button, Col, Row, Typography } from 'antd'

const { Title, Paragraph, Text } = Typography

const Hero = () => {

    const handleSubmit = (num1, num2) => {
        console.log("Form submitted" + num1 + num2)
    }

    const cars = ['Ford', 'BMW', 'Audi'];

    const users = [
        {
            id: 1,
            name: "Ali Raza",
            age: 28,
            city: "Lahore",
            email: "ali.raza@example.com",
            phone: "+92-337-8659969",
            isActive: true,
            role: "Developer"
        },
        {
            id: 2,
            name: "Fatima Khan",
            age: 25,
            city: "Karachi",
            email: "fatima.khan@example.com",
            phone: "+92-301-2345678",
            isActive: false,
            role: "Designer"
        },
        {
            id: 3,
            name: "Umair Ahmad",
            age: 32,
            city: "Islamabad",
            email: "umair.ahmad@example.com",
            phone: "+92-335-6609060",
            isActive: true,
            role: "Project Manager"
        },
        {
            id: 4,
            name: "Ayesha Malik",
            age: 27,
            city: "Faisalabad",
            email: "ayesha.malik@example.com",
            phone: "+92-303-4567890",
            isActive: true,
            role: "QA Engineer"
        },
        {
            id: 5,
            name: "Bilal Hussain",
            age: 30,
            city: "Multan",
            email: "bilal.hussain@example.com",
            phone: "+92-304-5678901",
            isActive: false,
            role: "DevOps Engineer"
        }
    ];

    return (
        <div>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title level={1}>About</Title>
                        <Paragraph>Hero Section</Paragraph>
                        <Text>Hero Section</Text>

                        <hr />

                        <Button type='primary' size='large' onClick={() => { handleSubmit(1, 2) }}>Click Me</Button>

                        <hr />
                        <Title level={2}>Cars</Title>
                        <hr />

                        {cars.map((car, i) => <Title level={4} key={i}>{car}</Title>)}

                        <hr />
                        <Title level={2}>Users</Title>
                        <hr />

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
                                    const { id, name, age, city, email, phone, role, isActive } = user
                                    return <tr key={i}>
                                        <th>{id}</th>
                                        <td>{name}</td>
                                        <td>{age}</td>
                                        <td>{city}</td>
                                        <td><a href={`mailto:${email}`}>{email}</a></td>
                                        <td><a href={`tel:${phone.replaceAll("-", "")}`}>{phone}</a></td>
                                        <td><a href={`https://wa.me/${phone.replaceAll("-", "")}`} target="_blank" rel="noopener noreferrer">{phone}</a></td>
                                        <td>{role}</td>
                                        <td>{isActive ? "Active" : "Inactive"}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default Hero