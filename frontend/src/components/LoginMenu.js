import { useState, useEffect, useCallback } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Profiler, proCB } from '../util/Profiler';
import UserClass from '../util/userClass';
import { useToken, newTokenEvent } from '../auth/useToken';

const LoginMenu = () => {
    console.log("LoginMenu 0");
    const User = new UserClass();
    const [user, setUser] = useState(UserClass.getUser());
    console.log("LoginMenu 1 - user", user);
    // console.log("LoginMenu 2");
    let username = user && user.login.username;
    //  console.log("LoginMenu 3 - userName", username);

    const [updateLogin, _setUpdateLogin] = useState(true);

    const setUpdateLogin = useCallback(() => {
        console.log("LoginMenu - setUpdateLogin");
        setUser(UserClass.getUser());
        console.log('LoginMenu - setUpdateLogin - user', user);
    }, [setUser]);

    useEffect(() => {
        document.addEventListener('updateUser', () => { setUpdateLogin() });
        setUpdateLogin();
        console.log("addedEventListner in LoginMenu");
    }, [setUpdateLogin])

    return (
        username
            ? <div className="login">
                <Profiler id="LoginMenu - Loged in" onRender={proCB} />
                <NavDropdown title={username} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/userprofile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={() => { UserClass.logOutUser() }}>Log out</NavDropdown.Item>
                </NavDropdown>
            </div>
            : <div className="login">
                <Profiler id="LoginManu - Login" onRender={proCB} />
                <a href="/login">Login</a>
                <a href="/signup">Sign Up</a>
            </div>
    );
}

export { LoginMenu };