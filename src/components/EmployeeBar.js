import { ListGroup } from 'react-bootstrap'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { AppContext } from './AppContext.js'

const EmployeeBar = observer(() => {
    const { coffeeHouse } = useContext(AppContext)
    const handleClick = (id) => {
        if (id === coffeeHouse.employee) {
            coffeeHouse.employee = null 
        } else {
            coffeeHouse.employee = id
        }
    }

    return (
        <ListGroup horizontal>
            {coffeeHouse.employees.map(item =>
                <ListGroup.Item
                    key={item.id}
                    active={item.id === coffeeHouse.employee}
                    onClick={() => handleClick(item.id)}
                    style={{cursor: 'pointer'}}
                >
                    {item.surname}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default EmployeeBar