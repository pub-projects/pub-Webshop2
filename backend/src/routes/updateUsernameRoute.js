import { getDbConnection } from '../db';
import jwt from 'jsonwebtoken';
import md5 from 'crypto-js/md5';
import { ObjectId } from 'mongodb';

export const updateUsername = {
    path: '/api/users/update/username/:userId',
    method: 'put',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;

        const buf = Buffer.from(req.body.data, 'base64');
        const content = JSON.parse(buf.toString('utf8'));
        // console.log("decoded-updates", updates)

        // Extract resetFormData
        const updates = ((
            data
        ) => (
            data
        ))(content);

        if (!authorization) {
            return res.status(401).json({ message: "Not authorized." });
        }

        console.log("updateUsername", `${userId}`);

        //res.status(200).json({ "authorization": authorization, "userId": userId });
        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: "Unable to verify user." });
            // console.log("decoded", decoded);
            const { id, email } = decoded;
            // console.log("decoded email", email[0]);
            if (id != userId) return res.status(403).json({ message: "Not allowed to update user data." });
            if (!email[0].isVerified) return res.status(403).json({ message: "You need to verify your email address prior to gaining access." });

            const date = new Date();
            const lastUpdated = date.toISOString();

            try {
                // console.log("updateUserProfile");
                const db = getDbConnection('Webshop2');
                const o_id = new ObjectId(userId);// *** Important *** without ObjectId() mongodb doesn't find the _id
                console.log("updates.username:", updates.username + " : " + o_id);
                const result = await db.collection('Users').updateOne(
                    { '_id': o_id },
                    {
                        $set: {
                            lastUpdated: lastUpdated,
                            'login.username': updates.username
                            /** The correct way to only update login.usename field */
                        }
                    },
                    { returnNewDocument: true }
                );
                console.log("result ", result);
                console.log("id", userId);
                const x_id = new ObjectId(userId);
                const newUser = await db.collection('Users').findOne({ '_id': x_id });

                console.log("newUser", newUser);

                if (!newUser) return res.sendStatus(401);

                const { _id: id, name, location, email, login, dob, registered, phone, avatar, lang } = newUser;
                // console.log("loginRoute - location", location);

                const username = login.username;
                const updated = registered.updated;
                const userData = { id, name, location, email, username, dob, updated, phone, avatar, lang };
                //console.log("newUser:", newUser);

                jwt.sign(
                    userData,
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
                console.log("updateUserRoute-catch", err);
                return res.sendStatus(500);
            }
        });
    }
}