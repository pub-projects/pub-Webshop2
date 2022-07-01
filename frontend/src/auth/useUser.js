import { useState, useEffect, useCallback } from 'react';
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
        return str ? decodeURIComponent(atob(str).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')) : null;
    }
    const getDataFromToken = useCallback(() => {
        const encodedPayload = token ? token.split('.',)[1] : null;
        console.log("useUser - getDataFromToken", encodedPayload)
        // if (!encodedPayload) return null;
        return JSON.parse(b64DecodeUnicode(encodedPayload));
    }, [token]);

    const [user, setUser] = useState(() => {
        if (!token) return null;
        return getDataFromToken(token);
    });

    const updateUser = async (newToken) => {
        console.log("useUser - updatUser - newToken", newToken);
        let tmp = await setToken(newToken);
        setUser(tmp);
    }

    const getUser = () => {
        return getDataFromToken(token);
    }

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getDataFromToken(token));
            // console.log("useUser", getDataFromToken(token));
        }
    }, [token, getDataFromToken]);

    return [user, updateUser, getUser];
}



const useLogOut = () => {
    // console.log("useLogOut");
    const [token, setToken] = useToken();
    if (token) setToken(null);
}

export { useLogOut };