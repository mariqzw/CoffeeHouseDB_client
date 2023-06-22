import { Routes, Route } from 'react-router-dom'
import CoffeeHouse from '../pages/CoffeeHouse.js'
import OrderEmployee from '../pages/OrderEmployee.js'
import DeliveryEmployee from '../pages/DeliveryEmployee.js'
import AdminCafes from '../pages/AdminCafes.js'
import AdminEmployees from '../pages/AdminEmployees.js'
import AdminDrinks from '../pages/AdminDrinks.js'
import AdminDesserts from '../pages/AdminDesserts.js'
import AdminDelivery from '../pages/AdminDelivery.js'
import AdminOrders from '../pages/AdminOrders.js'
import NotFound from '../pages/NotFound.js'

const publicRoutes = [
    {path: '/', Component: CoffeeHouse},
    {path: '/ordempl', Component: OrderEmployee},
    {path: '/delivempl', Component: DeliveryEmployee},
    {path: '/cafe', Component: AdminCafes},
    {path: '/employee', Component: AdminEmployees}, 
    {path: '/drink', Component: AdminDrinks},
    {path: '/delivery', Component: AdminDelivery},
    {path: '/order', Component: AdminOrders},
    {path: '/dessert', Component: AdminDesserts},  
    {path: '*', Component: NotFound},
]

const AppRouter = () => {    
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}            
        </Routes>
    )
}

export default AppRouter