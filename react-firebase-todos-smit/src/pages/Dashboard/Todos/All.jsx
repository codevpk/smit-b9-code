import { firestore } from '@/config/firebase'
import { useAuth } from '@/context/Auth'
import { Button, Col, Image, Row, Space, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import { collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const All = () => {

    const { user } = useAuth()

    const [todos, setTodos] = useState([])
    const [todoForEdit, setTodoForEdit] = useState({})

    const navigate = useNavigate()

    const getDocuments = async () => {
        const q = query(collection(firestore, "todos"), where("uid", "==", user.id), orderBy("createdAt", "desc"))

        const array = []

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => {
            const todo = doc.data()
            array.push(todo)
        })

        setTodos(array)
    }
    useEffect(() => { getDocuments() }, [])

    const handleUpdate = async () => {
        console.log('todoForEdit', todoForEdit)

        const updatedTodo = {
            title: "New", location: "New", description: "New",
            updatedAt: serverTimestamp()
        }

        try {
            await setDoc(doc(firestore, "todos", todoForEdit.id), updatedTodo, { merge: true })

            const updatedTodos = todos.map((todo) => {
                if (todo.id === todoForEdit.id)
                    return { ...todoForEdit, ...updatedTodo }
                return todo
            })

            setTodos(updatedTodos)

            window.toastify("A todo has been successfully updated.", "success")
            setTodoForEdit({})
        } catch (error) {
            console.error('error', error)
            window.toastify("Todo not updated.", "error")
        } finally {
            setIsProcessing(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(firestore, "todos", id))

            const filteredDocuments = todos.filter(todo => todo.id != id)

            setTodos(filteredDocuments)

            window.toastify("Todo deleted successfully", "success")
        } catch (error) {
            console.error(error)
            window.toastify("Todo not deleted", "error")
        }
    }


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
                                                <td>{todo.imageURL && <Image src={todo.imageURL} width={64} className='rounded-circle shadow' />}</td>
                                                <td>{todo.title}</td>
                                                <td>{todo.location}</td>
                                                <td>{todo.description}</td>
                                                <td>{dayjs(todo.dueDate).format("ddd, D-MMM-YY, hh:mm A")}</td>
                                                <td><Tag color={todo.status === "completed" ? "success" : "purple"} className='text-capitalize'>{todo.status}</Tag></td>
                                                <td><Tag color={todo.visibility === "private" ? "blue" : "orange"} className='text-capitalize'>{todo.visibility}</Tag></td>
                                                <td>{dayjs(todo.createdAt.toDate()).format("ddd, D-MMM-YYYY, hh:mm:ss A")}</td>
                                                <td>
                                                    <Space>
                                                        {!todoForEdit.id
                                                            ? <>
                                                                <Button type='primary' size='small' onClick={() => { navigate("/dashboard/todos/edit/" + todo.id) }}>Edit</Button>
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