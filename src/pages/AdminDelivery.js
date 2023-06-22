import { useState, useEffect } from 'react'
import { fetchDeliverys, deleteDelivery } from '../http/deliveryAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import EditDelivery from '../components/EditDelivery.js'

const AdminDeliverys = () => {
    const [deliverys, setDeliverys] = useState(null) 
    const [fetching, setFetching] = useState(true) // загрузка списка поставок с сервера
    const [show, setShow] = useState(false) // модальное окно создания-редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    const [deliveryId, setDeliveryId] = useState(0)

    const handleCreateClick = () => {
        setDeliveryId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setDeliveryId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteDelivery(id)
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
        fetchDeliverys()
            .then(                
                data => {
                    setDeliverys(data.rows);  
                    
                }
            )
            .finally(
                () => setFetching(false)
            )
    }, [change])

    if (fetching) {
        return <Spinner animation="bdelivery" />
    }

    return (
        <Container>
            <h1>Поставки</h1>
            <Button onClick={() => handleCreateClick()}>Новая поставка</Button>
            <EditDelivery id={deliveryId} show={show} setShow={setShow} setChange={setChange} />
            {deliverys.length > 0 ? (
                <Table bdeliveryed hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Количество</th>
                        <th>Сотрудник</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {deliverys.map(item => 
                        <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.quantity}</td>                           
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
                <p>Список поставок пустой</p>
            )}
        </Container>
    )
}

export default AdminDeliverys