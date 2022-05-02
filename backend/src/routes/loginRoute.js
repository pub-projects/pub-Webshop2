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
<<<<<<< HEAD
        const { email, password } = req.body;
        // console.log("loginRoute", email + " : " + password);
=======
>>>>>>> feature/signup
        try {
            const { userEmail, password } = req.body;
            console.log("loginRoute", userEmail + " : " + password);

            const db = getDbConnection('Webshop2');
            const user = await db.collection('Users').findOne({ "email.emailaddress": userEmail });
            console.log("user", user);

            if (!user) return res.sendStatus(401);

<<<<<<< HEAD
            const { _id: id, name, email, login } = user;
            // console.log("loginRoute - md5 salt", login.md5 + " : " + login.salt);
=======
            const { _id: id, name, location, email, login, dob, registered, phone, avatar, lang } = user;
            // console.log("loginRoute - location", location);
>>>>>>> feature/signup

            const isCorrectPassword = compare(md5(password + login.salt).toString(), login.md5);
            const username = login.username;
            const updated = registered.updated;
            const userData = { id, id, name, location, email, username, dob, updated, phone, avatar, lang };

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

