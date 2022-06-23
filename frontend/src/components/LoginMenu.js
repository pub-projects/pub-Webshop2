
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Profiler, proCB } from '../util/Profiler';
import { useUser } from '../auth/useUser';
import { useToken } from '../auth/useToken';

const LoginMenu = () => {
    // console.log("LoginMenu 0");
    const [user] = useUser();
    // console.log("LoginMenu 1 - user", user);
    const [, setToken] = useToken();
    // console.log("LoginMenu 2");
    const username = user && user.login.username;
    //  console.log("LoginMenu 3 - userName", username);

    return (
        username
            ? <div className="login">
                <Profiler id="LoginMenu - Loged in" onRender={proCB} />
                <NavDropdown title={username} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/userprofile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={() => { setToken(null) }}>Log out</NavDropdown.Item>
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
