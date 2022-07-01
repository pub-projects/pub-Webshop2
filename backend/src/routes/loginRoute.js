import { getDbConnection } from '../db';
import jwt from 'jsonwebtoken';
import md5 from 'crypto-js/md5';
import { removeNonClientLoginProperties } from '../models/objectsAndClasses';

const compare = (in1, in2) => {
    // console.log("compare", in1.length + " : " + in2.length);
    if (in1 === in2) return true;
    return false;
}

export const login = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        try {
            const { userEmail, password } = req.body;
            // console.log("loginRoute", userEmail + " : " + password);

            const db = getDbConnection('Webshop2');
            const user = await db.collection('Users').findOne({ "email.emailaddress": userEmail });
            console.log("user", user);

            if (!user) return res.sendStatus(401);

            // const { _id: id, name, location, email, login, dob, registered, phone, avatar, lang } = user;
            // // console.log("loginRoute - location", location);

            const isCorrectPassword = compare(md5(password + user.login.salt).toString(), user.login.md5);
            // const username = login.username;
            // const updated = registered.updated;
            // const userData = { id, name, location, email, username, dob, updated, phone, avatar, lang };

            // console.log("Compare passwords", md5(password + login.salt).toString() + " : " + login);

            removeNonClientLoginProperties.forEach(item => {
                delete user.login[item];
            });

            console.log("trimmed - user", user);
            if (isCorrectPassword) {
                jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                    if (err) res.status(500).json('login: ' + err);

                    res.status(200).json({ token });
                });
            } else {
                res.sendStatus(401);
            }

        } catch (err) {
            console.log("loginRoute-catch", err);
            return res.sendStatus(500);
        }
    }
}

