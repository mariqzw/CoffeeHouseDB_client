import { Row } from 'react-bootstrap'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import DeliveryItem from './DeliveryItem.js'
import { AppContext } from './AppContext.js'

const DeliverysList = observer(() => {
    const { coffeeHouse } = useContext(AppContext)    
    return (
        <>
            <Row className="mb-3">
                {coffeeHouse.orders.length ? (
                    coffeeHouse.orders.map(item =>
                        <DeliveryItem key={item.id} data={item} />
                    )
                ) : (
                    <p className="m-3">По вашему запросу ничего не найдено</p>
                )}
            </Row>            
        </>
    )
})

export default DeliverysList