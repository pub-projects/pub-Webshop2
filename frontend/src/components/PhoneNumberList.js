import { PhoneNumberItem } from './PhoneNumberListItem';

export const PhoneNumberList = ({ phone, setPhone }) => {
    // console.log("PhoneList", phone);
    const _tmpPhones = JSON.parse(JSON.stringify(phone));
    // console.log("PhoneList - _tmpPhone", _tmpPhone);

    const _setPhone = (item) => {
        // console.log("_setPhone", item);
        /*
            Here we check for the name property and Update
            the number without checking for any difference.
            This also means that it must be a known name 
            for any update to occure. We will not facilitate any
            new phone numbers to be entered or for changes to
            the name property.
        */
        for (let i = 0; i < _tmpPhones.length; i++) {
            if (_tmpPhones[i].name === item.name) {
                _tmpPhones[i].number = item.number;
                continue;
            }
        }
        setPhone(_tmpPhones);
    }

    return (
        <div>
            {_tmpPhones.map((item, i) => (
                <PhoneNumberItem key={item.number + "-" + i} item={item} setPhone={_setPhone} />
            ))}
        </div>
    );
}