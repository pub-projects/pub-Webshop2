
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Profiler, proCB } from '../util/Profiler';
import { useUser } from '../auth/useUser';
import { useToken } from '../auth/useToken';

const LoginMenu = () => {
    // console.log("LoginMenu 0");
    const user = useUser();
    // console.log("LoginMenu 1 - user", user);
    const [, setToken] = useToken();
    // console.log("LoginMenu 2");
    const userName = user && user.userName;
    // console.log("LoginMenu 3 - userName", userName);


    return (
        userName
            ? <div className="login">
                <Profiler id="LoginMenu - Loged in" onRender={proCB} />
                <NavDropdown title={userName} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">My Orders</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">My Invoices</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={() => { setToken(null) }}>Log out</NavDropdown.Item>
                </NavDropdown>
            </div>
            : <div className="login">
                <Profiler id="LoginManu - Login" onRender={proCB} />
                <a href="/login">Login</a>
                <a href="/sign-up">Sign Up</a>
            </div>
    );
}

export { LoginMenu };