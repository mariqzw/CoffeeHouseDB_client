import { ListGroup } from 'react-bootstrap'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { AppContext } from './AppContext.js'

const CafeBar = observer(() => {
    const { coffeeHouse } = useContext(AppContext)
    const handleClick = (id) => {
        if (id === coffeeHouse.cafe) {
            coffeeHouse.cafe = null 
        } else {
            coffeeHouse.cafe = id
        }
    }

    return (
        <ListGroup horizontal>
            {coffeeHouse.cafes.map(item =>
                <ListGroup.Item
                    key={item.id}
                    active={item.id === coffeeHouse.cafe}
                    onClick={() => handleClick(item.id)}
                    style={{cursor: 'pointer'}}
                >
                    {item.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default CafeBar