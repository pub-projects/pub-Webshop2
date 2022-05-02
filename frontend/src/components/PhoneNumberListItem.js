import { useState, useEffect } from 'react';

export const PhoneNumberItem = ({ item, setPhone }) => {
    // console.log("PhoneItem", item);
    const [number, setNumber] = useState(item.number);
    const [name,] = useState(item.name);

    const handleOnChange = (newNumber) => {
        setNumber(newNumber);
        const item = {
            "name": name, "number": newNumber
        };
        // console.log("handleOnChange", item);
        setPhone(item);
    }

    return (
        <label>
            {name}:<br />
            <input id="phone-home" type="text" value={number} onChange={ev => handleOnChange(ev.target.value)} />
        </label>
    );
}

