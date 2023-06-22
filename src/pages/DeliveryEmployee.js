import { Container, Row, Col } from 'react-bootstrap'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import EmployeeBar from '../components/EmployeeBar.js'
import { AppContext } from '../components/AppContext.js'
import { fetchDeliverys } from '../http/deliveryAPI.js'
import DeliverysList from '../components/DeliverysList.js'


const DeliveryEmployee = observer(() => {
    const { coffeeHouse } = useContext(AppContext)
    useEffect(() => {          
        fetchDeliverys(coffeeHouse.employee)
            .then(data => {
                coffeeHouse.orders = data.rows;                                
            })          
// обновляем при изменении coffeeHouse.employee
    }, [coffeeHouse.employee])    
    
    return (
        <Container>
            <Row className="mt-2">            
                <Col md={9}>
                    <EmployeeBar />                                                
                </Col>
            </Row>

            <DeliverysList />

        </Container>
    )
})

export default DeliveryEmployee
