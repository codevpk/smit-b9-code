import { useEffect, useState } from "react";
import { Col, Image, Row, Spin, Tag, Typography } from "antd";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import dayjs from "dayjs";

const { Title } = Typography;

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const getDocuments = async () => {
    const q = query(collection(firestore, "todos"), where("visibility", "==", "public"), orderBy("createdAt", "desc"),);

    const array = [];

    setIsLoading(true)

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      const todo = document.data();
      // const docSnap = await getDoc(doc(firestore, "users", todo.uid));
      // if (docSnap.exists()) {
      //   const user = docSnap.data()
      //   todo.createdBy = user.fullName
      // }
      array.push(todo);
    });

    setTodos(array);

    setIsLoading(false)
  };
  useEffect(() => { getDocuments() }, []);

  return (
    <main className="py-5">
      <div className="container">
        <Row>
          <Col span={24} className="text-center">
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
                    <th>Image</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Created Time</th>
                    <th>Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo, i) => {
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>
                          {todo.imageURL && (
                            <Image
                              src={todo.imageURL}
                              width={64}
                              className="rounded-circle shadow"
                            />
                          )}
                        </td>
                        <td>{todo.title}</td>
                        <td>{todo.location}</td>
                        <td>{todo.description}</td>
                        <td>
                          {dayjs(todo.dueDate).format("ddd, D-MMM-YY, hh:mm A")}
                        </td>
                        <td>
                          <Tag
                            color={
                              todo.status === "completed" ? "success" : "purple"
                            }
                            className="text-capitalize"
                          >
                            {todo.status}
                          </Tag>
                        </td>
                        <td>
                          {dayjs(todo.createdAt.toDate()).format(
                            "ddd, D-MMM-YYYY, hh:mm:ss A",
                          )}
                        </td>
                        <td>{todo.uid}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {isLoading && <div className="flex-center py-5"><Spin size="large" /></div>}
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
};

export default Todos;
