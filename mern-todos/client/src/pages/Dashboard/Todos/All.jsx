import { useEffect, useState } from 'react'
import { Button, Col, Image, Row, Space, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import axios from 'axios'

const { Title } = Typography

const All = () => {

    const [todos, setTodos] = useState([])
    const [todoForEdit, setTodoForEdit] = useState({})

    const getDocuments = async () => {

        const token = localStorage.getItem("token")
        axios.get(`${window.apiURL}/todos/all`, { headers: { Authorization: `Bearer ${token}` } })
            .then(({ status, data }) => {
                if (status === 200) {
                    const { todos } = data
                    console.log('todos', todos)
                    setTodos(todos)
                }
            })
            .catch(({ response }) => {
                console.error("error", response)
            })
    }
    useEffect(() => { getDocuments() }, [])

    const handleUpdate = async () => {

        const updatedTodo = {
            title: "New", location: "New", description: "New"
        }

        const updatedTodos = todos.map((todo) => {
            if (todo.id === todoForEdit.id)
                return { ...todoForEdit, ...updatedTodo }
            return todo
        })

        setTodos(updatedTodos)

        window.toastify("A todo has been successfully updated.", "success")
        setTodoForEdit({})
    }

    const handleDelete = async (id) => {

        const filteredDocuments = todos.filter(todo => todo.id != id)

        setTodos(filteredDocuments)

        window.toastify("Todo deleted successfully", "success")
    }

    console.log('todos', todos)
    return (
        <div id='hero' className='py-5'>
            <div className="container">
                <Row>
                    <Col span={24} className='text-center'>
                        <Title level={1}>Todos All</Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        {/* <th>Created By</th> */}
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Location</th>
                                        <th>Description</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th>Visibility</th>
                                        <th>Created Time</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todos.map((todo, i) => {
                                        return (
                                            <tr key={i}>
                                                <th>{i + 1}</th>
                                                {/* <td>{todo.uid}</td> */}
                                                <td>{todo.image.url && <Image src={todo.image.url} width={64} className='rounded-circle shadow' />}</td>
                                                <td>{todo.title}</td>
                                                <td>{todo.location}</td>
                                                <td>{todo.description}</td>
                                                <td>{dayjs(todo.dueDate).format("ddd, D-MMM-YY, hh:mm A")}</td>
                                                <td><Tag color={todo.status === "completed" ? "success" : "purple"} className='text-capitalize'>{todo.status}</Tag></td>
                                                <td><Tag color={todo.visibility === "private" ? "blue" : "orange"} className='text-capitalize'>{todo.visibility}</Tag></td>
                                                <td>{dayjs(todo.createdAt).format("ddd, D-MMM-YYYY, hh:mm:ss A")}</td>
                                                <td>
                                                    <Space>
                                                        {!todoForEdit.id
                                                            ? <>
                                                                {/* <Button type='primary' size='small' onClick={() => { navigate("/dashboard/todos/edit/" + todo.id) }}>Edit</Button> */}
                                                                <Button type='primary' size='small' onClick={() => { setTodoForEdit(todo) }}>Edit</Button>
                                                                <Button type='primary' size='small' danger onClick={() => { handleDelete(todo.id) }}>Delete</Button>
                                                            </>
                                                            : <>
                                                                <Button type='primary' size='small' onClick={handleUpdate}>Save</Button>
                                                                <Button type='primary' size='small' danger onClick={() => { setTodoForEdit({}) }}>Discard</Button>
                                                            </>
                                                        }
                                                    </Space>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default All