import { useState, useEffect } from 'react';
import { useToken } from './useToken';

const useUser = () => {
    const [token] = useToken();

    // decoding base64 encoded data keeping all bytes as original encoded.
    function decodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
    const getDataFromToken = token => {
        const encodedPayload = token.split('.',)[1];
        console.log("useUser - getDataFromToken", encodedPayload)
        return JSON.parse(decodeUnicode(encodedPayload));
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
            console.log("useUser", getDataFromToken(token));
        }
    }, [token]);

    return user;
}

export { useUser };