import { useState, useEffect } from 'react';
import { useToken } from './useToken';

export const useUser = () => {
    const [token, setToken] = useToken();

    /*
  Function b64EncodeUnicode code from 
  https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
  */
    // decoding base64 encoded data keeping all bytes as original encoded.
    const b64DecodeUnicode = (str) => {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
    const getDataFromToken = token => {
        const encodedPayload = token.split('.',)[1];
        // console.log("useUser - getDataFromToken", encodedPayload)
        return JSON.parse(b64DecodeUnicode(encodedPayload));
    }

    const [user, setUser] = useState(() => {
        if (!token) return null;
        return getDataFromToken(token);
    });

    const updateUser = (newToken) => {
        setToken(newToken);
    }

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getDataFromToken(token));
            // console.log("useUser", getDataFromToken(token));
        }
    }, [token, getDataFromToken]);

    return [user, updateUser];
}



const useLogOut = () => {
    // console.log("useLogOut");
    const [token, setToken] = useToken();
    if (token) setToken(null);
}

export { useLogOut };