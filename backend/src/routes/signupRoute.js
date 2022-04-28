import { getDbConnection } from '../db';

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export const signup = {
    path: '/api/users/signup',
    method: 'post',
    handler: async (req, res) => {
        const { data } = req.body;
        console.log("data", data);
        const buf = Buffer.from(data, 'base64');
        console.log("buf", buf);
        const newUser = JSON.parse(buf.toString('utf8'));
        console.log("newUser", newUser);


    }
}