import { Row } from 'react-bootstrap'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import OrderItem from './OrderItem.js'
import { AppContext } from './AppContext.js'

const OrdersList = observer(() => {
    const { coffeeHouse } = useContext(AppContext)    
    return (
        <>
            <Row className="mb-3">
                {coffeeHouse.orders.length ? (
                    coffeeHouse.orders.map(item =>
                        <OrderItem key={item.id} data={item} />
                    )
                ) : (
                    <p className="m-3">По вашему запросу ничего не найдено</p>
                )}
            </Row>            
        </>
    )
})

export default OrdersList