import { useUser } from '../auth/useUser';
import { useState, useEffect } from 'react';
import { PhoneNumberList } from '../components/PhoneNumberList';
import { EmailList } from '../components/EmailList';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { useNavigate } from 'react-router';
import { Profiler, proCB } from '../util/Profiler';
import UserClass from '../util/userClass';

const ProfilePage = () => {
    const [user, setUser] = useState(UserClass.getUser());
    console.log("ProfilePage - declaring user", user);
    const id = user._id;
    const [gender, setGender] = useState(user.gender);
    const [username, setUsername] = useState(user.login.username);
    const [title, setTitle] = useState(user.name.title);
    const [fname, setFname] = useState(user.name.first);
    const [lname, setLname] = useState(user.name.last);
    const [email, setEmail] = useState(user.email);
    const isVerified = user.email.isVerified;
    const [birthday, setBirthday] = useState(user.dob.date);
    const [street, setStreet] = useState(user.location.street.name);
    const [streetNumber, setStreetNumber] = useState(user.location.street.number);
    const [city, setCity] = useState(user.location.city);
    const [state, setState] = useState(user.location.state);
    const [country, setCountry] = useState(user.location.country);
    const [postcode, setPostcode] = useState(user.location.postcode);
    const [phone, setPhone] = useState(user.phone);
    const lastUpdated = user.lastUpdated.split("T")[0];
    const [lang,] = useState(user.lang);
    const [avatarUrl, setAvatarUrl] = useState(user.avatar);
    const [token, setToken] = useToken();
    const navigate = useNavigate();
    const userClass = new UserClass();

    console.log("ProfilePage - user", user);



    const resetUserName = () => {
        console.log("resetFormData", username);
        setUsername(user.username);
    }

    const resetFormData = () => {
        console.log("reset page");
        setGender(user.gender);
        setTitle(user.name.title);
        setFname(user.name.first);
        setLname(user.name.last);
        setEmail(user.email);
        setBirthday(user.dob.date);
        setStreet(user.location.street.name);
        setStreetNumber(user.location.street.number);
        setCity(user.location.city);
        setState(user.location.state);
        setCountry(user.location.country);
        setPostcode(user.location.postcode);
        setPhone(user.phone);
    }

    const updateUserName = (ev) => {
        console.log("ProfilePage - updateUserName", username);
        userClass.updateUserName(username);
    }

    const handleUpdate = async (ev) => {
        ev.preventDefault();
        // Create a tmpUser and set all fields to current values then
        // send to server and update the user.
        // Deep copy.
        const tmpUser = JSON.parse(JSON.stringify(user));
        const name = { "title": title, "first": fname, "last": lname };
        const tmpStreet = { "number": streetNumber, "name": street };
        const location = { "street": tmpStreet, "city": city, "state": state, "country": country, "postcode": postcode, "timezone": user.location.timezone };

        tmpUser.gender = gender;
        tmpUser.username = username;
        tmpUser.name = name;
        tmpUser.email = email;
        tmpUser.dob.date = birthday;
        tmpUser.location = location;
        tmpUser.phone = phone;
        tmpUser.avatar = avatarUrl;

        console.log("ProfilePage - handleUpdate - tmpUser", tmpUser);
        const data = UserClass.b64EncodeUnicode(JSON.stringify(tmpUser));
        console.log("checking data", data);
        try {
            const response = await axios.post(`/api/users/update/${tmpUser.id}`, { data }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { token: newToken } = await response.data;
            console.log("updated token", newToken);
            setToken(newToken);
            navigate('/userprofile');
        } catch (err) {
            console.log("ProfilePage - handleUpdate - error", err);
        }

        return false;
    }

    const handleImageClick = () => {

    }

    const uploadImage = () => {

    }

    return (
        <div className="profileWrapper"><h2>User Profile</h2><h3>{username}</h3>
            <Profiler id="ProfilePage" onRender={proCB} />
            <div className="container profileContent" lang={lang}>
                <section className="photoSection">
                    <div onClick={handleImageClick()}>
                        <img src={avatarUrl.medium} width="100px" alt="Profile" />
                    </div>
                    <input type="button" onClick={uploadImage()} value="Update image" />
                </section>
                <section className="profileSection">
                    <div className="userName section">
                        <form>
                            <div>
                                <label>Username:
                                    <br />
                                    <input type="text" value={username} onChange={ev => setUsername(ev.target.value)} />
                                </label>
                                <label>
                                    Last updated:
                                    <br />
                                    <input type="text" value={lastUpdated} disabled={true} />
                                </label>
                            </div>
                            <input type="button" value="Update" onClick={(ev) => updateUserName(ev)} />
                            <input type="button" onClick={() => resetUserName()} value="Reset" />
                        </form>
                    </div>
                    <form onSubmit={(ev) => handleUpdate(ev)}>
                        <div className="section name border-top">
                            <label>
                                Title:<br />
                                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} />
                            </label>
                            <div>
                                <label>
                                    First name:<br />
                                    <input type="text" value={fname} onChange={ev => setFname(ev.target.value)} />
                                </label>
                                <label>
                                    Last name:<br />
                                    <input type="text" value={lname} onChange={ev => setLname(ev.target.value)} />
                                </label>
                            </div>
                        </div>
                        <div className="section email">
                            <EmailList email={email} setEmail={setEmail} />
                        </div>
                        <div className="section phone">
                            <PhoneNumberList phone={phone} setPhone={setPhone} />
                        </div>
                        <div className="section address">
                            <div>
                                <label>
                                    Street:<br />
                                    <input type="text" value={street} onChange={ev => setStreet(ev.target.value)} />
                                </label>
                                <label>
                                    Street number:<br />
                                    <input type="text" value={streetNumber} onChange={ev => setStreetNumber(ev.target.value)} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    City:<br />
                                    <input type="text" value={city} onChange={ev => setCity(ev.target.value)} />
                                </label>
                                <label>
                                    Post code:<br />
                                    <input type="text" value={postcode} onChange={ev => setPostcode(ev.target.value)} />
                                </label>
                            </div>
                            <div>
                                <label className="singleLabel">
                                    State:<br />
                                    <input type="text" value={state} onChange={ev => setState(ev.target.value)} />
                                </label>
                            </div>
                            <div>
                                <label className="singleLabel">
                                    Country:<br />
                                    <input type="text" value={country} onChange={ev => setCountry(ev.target.value)} />
                                </label>
                            </div>
                        </div>
                        <input type="submit" value="Update" />
                        <input type="button" onClick={() => resetFormData()} value="Reset" />
                    </form>
                </section>
            </div>
        </div>
    )

}

export { ProfilePage };