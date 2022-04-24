import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CartConsumer, Cart } from '../util/CartContext';
import { Profiler, proCB } from '../util/Profiler';
import { useToken } from '../auth/useToken';
import { useState, useEffect } from 'react';
import { useUser } from '../auth/useUser';
import { UserConsumer } from '../util/UserContext';
import { LoginMenu } from './LoginMenu';



export const MainNavBar = () => {
    const user = useUser();
    const [, setToken] = useToken();

    return (
        <nav className="nav-wrapper">
            <Profiler id="MainNav" onRender={proCB} />
            <Navbar bg="light" expand="sm">
                <Container className="container-fluid">
                    <Navbar.Brand href="#home">Web Shop Project</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <LoginMenu />
            <CartConsumer>
                {(cartData) => (
                    <>
                        {/* {console.log("MainNavigationBar - CartConsumer - cart", cartData.cart)} */}
                        <Profiler id="MainNav - CartConsumer" onRender={proCB} />
                        <Cart cartData={
                            cartData.cart
                                ? cartData
                                : []

                        } />
                    </>
                )}
            </CartConsumer>
        </nav>
    );
};