import { useState } from 'react';

export const newTokenEvent = new Event('newToken', { bubbles: true, cancelable: true });
console.log("useToken newTokenEvent", newTokenEvent);

export const useToken = () => {
    const [token, _setToken] = useState(() => {
        return localStorage.getItem('token');
    });
    const setToken = newToken => {
        console.log("setToken", newToken);
        if (newToken) {
            localStorage.setItem('token', newToken)
            _setToken(old => newToken);

        } else {
            localStorage.removeItem('token');
            _setToken(null);
        }
        console.log("useToken - before dispatch");
        document.dispatchEvent(newTokenEvent);
        console.log("useToken - after dispatch");
    }
    return [token, setToken];
}