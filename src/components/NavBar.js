import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {    
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to="/" className="navbar-brand">Сотрудники кофейни</NavLink>
                <NavLink to="/ordempl" className="navbar-brand">Заказы и сотрудники</NavLink>
                <NavLink to="/delivempl" className="navbar-brand">Поставки и сотрудники</NavLink>
                <Nav className="ml-auto">                    
                    <NavLink to="/cafe" className="nav-link">Кофейни</NavLink>
                    <NavLink to="/employee" className="nav-link">Сотрудники</NavLink>
                    <NavLink to="/drink" className="nav-link">Напитки</NavLink>
                    <NavLink to="/delivery" className="nav-link">Поставки</NavLink>
                    <NavLink to="/order" className="nav-link">Заказы</NavLink>
                    <NavLink to="/dessert" className="nav-link">Десерты</NavLink>                    
                </Nav>
            </Container>
        </Navbar>
    )
})

export default NavBar