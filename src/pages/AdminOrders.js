import { useState, useEffect } from 'react'
import { fetchOrders, deleteOrder } from '../http/orderAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import EditOrder from '../components/EditOrder.js'

const AdminOrders = () => {
    const [orders, setOrders] = useState(null) 
    const [fetching, setFetching] = useState(true) 
    const [show, setShow] = useState(false)
    const [change, setChange] = useState(false)
    const [orderId, setOrderId] = useState(0)

    const handleCreateClick = () => {
        setOrderId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setOrderId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteOrder(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Сотрудник «${data.name}» удалён`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchOrders()
            .then(                
                data => {
                    setOrders(data.rows);  
                    
                }
            )
            .finally(
                () => setFetching(false)
            )
    }, [change])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>Заказы</h1>
            <Button onClick={() => handleCreateClick()}>Новый заказ</Button>
            <EditOrder id={orderId} show={show} setShow={setShow} setChange={setChange} />
            {orders.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Имя клиента</th>
                        <th>Адрес</th>
                        <th>Сотрудник</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(item => 
                        <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.clientname}</td>
                            <td>{item.address}</td>                            
                            <td>{item.employee.name}</td>                            
                            <td>
                                <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                                    Редактировать
                                </Button>
                            </td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
                </Table>
            ) : (
                <p>Список заказов пустой</p>
            )}
        </Container>
    )
}

export default AdminOrders