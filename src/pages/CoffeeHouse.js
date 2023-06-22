import { Container, Row, Col } from 'react-bootstrap'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import CafeBar from '../components/CafeBar.js'
import { AppContext } from '../components/AppContext.js'
import { fetchEmployees } from '../http/employeeAPI.js'
import EmployeesList from '../components/EmployeesList.js'


const CoffeeHouse = observer(() => {
    const { coffeeHouse } = useContext(AppContext)
    useEffect(() => {          
        fetchEmployees(coffeeHouse.cafe)
            .then(data => {
                coffeeHouse.employees = data.rows;                                
            })          
// обновляем при изменении coffeeHouse.cafe
    }, [coffeeHouse.cafe])    
    
    return (
        <Container>
            <Row className="mt-2">            
                <Col md={9}>
                    <CafeBar />                                                
                </Col>
            </Row>

            <EmployeesList />

        </Container>
    )
})

export default CoffeeHouse
