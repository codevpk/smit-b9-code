import { useEffect, useState } from 'react'
import { Button, Checkbox, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from 'antd'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '@/config/firebase'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useAuth } from '@/context/Auth'
import { useParams } from 'react-router-dom'

const { Title } = Typography
const { Item } = Form

const initialState = { title: "", location: "", description: "", dueDate: "", status: "incompleted", visibility: "private" }

const Edit = () => {

    const { user } = useAuth()

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const params = useParams()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const getTodo = async () => {
        console.log('params', params)
        console.log('params.id', params.id)

        const docSnap = await getDoc(doc(firestore, "todos", params.id));
        if (docSnap.exists()) {
            const todo = docSnap.data()
            console.log('todo', todo)
        }

    }
    useEffect(() => { getTodo() }, [])

    const handleSubmit = async () => {

        let { title, location, description, dueDate, status, visibility } = state

        title = title.trim()
        location = location.trim()
        description = description.trim()

        if (title.length < 3) { return window.toastify("Please enter title correctly", "error") }
        if (location.length < 3) { return window.toastify("Please enter location correctly", "error") }
        if (description.length < 10) { return window.toastify("Please describe your todo correctly", "error") }
        if (!dueDate) { return window.toastify("Please select due date", "error") }

        const todo = {
            title, location, description, dueDate, status, visibility,
            createdAt: serverTimestamp(),
            id: window.getRandomId(),
            uid: user.id
        }

        setIsProcessing(true)
        try {
            await setDoc(doc(firestore, "todos", todo.id), todo)
            window.toastify("A new todo has been successfully created.", "success")
        } catch (error) {
            console.error('error', error)
            window.toastify("Todo not created.", "error")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <main>
            <div className="card p-3 p-md-4 mx-auto" style={{ maxWidth: 500 }}>
                <Title level={1} className='text-center'>Update Todo</Title>
                <Form layout='vertical'>
                    <Row>
                        <Col span={24}>
                            <Item label="Title" required>
                                <Input type="text" size='large' placeholder='Enter title' name='title' onChange={handleChange} />
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Item label="Location" required>
                                <Input type="text" size='large' placeholder='Enter location' name='location' onChange={handleChange} />
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Item label="Description" required>
                                <Input.TextArea size='large' placeholder='Describe your todo' rows={3} style={{ resize: "none" }} name='description' onChange={handleChange} />
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Item label="Due Date" required>
                                <DatePicker showTime size='large' className='w-100' onChange={(obj, date) => { { setState(s => ({ ...s, dueDate: date })) } }} />
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Item label="Status" required>
                                <Select placeholder="Select status" defaultValue="incompleted" onChange={value => { setState(s => ({ ...s, status: value })) }}
                                    options={[
                                        { label: "Completed", value: "completed" },
                                        { label: "Incompleted", value: "incompleted" },
                                    ]} />
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Item label="Visibility" required>
                                <Radio.Group block defaultValue="private" name="visibility" onChange={handleChange}
                                    options={[
                                        { label: "Private", value: "private" },
                                        { label: "Public", value: "public" },
                                    ]}
                                />
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Button type='primary' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Update</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    )
}

export default Edit