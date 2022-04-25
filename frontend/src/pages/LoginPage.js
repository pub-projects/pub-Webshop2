import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useToken } from '../auth/useToken';
import { useUser } from '../auth/useUser';
import { useQueryParams } from '../util/useQueryParams';
import axios from 'axios';



const LoginPage = () => {
    const [token, setToken] = useToken();
    const [errorMessage,] = useState('');
    const [email, setEmail] = useState('');
    const [pword, setPword] = useState('');
    // const [googleOauthUrl, setGoogleOauthUrl] = useState('');
    const { token: oauthToken } = useQueryParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (oauthToken) {
            setToken(oauthToken);
            navigate('/');
        }
        if (token) navigate('/');
    }, [oauthToken, setToken, navigate, token]);

    const handleLogin = async (ev) => {
        console.log("handleLogin");
        // ev.preventDefault(); // 
        /**
         * Not using preventDefault will cause the page and menu to 
         * reload and display the username and user menu
         */
        try {
            const response = await axios.post('api/login', {
                email: email,
                password: pword
            });
            console.log("response", response);
            const { token } = response.data;
            setToken(token);
        } catch (error) {
            console.log("LoginPage - handleLogin - error", error);
        }
        return false;
    }

    return (
        <div className="loginPage-wrapper">
            <div className="loginPage-content">
                <h2>Log In</h2>
                {errorMessage && <div className="loginError">{errorMessage}</div>}
                <form id="loginForm" onSubmit={(ev) => handleLogin(ev)}>
                    <label >Email:</label><br />
                    <input
                        type="email"
                        id="userEmail"
                        autoComplete="username"
                        onChange={ev => setEmail(ev.target.value)}
                        placeholder="email address" /><br />
                    <label>Password:</label><br />
                    <input
                        type="password"
                        id="userPassword"
                        autoComplete="current-password"
                        onChange={ev => setPword(ev.target.value)}
                        placeholder="password" /><br />
                    <input type="submit" value="Login" disabled={!email || !pword} />
                </form>
                <a href="/resetpassword" className="loginRedirect">Forgot password</a>
                <a href="/signup" className="loginRedirect">Sign Up!</a>
            </div>
        </div>
    );
}

const LogOut = () => {
    const [token, setToken] = useToken();
    const navigate = useNavigate();
    console.log("LogOut");
    if (token) setToken(false);

    useEffect(() => {
        console.log("useEffect");
        if (!token) navigate('/');
    }, [navigate, token]);

    return (<>{token}</>);
}

export { LoginPage, LogOut };