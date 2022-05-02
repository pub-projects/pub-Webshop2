import { useState } from 'react';

export const EmailListItem = ({ email, setEmail }) => {
    // console.log("EmailListItem - orig email", email);
    const [_tmpEmail, _setTmpEmail] = useState(JSON.parse(JSON.stringify(email)));
    // console.log("EmailListItem", _tmpEmail);

    const _setEmail = (newAddress) => {
        let newEmailaddress = { "name": _tmpEmail.name, "emailaddress": newAddress, "isVerified": false };
        _setTmpEmail(newEmailaddress);
        setEmail(newEmailaddress);
    }

    return (
        <label>
            Email:<br />
            <input type="email" value={_tmpEmail.emailaddress} onChange={ev => _setEmail(ev.target.value)} />
        </label>
    )
}