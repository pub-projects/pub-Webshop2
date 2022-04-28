import { useUser } from '../auth/useUser';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Profiler, proCB } from '../util/Profiler';
import { useNavigate } from 'react-router';
import { useToken } from '../auth/useToken';

const SignupPage = () => {
    const [userName, setUserName] = useState('');
    const [title, setTitle] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [lang, setLang] = useState();
    const [userNameOK, setUserNameOK] = useState(false);
    let qUserNameOK = false;
    const navigate = useNavigate();
    const [, setToken] = useToken();

    const resetFormData = () => {
        setUserName('');
        setTitle('');
        setFname('');
        setLname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setDisableSubmit(true);
        qUserNameOK = false;
        setUserNameOK(false);
    }

    /*
    Function b64EncodeUnicode code from 
    https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
    */
    const b64EncodeUnicode = (str) => {
        return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }

    const createUser = async (ev) => {
        ev.preventDefault();

        const newUser = { username: userName, title, first: fname, last: lname, emailaddress: email, password };
        const data = b64EncodeUnicode(JSON.stringify(newUser));

        // console.log("newUser", newUser);
        // console.log("data", data);
        try {
            const response = await axios.post('/api/users/signup', { data });
            const { token } = await response.data;
            setToken(token);
            navigate('/verifyemail');
        } catch (err) {
            console.log("SignupPage - createUser - error", err);
        }

        return false;
    }

    const handleOnChange = (ev) => {
        const caller = ev.target.name;
        const value = ev.target.value;
        // console.log("handleOnChange", caller + " : " + value);

        switch (caller) {
            case "username": setUserName(value);
                break;
            case "title": setTitle(value);
                break;
            case "fname": setFname(value);
                break;
            case "lname": setLname(value);
                break;
            case "email": setEmail(value);
                break
            case "password": setPassword(value);
                break;
            case "confirmpassword": setConfirmPassword(value);
                break;
            default:
                break;
        }
        enableSubmit(caller);
    }

    const passwordMatch = () => {
        const pword = document.querySelector("#pword1").value;
        const confirm = document.querySelector("#pword2").value;
        if (pword.length > 0 && confirm.length > 0)
            return pword === confirm;
        return false;
    }

    const checkUserName = async () => {
        // check with server if username exists.
        const username = document.querySelector("#username").value;
        if (username && username.length > 3) {
            try {
                const response = await axios.post('/api/users/usernameExists', {
                    username
                });
                const { exists } = await response.data;
                // console.log("username - don't exists", !exists);
                qUserNameOK = !exists;
                setUserNameOK(qUserNameOK);
            } catch (err) {
                console.log("SignupPage - userNameOK - error", err);
            }
        } else {
            // console.log("username", username);
            qUserNameOK = false;
            setUserNameOK(qUserNameOK);
        }
    }

    const emailOK = () => {
        const regex = /^\S+@\S+\.\S+/;
        const email = document.querySelector("#email").value;
        return email.match(regex) ? email === email.match(regex)[0] : false;
    }

    const enableSubmit = async (caller) => {
        // console.log("enableSubmit", caller);
        let isUserNameOK = userNameOK;
        if (caller === "username") {
            await checkUserName();
            //console.log("userNameOK", userNameOK);
            isUserNameOK = qUserNameOK;

            // console.log("pwords", passwordMatch());
            // console.log("isUserNameOK", isUserNameOK);
            // console.log("userNameOK", userNameOK);
            // console.log("emailOK", emailOK());
            // console.log("fname.length", fname.length > 0);
            // console.log("lname.length", lname.length > 0);
            // console.log("test", passwordMatch() && isUserNameOK && emailOK() && fname.length > 0 && lname.length > 0);

            if (passwordMatch() && isUserNameOK && emailOK() && fname.length > 0 && lname.length > 0) setDisableSubmit(false);
            else
                setDisableSubmit(true);
        } else {
            // console.log("pwords", passwordMatch());
            // console.log("isUserNameOK", isUserNameOK);
            // console.log("userNameOK", userNameOK);
            // console.log("emailOK", emailOK());
            // console.log("fname.length", fname.length > 0);
            // console.log("lname.length", lname.length > 0);
            // console.log("test", passwordMatch() && isUserNameOK && emailOK() && fname.length > 0 && lname.length > 0);

            if (passwordMatch() && isUserNameOK && emailOK() && fname.length > 0 && lname.length > 0) setDisableSubmit(false);
            else
                setDisableSubmit(true);
        }
    }


    return (
        <div className="profileWrapper"><h2>Create Account</h2>
            <Profiler id="SignupPage" onRender={proCB} />
            <div className="container profileContent" lang={lang}>
                <section className="profileSection">
                    <form onSubmit={(ev) => createUser(ev)}>
                        <div className="section name">
                            <div className="group">
                                <label>Username:
                                    <br />
                                    <input id="username" name="username" type="text" value={userName} onChange={ev => handleOnChange(ev)} />
                                </label><p className="infoText">Usernames must be at least 4 characters.</p>
                            </div>
                            <div className="group">
                                <label>
                                    Title:<br />
                                    <input name="title" type="text" value={title} onChange={ev => handleOnChange(ev)} />
                                </label>
                                <br />
                                <label>
                                    First name:<br />
                                    <input name="fname" type="text" value={fname} onChange={ev => handleOnChange(ev)} />
                                </label>
                                <label>
                                    Last name:<br />
                                    <input name="lname" type="text" value={lname} onChange={ev => handleOnChange(ev)} />
                                </label>
                            </div>
                        </div>
                        <div className="section email">
                            <div>
                                <label>
                                    Email:<br />
                                    <input id="email" name="email" type="email" value={email} onChange={ev => handleOnChange(ev)} />
                                </label><br />
                                <label>
                                    Password:<br />
                                    <input id="pword1" name="password" type="password" value={password} onChange={ev => handleOnChange(ev)} />
                                </label><p className="infoText">Passwords must be at least 6 characters.</p>
                                <label>
                                    Re-enter password:<br />
                                    <input id="pword2" name="confirmpassword" type="password" value={confirmPassword} onChange={ev => handleOnChange(ev)} />
                                </label>
                            </div>
                        </div>
                        <input type="submit" value="Sign Up" disabled={disableSubmit} />
                        <input type="button" onClick={() => resetFormData()} value="Reset Form" />
                    </form>
                </section>
            </div>
        </div>
    )
}

export { SignupPage };