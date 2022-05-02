import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useToken } from '../auth/useToken';
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
    }, [oauthToken, navigate, setToken]);

    useEffect(() => {
        // Remember to use useEffect when setting the setToken
        // to re-direct the page after the token is updated.
        // console.log("LoginPage - useEffect");
        // Navigate to the page viewed before login.
        if (token) navigate(-1, { replace: true });
    }, [token, navigate])

    const handleLogin = async (ev) => {
        // console.log("handleLogin - email + password:", email + " : " + pword);
        ev.preventDefault();

        try {
            const response = await axios.post('api/login', {
                userEmail: email,
                password: pword
            });
            // console.log("response", response);
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

export { LoginPage };