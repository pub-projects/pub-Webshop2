import { useUser } from '../auth/useUser';
import { useState, useEffect } from 'react';

const ProfilePage = () => {
    const user = useUser();
    const [imageUrl, setImageUrl] = useState(user.picture.medium);
    const [userName, setUserName] = useState(user.userName);
    const [title, setTitle] = useState(user.name.title);
    const [fname, setFname] = useState(user.name.first);
    const [lname, setLname] = useState(user.name.last);
    const [email, setEmail] = useState(user.email.emailaddress);
    const [street, setStreet] = useState(user.location.street.name);
    const [streetNumber, setStreetNumber] = useState(user.location.street.number);
    const [city, setCity] = useState(user.location.city);
    const [state, setState] = useState(user.location.state);
    const [country, setCountry] = useState(user.location.country);
    const [postcode, setPostcode] = useState(user.location.postcode);
    const [phone, setPhone] = useState(user.phone);
    const [cell, setCell] = useState(user.cell);
    const [lang,] = useState(user.nat.toLowerCase());
    const gravatarUrl = user.picture.medium;

    const resetUserName = () => {
        setUserName(user.userName);
    }
    const resetFormData = () => {
        setTitle(user.name.title);
        setFname(user.name.first);
        setLname(user.name.last);
        setEmail(user.email.emailaddress);
        setStreet(user.location.street.name);
        setStreetNumber(user.location.street.number);
        setCity(user.location.city);
        setState(user.location.state);
        setCountry(user.location.country);
        setPostcode(user.location.postcode);
        setPhone(user.phone);
        setCell(user.cell);
    }
    const updateUserName = (ev) => {
        ev.preventDefault();
        console.log("updateUserName", userName);
        // code to send new userName to server.
        return false;
    }
    const handleUpdate = (ev) => {
        ev.preventDefault();

        return false;
    }

    const handleImageClick = () => {

    }

    const uploadImage = () => {

    }


    return (
        <div className="profileWrapper"><h2>User Profile</h2><h3>{userName}</h3>
            <div className="container profileContent" lang={lang}>

                <section className="photoSection">
                    <div onClick={handleImageClick()}>
                        <img src={gravatarUrl} width="100px" alt="Profile" />
                    </div>
                    <input type="button" onClick={uploadImage()} value="Update image" />
                </section>
                <section className="profileSection">
                    <div className="userName section">
                        <form onSubmit={(ev) => updateUserName(ev)}>
                            <div>
                                <label>Username:
                                    <br />
                                    <input type="text" value={userName} onChange={ev => setUserName(ev.target.value)} />
                                </label>
                                <label>
                                    Last updated:
                                    <br />
                                    <input type="text" value={user.lastUpdated.split('T')[0]} disabled={true} />
                                </label>
                            </div>
                            <input type="submit" value="Update" />
                            <input type="button" onClick={() => resetUserName()} value="Reset" />
                        </form>
                    </div>
                    <form onSubmit={(ev) => handleUpdate(ev)}>
                        <div className="section name">
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
                            <div>
                                <label>
                                    Email:<br />
                                    <input type="text" value={email} onChange={ev => setEmail(ev.target.value)} />
                                </label>
                            </div>
                        </div>
                        <div className="section phone">
                            <div>
                                <label>
                                    Phone:<br />
                                    <input type="text" value={phone} onChange={ev => setPhone(ev.target.value)} />
                                </label>
                                <label>
                                    Mobile:<br />
                                    <input type="text" value={cell} onChange={ev => setCell(ev.target.value)} />
                                </label>
                            </div>
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