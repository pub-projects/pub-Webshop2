import { getDbConnection } from '../db';
import jwt from 'jsonwebtoken';
import md5 from 'crypto-js/md5';

const compare = (in1, in2) => {
    // console.log("compare", in1.length + " : " + in2.length);
    if (in1 === in2) return true;
    return false;
}

export const login = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;
        // console.log("loginRoute", email + " : " + password);
        try {
            const db = await getDbConnection('Webshop2');
            //console.log("db", db);
            const user = await db.collection('Users').findOne({ 'email:emailaddress': email });
            //console.log("user", user);

            if (!user) return res.sendStatus(401);

            const { _id: id, name, email, location, login, phone, cell, picture, lastUpdated, nat } = user;
            console.log("loginRoute - location", location);

            const isCorrectPassword = compare(md5(password + login.salt).toString(), login.md5);
            const isVerified = email.isVerified;
            const userName = login.username;
            const userData = { id, name, email, location, userName, phone, cell, picture, lastUpdated, nat };

            if (isCorrectPassword) {
                jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
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

