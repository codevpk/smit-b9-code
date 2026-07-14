import { useState } from 'react'
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from 'antd'
import { useAuth } from '@/context/Auth'
import axios from 'axios'

const { Title } = Typography
const { Item } = Form

const initialState = { title: "", location: "", description: "", dueDate: "", status: "incompleted", visibility: "private" }

const Add = () => {

    const { user } = useAuth()

    const [state, setState] = useState(initialState)
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {

        let { title, location, description, dueDate, status, visibility } = state

        title = title.trim()
        location = location.trim()
        description = description.trim()

        if (title.length < 3) { return window.toastify("Please enter title correctly", "error") }
        if (location.length < 3) { return window.toastify("Please enter location correctly", "error") }
        if (description.length < 10) { return window.toastify("Please describe your todo correctly", "error") }
        if (!dueDate) { return window.toastify("Please select due date", "error") }

        const todo = { title, location, description, dueDate, status, visibility }

        const formData = new FormData();
        for (const key in todo) formData.append(key, todo[key])
        if (file) formData.append("file", file)

        const token = localStorage.getItem("token")
        const headers = { headers: { Authorization: `Bearer ${token}` } }
        axios.post(`${window.apiURL}/todos/create`, formData, headers)
            .then(({ status, data }) => {
                if (status === 201) {
                    const { message, todo } = data
                    console.log('todo', todo)
                    window.toastify(message, "success")
                }
            })
            .catch(error => {
                console.error("error", error)
                window.toastify("Something went wrong. Please try again.", "error")
            })
            .finally(() => {
                setIsProcessing(false)
            })

    }

    return (
        <main>
            <div className="card p-3 p-md-4 mx-auto" style={{ maxWidth: 500 }}>
                <Title level={1} className='text-center'>Add</Title>
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
                            <Item label="Image">
                                <input type="file" className='form-control' placeholder='Add todo image' accept='image/png' onChange={e => setFile(e.target.files[0])} />
                            </Item>
                        </Col>
                        <Col span={24}>
                            <Button type='primary' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Add</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    )
}

export default Add