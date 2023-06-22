import { Modal, Button, Form } from 'react-bootstrap'
import { createCafe, fetchCafe, updateCafe } from '../http/cafeAPI.js'
import { useState, useEffect } from 'react'

const EditCafe = (props) => {
    const { id, show, setShow, setChange } = props

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [valid, setValid] = useState(null)

    useEffect(() => {
        if(id) {
            fetchCafe(id)
                .then(
                    data => {
                        setName(data.name)
                        setValid(data.name !== '')
                        setAddress(data.addres)
                        setValid(data.addres !== '')
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        } else {
            setName('')
            setAddress('')
            setValid(null)
        }
    }, [id])

    const handleChange = (event) => {
        setName(event.target.value)
        setValid(event.target.value.trim() !== '')
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value)
        setValid(event.target.value.trim() !== '')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const correct = name.trim() !== ''
        setValid(correct)
        if (correct) {
            const data = {
                name: name.trim(),
                address : address.trim()                
            }
            const success = (data) => {
                // закрываем модальное окно создания-редактирования кафе
                setShow(false)
                // изменяем состояние родителя, чтобы обновить список кафе
                setChange(state => !state)
            }
            const error = (error) => alert(error.response.data.message)
            
            id ? updateCafe(id, data).then(success).catch(error) : createCafe(data).then(success).catch(error)
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Редактирование' : 'Создание'} кофейни</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="name"
                        value={name}
                        onChange={e => handleChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Название кофейни"
                        className="mb-3"
                    />
                    <Form.Control
                        name="address"
                        value={address}
                        onChange={e => handleAddressChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Адрес кофейни"
                        className="mb-3"
                    />
                    <Button type="submit">Сохранить</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditCafe