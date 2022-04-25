import { useState } from 'react';

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
    }
    return [token, setToken];
}