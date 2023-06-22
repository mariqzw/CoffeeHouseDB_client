import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter.js'
import NavBar from './components/NavBar.js'
import 'bootstrap/dist/css/bootstrap.min.css'

import { AppContext } from './components/AppContext.js'
import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import axios from 'axios'
import { fetchCafes } from './http/cafeAPI.js'
import { fetchEmployees } from './http/employeeAPI.js'
import { fetchDrinks } from './http/drinkAPI.js'
import { fetchOrders } from './http/orderAPI.js'
import { fetchDeliverys } from './http/deliveryAPI.js'

const App = observer(() => {
    const { coffeeHouse } = useContext(AppContext)
    useEffect(() => {
        Promise.all([fetchCafes(), fetchEmployees(), fetchDrinks(), fetchOrders(), fetchDeliverys()])
            .then(
                axios.spread((cafeData, employeesData, dData, orderData, deliveryData) => {                                      
                    coffeeHouse.cafes = cafeData;
                    coffeeHouse.employees = employeesData.rows.map(item => {
                       return item    
                    }
                    );
                    coffeeHouse.ds = dData;
                    coffeeHouse.orders = orderData;
                    coffeeHouse.deliverys = deliveryData;
                                                                                           
                })
            )
            .finally(
                
            )
    }, [])
   
    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    )
})

export default App
