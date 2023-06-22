import { Modal, Button, Form } from 'react-bootstrap'
import { createEmployee, fetchEmployee, updateEmployee } from '../http/employeeAPI.js'
import { fetchCafes } from '../http/cafeAPI.js'
import { useState, useEffect } from 'react'


const EditEmployee = (props) => {
    const { id, show, setShow, setChange } = props

    const [name, setName] = useState('');
    const [surname, setSurName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [position, setPosition] = useState('');
    const [contacts, setContacts] = useState('');
    const [cafeId, setCafeId] = useState('');    
    const [valid, setValid] = useState(null)
    const [options, setOptions] = useState(null)
    


    useEffect (() => {
        fetchCafes()
            .then(
                data => {                    
                    let list = data.map (item =>{
                       return <option key = {item.id} value={item.id} >{item.name}</option>  
                    });
                    setOptions(list);
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
        },[]
    )

    useEffect(() => {
        if(id) {
            fetchEmployee(id)
                .then(
                    data => {
                        setName(data.name);
                        setValid(data.name !== '');
                        setSurName(data.surname);
                        setValid(data.surname !== '');
                        setPatronymic(data.patronymic);
                        setValid(data.patronymic !== '');
                        setPosition(data.position);
                        setValid(data.position !== '');
                        setContacts(data.contacts);
                        setValid(data.contacts !== '');
                        setCafeId(data.cafeId);
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        } else {
            setName('');            
            setSurName('');            
            setPatronymic('');            
            setPosition('');
            setContacts('');            
            setValid(null)
        }
    }, [id])

    const handleChange = (event) => {
        setName(event.target.value)
        setValid(event.target.value.trim() !== '')
    }
    const handleSurChange = (event) => {
        setSurName(event.target.value)
        setValid(event.target.value.trim() !== '')
    }
    const handlePatrChange = (event) => {
        setPatronymic(event.target.value)
        setValid(event.target.value.trim() !== '')
    }
    const handlePosChange = (event) => {
        setPosition(event.target.value)
        setValid(event.target.value.trim() !== '')
    }
    const handleContChange = (event) => {
        setContacts(event.target.value)
        setValid(event.target.value.trim() !== '')
    }
    const handleCafeIdChange = (event) => {
        setCafeId(event.target.value)      
    }
    

    const handleSubmit = (event) => {
        event.preventDefault()
        const correct = (name.trim() !== ''&& surname.trim()!=='' 
                        && patronymic.trim() !=='' && position.trim()!=='' && contacts.trim()!=='' )
        setValid(correct)
        if (correct) {
            const data = {
                name: name.trim(),
                surname : surname.trim(),
                patronymic : patronymic.trim(),
                position : position.trim(),
                contacts : contacts.trim(),
                cafeId : cafeId
            }            
            const success = (data) => {
                // закрываем модальное окно создания-редактирования сотрудника
                setShow(false)
                // изменяем состояние родителя, чтобы обновить список сотрудников
                setChange(state => !state)
            }
            const error = (error) => alert(error.response.data.message)            
            id ? updateEmployee(id, data).then(success).catch(error) : createEmployee(data).then(success).catch(error)
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Редактирование' : 'Создание'} записи сотрудника</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="surname"
                        value={surname}
                        onChange={e => handleSurChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Фамилия..."
                        className="mb-3"
                    />                    
                    <Form.Control
                        name="name"
                        value={name}
                        onChange={e => handleChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Имя..."
                        className="mb-3"
                    />                    
                    <Form.Control
                        name="patronymic"
                        value={patronymic}
                        onChange={e => handlePatrChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Отчество..."
                        className="mb-3"
                    />
                    <Form.Control
                        name="position"
                        value={position}
                        onChange={e => handlePosChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Должность..."
                        className="mb-3"
                    />
                    <Form.Control
                        name="contacts"
                        value={contacts}
                        onChange={e => handleContChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Контакты..."
                        className="mb-3"
                    />
                    <Form.Select aria-label="Default select example"
                                 onChange={e => handleCafeIdChange(e)}
                                 value = {cafeId}
                    >
                        {options}
                    </Form.Select>

                    <Button type="submit">Сохранить</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditEmployee