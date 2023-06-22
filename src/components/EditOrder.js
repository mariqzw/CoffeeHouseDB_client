import { Modal, Button, Form } from 'react-bootstrap'
import { createOrder, fetchOrder, updateOrder } from '../http/orderAPI.js'
import { fetchEmployees } from '../http/employeeAPI.js'
import { useState, useEffect } from 'react'


const EditOrder = (props) => {
    const { id, show, setShow, setChange } = props

    const [date, setDate] = useState('');
    const [clientname, setClientname] = useState('');
    const [address, setAddress] = useState('');
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
            fetchOrder(id)
                .then(
                    data => {
                        setDate(data.date);
                        setValid(data.date !== '');
                        setClientname(data.clientname);
                        setValid(data.clientname !== '');
                        setAddress(data.address);
                        setValid(data.address !== '');
                        setEmployeeId(data.employeeId);
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        } else {
            setDate('');            
            setClientname('');            
            setAddress('');                       
            setValid(null)
        }
    }, [id])

    const handleChange = (event) => {
        setDate(event.target.value)
        setValid(event.target.value.trim() !== '')
    }
    const handleClientnameChange = (event) => {
        setClientname(event.target.value)
        setValid(event.target.value.trim() !== '')
    }
    const handleAddresshange = (event) => {
        setAddress(event.target.value)
        setValid(event.target.value.trim() !== '')
    }
    const handleEmployeeIdChange = (event) => {
        setEmployeeId(event.target.value)      
    }
    

    const handleSubmit = (event) => {
        event.preventDefault()

        const correct = (date.trim() !== ''&& clientname.trim()!=='' 
                        && address.trim() )
        setValid(correct)
        if (correct) {
            const data = {
                date: date.trim(),
                clientname : clientname.trim(),
                address : address.trim(),
                employeeId : employeeId
            }            
            const success = (data) => {
                setShow(false)
                setChange(state => !state)
            }
            const error = (error) => alert(error.response.data.message)            
            id ? updateOrder(id, data).then(success).catch(error) : createOrder(data).then(success).catch(error)
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Редактирование' : 'Создание'} заказа</Modal.Title>
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
                        name="clientname"
                        value={clientname}
                        onChange={e => handleClientnameChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Имя клиента"
                        className="mb-3"
                    />                     
                    <Form.Control
                        name="address"
                        value={address}
                        onChange={e => handleAddresshange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Адрес"
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

export default EditOrder