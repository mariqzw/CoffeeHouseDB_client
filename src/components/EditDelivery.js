import { Modal, Button, Form } from 'react-bootstrap'
import { createDelivery, fetchDelivery, updateDelivery } from '../http/deliveryAPI.js'
import { fetchEmployees } from '../http/employeeAPI.js'
import { useState, useEffect } from 'react'


const EditDelivery = (props) => {
    const { id, show, setShow, setChange } = props

    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [employeeId, setEmployeeId] = useState('');    
    const [valid, setValid] = useState(null)
    const [options, setOptions] = useState(null)
    


    useEffect (() => {
        fetchEmployees()
            .then(
                data => {  console.log('useEffect', data)                  
                    let list = data.rows.map (item =>{
                       return <option key = {item.id} value={item.id} >{item.name}</option>  
                    });
                    setOptions(list);
                }
            )
            .catch(
                error => alert(error)
            )
        },[]
    )

    useEffect(() => {
        if(id) {
            fetchDelivery(id)
                .then(
                    data => {
                        setDate(data.date);
                        setValid(data.date !== '');
                        setQuantity(data.quantity);
                        setValid(data.quantity !== '');
                        setEmployeeId(data.employeeId);
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        } else {
            setDate('');                       
            setQuantity('');                       
            setValid(null)
        }
    }, [id])

    const handleChange = (event) => {
        setDate(event.target.value)
        setValid(event.target.value.trim() !== '')
    }
    const handleQuantityhange = (event) => {
        setQuantity(event.target.value)
        setValid(event.target.value.trim() !== '')
    }
    const handleEmployeeIdChange = (event) => {
        setEmployeeId(event.target.value)      
    }
    

    const handleSubmit = (event) => {
        event.preventDefault()
        const correct = (date.trim() !== '' && quantity.trim() )
        setValid(correct)
        if (correct) {
            const data = {
                date: date.trim(),
                quantity : quantity.trim(),
                employeeId : employeeId
            }            
            const success = (data) => {
                // закрываем модальное окно создания-редактирования
                setShow(false)
                // изменяем состояние родителя, чтобы обновить список
                setChange(state => !state)
            }
            const error = (error) => alert(error.response.data.message)            
            id ? updateDelivery(id, data).then(success).catch(error) : createDelivery(data).then(success).catch(error)
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Редактирование' : 'Создание'} поставки</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>                   
                    <Form.Control
                        name="date"
                        value={date}
                        onChange={e => handleChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Дата"
                        className="mb-3"
                    />                   
                    <Form.Control
                        name="quantity"
                        value={quantity}
                        onChange={e => handleQuantityhange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Количество"
                        className="mb-3"
                    />
                    <Form.Select aria-label="Default select example"
                                 onChange={e => handleEmployeeIdChange(e)}
                                 value = {employeeId}
                    >
                        {options}
                    </Form.Select>

                    <Button type="submit">Сохранить</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditDelivery