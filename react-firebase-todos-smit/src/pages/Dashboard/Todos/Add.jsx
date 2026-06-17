import { useState } from 'react'
import { Button, Checkbox, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from 'antd'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore, storage } from '@/config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useAuth } from '@/context/Auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { supabase } from '@/config/supabase'

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

        const todo = {
            title, location, description, dueDate, status, visibility,
            createdAt: serverTimestamp(),
            id: window.getRandomId(),
            uid: user.id,
            imageURL: ""
        }

        setIsProcessing(true)
        if (file) {
            uploadFile(todo)
        } else {
            createDoc(todo)
        }

    }

    const uploadFile = async (todo) => {

        const fileName = window.getRandomId() + "-" + file.name

        const { data, error } = await supabase.storage.from('todos').upload(fileName, file)
        if (error) {
            console.error(error)
            setIsProcessing(false)
        } else {
            console.log('data', data)
            const url = import.meta.env.VITE_SUPABASE_URL + "/storage/v1/object/public/" + data.fullPath
            todo.imageURL = url

            createDoc(todo)
        }


    }
    // const uploadFile = async (todo) => {

    //     const fileName = window.getRandomId() + "-" + file.name

    //     // Upload file and metadata to the object 'images/mountains.jpg'
    //     const storageRef = ref(storage, 'images/' + fileName);
    //     const uploadTask = uploadBytesResumable(storageRef, file);

    //     // Listen for state changes, errors, and completion of the upload.
    //     uploadTask.on('state_changed',
    //         (snapshot) => {
    //             // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //             const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //             console.log('Upload is ' + progress + '% done');
    //         },
    //         (error) => {
    //             console.error(error)
    //             window.toastify("Something went wrong while file uploading.", "error")
    //         },
    //         () => {
    //             // Upload completed successfully, now we can get the download URL
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 console.log('File available at', downloadURL);
    //                 todo.imageURL = downloadURL
    //             });
    //         }
    //     );

    //     todo.imageURL = "https://i.postimg.cc/QC3pf5P9/Screenshot-(3).png"

    //     createDoc(todo)

    // }

    const createDoc = async (todo) => {
        try {
            await setDoc(doc(firestore, "todos", todo.id), todo)
            console.log('todo.id', todo.id)
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