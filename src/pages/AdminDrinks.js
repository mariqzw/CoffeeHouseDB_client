import { useState, useEffect, useContext } from 'react'
import { fetchDrinks, deleteDrink } from '../http/drinkAPI.js'
import { Button, Container, Spinner, Table, Form } from 'react-bootstrap'
import EditDrink from '../components/EditDrink.js'
import { AppContext } from '../components/AppContext.js'

const AdminDrinks = () => {
    const [drinks, setDrinks] = useState(null) 
    const [fetching, setFetching] = useState(true) // загрузка списка напитков с сервера
    const [show, setShow] = useState(false) // модальное окно создания-редактирования
    const [change, setChange] = useState(false)
    const [drinkId, setDrinkId] = useState(0)
    const [price, setPrice] = useState(200)
    const [valid, setValid] = useState(0)

    const handleCreateClick = () => {
        setDrinkId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setDrinkId(id)
        setShow(true)
    }

    const handlePriceChange = (e) =>
    {
        setPrice((e.target.value))
        setChange(!change);
    }

    const handleDeleteClick = (id) => {
        deleteDrink(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Напиток «${data.name}» удален`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchDrinks(price)
            .then(
                data => {
                    setDrinks(data);
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
            <h1>Напитки</h1>
            <Button onClick={() => handleCreateClick()}>Создать новый напиток</Button>
            <Form.Control
                        name="price"
                        value={price}
                        onChange={e => handlePriceChange(e)}
                        // isValid={valid === true}
                        // isInvalid={valid === false}
                        placeholder="Цена напитка..."
                        className="mb-3"
                    />
            <EditDrink id={drinkId} show={show} setShow={setShow} setChange={setChange} />
            {drinks.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {drinks.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
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

export default AdminDrinks