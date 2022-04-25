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

export { useUser };