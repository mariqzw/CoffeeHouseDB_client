import { Container, Row, Col } from 'react-bootstrap'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import DrinkBar from '../components/DrinkBar.js'
import { AppContext } from '../components/AppContext.js'
import { fetchDrinks } from '../http/drinkAPI.js'
import DrinksList from '../components/DrinkList.js'


const Menu = observer(() => {
    const { coffeeHouse } = useContext(AppContext)
    useEffect(() => {          
        fetchDrinks()
            .then(data => {
                coffeeHouse.drinks = data.rows;                                
            })          
    }, [coffeeHouse.ds])    
    return (
        <Container>
            { <Row className="mt-2">            
                <Col md={9}>
                     <DrinkBar />
                </Col>
            </Row> }

            <DrinksList />

        </Container>
    )
})

export default Menu
