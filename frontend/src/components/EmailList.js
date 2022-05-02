import { EmailListItem } from './EmailListItem';

export const EmailList = ({ email, setEmail }) => {
    // console.log("EmailList - email", email);
    const _tmpEmails = JSON.parse(JSON.stringify(email));

    const _setEmail = (newEmail) => {
        // console.log("_setEmail", newEmail);
        /*  Checks can be done for the name too and updated if necessary 
            I'm not going to do that here, since I won't be implementing
            that functionality. We will not implement any adding of new 
            emailaddresses or changes of the name property.
        */
        for (let i = 0; i < _tmpEmails.length; i++) {
            if (_tmpEmails[i].emailaddress !== newEmail.emailaddress) {
                _tmpEmails[i].emailaddress = newEmail.emailaddress;
                continue;
            }
        }
        // console.log("_setEmail2", _tmpEmails);
        setEmail(_tmpEmails);
    }

    return (
        <div>
            {_tmpEmails.map((item) => (
                <EmailListItem key={item.emailaddress} email={item} setEmail={_setEmail} />
            ))}
        </div>
    )

}

{/* <div>
    <label>
        Email:<br />
        <input type="email" value={emailaddress} onChange={ev => setEmailaddress(ev.target.value)} />
    </label>
</div> */}