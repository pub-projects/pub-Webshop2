import { UserConsumer } from "../util/UserContext";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Profiler, proCB } from '../util/Profiler';
import { useState, useEffect } from 'react';
import { useUser } from '../auth/useUser';

const LoginMenu = () => {
    const user = useUser();
    return (
        <UserConsumer>
            {({ token, setToken }) => (
                user
                    ? <div className="login">
                        <Profiler id="LoginMenu - Loged in" onRender={proCB} />
                        <NavDropdown title={user.userName} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/" onClick={() => { setToken(false); }}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                    : <div className="login">
                        <Profiler id="LoginManu - Login" onRender={proCB} />
                        <a href="/login">Login</a>
                        <a href="/sign-up">Sign Up</a>
                    </div>
            )}
        </UserConsumer>
    );
}

export { LoginMenu };