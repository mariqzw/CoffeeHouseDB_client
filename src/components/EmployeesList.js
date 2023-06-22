import { Row } from 'react-bootstrap'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import EmployeeItem from './EmployeeItem.js'
import { AppContext } from './AppContext.js'

const EmployeesList = observer(() => {
    const { coffeeHouse } = useContext(AppContext)    
    return (
        <>
            <Row className="mb-3">
                {coffeeHouse.employees.length ? (
                    coffeeHouse.employees.map(item =>
                        <EmployeeItem key={item.id} data={item} />
                    )
                ) : (
                    <p className="m-3">По вашему запросу ничего не найдено</p>
                )}
            </Row>            
        </>
    )
})

export default EmployeesList