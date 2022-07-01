import { useState } from 'react';
import { PhoneNumberList } from '../components/PhoneNumberList';
import { EmailList } from '../components/EmailList';
import { useToken } from '../auth/useToken';
import { useNavigate } from 'react-router';
import { Profiler, proCB } from '../util/Profiler';
import UserClass from '../util/userClass';

const ProfilePage = () => {
    const [user, setUser] = useState(UserClass.getUser());
    const [username, setUsername] = useState(user.login.username);
    const [title, setTitle] = useState(user.name.title);
    const [fname, setFname] = useState(user.name.first);
    const [lname, setLname] = useState(user.name.last);
    const [email, setEmail] = useState(user.email);
    const isVerified = user.email.isVerified;
    const [street, setStreet] = useState(user.location.street.name);
    const [streetNumber, setStreetNumber] = useState(user.location.street.number);
    const [city, setCity] = useState(user.location.city);
    const [state, setState] = useState(user.location.state);
    const [country, setCountry] = useState(user.location.country);
    const [postcode, setPostcode] = useState(user.location.postcode);
    const [phone, setPhone] = useState(user.phone);
    const lastUpdated = user.registered.updated.split("T")[0];
    const [lang,] = useState(user.lang);
    const [avatarUrl, setAvatarUrl] = useState(user.avatar);
    const [token, setToken] = useToken();
    const navigate = useNavigate();
    const userClass = new UserClass();

    // console.log("ProfilePage - user", user);

    const resetUserName = () => {
        // console.log("resetFormData", username);
        setUsername(user.username);
    }

    const resetFormData = () => {
        // console.log("reset page");
        setTitle(user.name.title);
        setFname(user.name.first);
        setLname(user.name.last);
        setEmail(user.email);
        setStreet(user.location.street.name);
        setStreetNumber(user.location.street.number);
        setCity(user.location.city);
        setState(user.location.state);
        setCountry(user.location.country);
        setPostcode(user.location.postcode);
        setPhone(user.phone);
    }

    const updateUserName = (ev) => {
        // console.log("ProfilePage - updateUserName", username);
        userClass.updateUserName(username);
    }

    const handleUpdate = async (ev) => {
        /**
         * Create a tmpUser and set all fields to current values then
         * send to server and update the user.
         */

        // Deep copy.
        const tmpUser = JSON.parse(JSON.stringify(user));

        // Get all current data and dump in tmpUser.
        tmpUser.name.title = title;
        tmpUser.name.first = fname;
        tmpUser.name.last = lname;
        tmpUser.location.street.number = streetNumber;
        tmpUser.location.street.name = street;
        tmpUser.location.city = city;
        tmpUser.location.state = state;
        tmpUser.location.country = country;
        tmpUser.location.postcode = postcode;
        for (let i = 0; i < tmpUser.email.length; i++) {
            tmpUser.email[i].emailaddress = email[i].emailaddress;
        }
        for (let i = 0; i < tmpUser.phone.length; i++) {
            tmpUser.phone[i].number = phone.number;
        }

        userClass.updateUser(tmpUser);
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
                    <form>
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
                        <input type="button" value="Update" onClick={(ev) => handleUpdate(ev)} />
                        <input type="button" onClick={() => resetFormData()} value="Reset" />
                    </form>
                </section>
            </div>
        </div>
    )

}

export { ProfilePage };