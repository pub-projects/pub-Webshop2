import { getDbConnection } from '../db';
import CryptoJS from 'crypto-js';
import crypto from 'crypto';
import { v4 as uuidCreate } from 'uuid';
import { sendEmail } from '../util/sendEmail';
import jwt from 'jsonwebtoken';

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

        try {
            const buf = Buffer.from(data, 'base64');
            console.log("buf", buf);
            const newUser = JSON.parse(buf.toString('utf8'));
            console.log("newUser", newUser);
            const { username, title, first, last, emailaddress, password } = newUser;
            const saltHex = crypto.randomBytes(10);
            const salt = saltHex.toString('hex');
            const uuid = uuidCreate();
            const md5 = CryptoJS.MD5(password + salt).toString();
            const sha1 = CryptoJS.SHA1(password + salt).toString();
            const sha256 = CryptoJS.SHA256(password + salt).toString();
            const date = new Date();
            const lastUpdated = date.toISOString();
            const createdAt = lastUpdated;
            const userData = { login: { uuid, username, salt, md5, sha1, sha256 }, name: { title, first, last }, email: { emailaddress, isVerified: false }, lastUpdated, createdAt };

            console.log("userData", userData);

            const db = await getDbConnection('Webshop2');
            const collection = await db.collection('Users');
            const result = await collection.insertOne(userData);
            const { insertedId } = result;
            console.log("result", result);

            const emailHTML = `<h2>Welcome to the Webshop</h2><p>Dear ${title} ${first} ${last}</p><p>We are delighted to have you here.</p><p>Before you can use your account you will need to verify your email by following this link <a href="https://localhost:3000/verifyemail/"+${uuid}>https://localhost:3000/verifyemail/${uuid}</a></p><br /><p>Sincerely yours,<br />The Webshop Team</p>`;

            const mail = {
                to: emailaddress,
                from: process.env.SENDGRID_FROM_EMAIL,
                subject: "Please verify your Webshop email address!",
                html: emailHTML
            };

            const response = await sendEmail(mail);

            console.log("sendEmail response", response);
            /* ***** Create the userObject to be sent ***** */
            const location = { city: '', country: '', postcode: '', state: '', street: { name: '', number: '' } };
            const name = { title, first, last };
            const email = { emailaddress, isVerified: false };
            const picture = { large: '', medium: '', thumbnail: '' };
            const responseData = { id: insertedId, userName: username, email, location, name, picture, lang: '', lastUpdated };
            console.log("signupRoute - responseData", responseData);

            jwt.sign(
                responseData,
                process.env.JWT_SECRET,
                {
                    expiresIn: '2d',
                },
                (err, token) => {
                    if (err) {
                        return res.status(500).send("jwt" + err);
                    }
                    res.status(200).json({ token });
                }
            )

        } catch (err) {
            console.log("signupRoute - signup - error", err);
            res.sendStatus(500);
        }

    }
}