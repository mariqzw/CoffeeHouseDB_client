import { useState, useEffect, useContext } from 'react'
import { fetchCafes, deleteCafe } from '../http/cafeAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import EditCafe from '../components/EditCafe.js'
import { AppContext } from '../components/AppContext.js'

const AdminCafes = () => {
    const { coffeeHouse } = useContext(AppContext)
    const [cafes, setCafes] = useState(null) // список загруженных кофеен
    const [fetching, setFetching] = useState(true) // загрузка списка кофеен с сервера
    const [show, setShow] = useState(false) // модальное окно создания-редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id кофейни, которую будем редактировать — для передачи в <EditCafe id={…} />
    const [cafeId, setCafeId] = useState(0)

    const handleCreateClick = () => {
        setCafeId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setCafeId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteCafe(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Кафе «${data.name}» удалено`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchCafes()
            .then(
                data => {
                    setCafes(data);
                    coffeeHouse.cafes = data
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
            <h1>Кофейни</h1>
            <Button onClick={() => handleCreateClick()}>Создать новую кофейню</Button>
            <EditCafe id={cafeId} show={show} setShow={setShow} setChange={setChange} />
            {cafes.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Адрес</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {cafes.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
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
                <p>Список пустой</p>
            )}
        </Container>
    )
}

export default AdminCafes