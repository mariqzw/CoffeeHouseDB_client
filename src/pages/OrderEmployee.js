import { Container, Row, Col } from 'react-bootstrap'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import EmployeeBar from '../components/EmployeeBar.js'
import { AppContext } from '../components/AppContext.js'
import { fetchOrders } from '../http/orderAPI.js'
import OrdersList from '../components/OrdersList.js'


const OrderEmployee = observer(() => {
    const { coffeeHouse } = useContext(AppContext)
    useEffect(() => {          
        fetchOrders(coffeeHouse.employee)
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

            <OrdersList />

        </Container>
    )
})

export default OrderEmployee
