import { useState, useEffect } from 'react';
import { useToken } from './useToken';

const useUser = () => {
    const [token] = useToken();

    const getDataFromToken = token => {
        const encodedPayload = token.split('.',)[1];
        return JSON.parse(atob(encodedPayload));
    }

    const [user, setUser] = useState(() => {
        if (!token) return null;
        return getDataFromToken(token);
    });

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getDataFromToken(token));
        }
    }, [token]);

    return user;
}
const useLogOut = () => {
    console.log("useLogOut");
    const [token, setToken] = useToken();
    if (token) setToken(null);
}

export { useUser, useLogOut };