import { Modal, Button, Form } from 'react-bootstrap'
import { createDessert, fetchDessert, updateDessert } from '../http/dessertAPI.js'
import { useState, useEffect } from 'react'

const EditDessert = (props) => {
    const { id, show, setShow, setChange } = props

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [valid, setValid] = useState(null)

    useEffect(() => {
        if(id) {
            fetchDessert(id)
                .then(
                    data => {
                        setName(data.name)
                        setValid(data.name !== '')
                        setPrice(data.price)
                        setValid(data.price !== '')
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        } else {
            setName('')
            setPrice('')
            setValid(null)
        }
    }, [id])

    const handleChange = (event) => {
        setName(event.target.value)
        setValid(event.target.value.trim() !== '')
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value)
        setValid(event.target.value.trim() !== '')
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const correct = name.trim() !== ''
        setValid(correct)
        if (correct) {
            const data = {
                name: name.trim(),
                price : price.trim()                
            }
            const success = (data) => {
                // закрываем модальное окно создания-редактирования
                setShow(false)
                setChange(state => !state)
            }
            const error = (error) => alert(error.response.data.message)
            
            id ? updateDessert(id, data).then(success).catch(error) : createDessert(data).then(success).catch(error)
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Редактирование' : 'Создание'} десерта</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="name"
                        value={name}
                        onChange={e => handleChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Название десерта"
                        className="mb-3"
                    />
                    <Form.Control
                        name="price"
                        value={price}
                        onChange={e => handlePriceChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Цена десерта"
                        className="mb-3"
                    />
                    <Button type="submit">Сохранить</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditDessert