import { useState, useEffect } from 'react'
import { fetchEmployees, deleteEmployee } from '../http/employeeAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import EditEmployee from '../components/EditEmployee.js'

const AdminEmployees = () => {
    const [employees, setEmployees] = useState(null) // список загруженных сотрудников
    const [fetching, setFetching] = useState(true) // загрузка списка сотрудников с сервера
    const [show, setShow] = useState(false) // модальное окно создания-редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id сотрудника, который будем редактировать — для передачи в <EditEmployee id={…} />
    const [employeeId, setEmployeeId] = useState(0)

    const handleCreateClick = () => {
        setEmployeeId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setEmployeeId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteEmployee(id)
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
        fetchEmployees()
            .then(                
                data => {
                    setEmployees(data.rows);  
                    
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
            <h1>Сотрудники</h1>
            <Button onClick={() => handleCreateClick()}>Новый сотрудник</Button>
            <EditEmployee id={employeeId} show={show} setShow={setShow} setChange={setChange} />
            {employees.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Должность</th>
                        <th>Контакты</th>
                        <th>Кофейня</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(item => 
                        <tr key={item.id}>
                            <td>{item.surname}</td>
                            <td>{item.name}</td>
                            <td>{item.patronymic}</td>
                            <td>{item.position}</td>
                            <td>{item.contacts}</td>                             
                            <td>{item.cafe.name}</td>                            
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
                <p>Список сотрудников пустой</p>
            )}
        </Container>
    )
}

export default AdminEmployees