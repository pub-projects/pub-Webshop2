import { getDbConnection } from '../db';
import jwt from 'jsonwebtoken';
import md5 from 'crypto-js/md5';
import { ObjectId } from 'mongodb';
import { userObjectToClientProjection as userProjection } from '../models/objectsAndClasses';

export const updateUsername = {
    path: '/api/users/update/username/:userId',
    method: 'put',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;

        const buf = Buffer.from(req.body.data, 'base64');
        //console.log("1 - buf", typeof buf + " : " + buf);
        const content = JSON.parse(buf.toString('utf8'));
        //console.log("2 - content", typeof content + " : " + content)

        // Create the const updates using an anonymous function and
        //  passing in an argument, here content.
        // The body of the function can operate on the supplied argument.
        // The result will be a constant with the value determined by the 
        //  functionality of the anonymous function.
        const updates = ((data) => (
            data.username || null
        ))(content);

        console.log("3 - updates", typeof updates + " : " + updates);

        if (!authorization) {
            return res.status(401).json({ message: "Not authorized." });
        }

        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: "Unable to verify user." });
            // console.log("decoded", decoded);
            const { _id, email } = decoded;
            // console.log("decoded email", email[0]);
            if (_id != userId) return res.status(403).json({ message: "Not allowed to update user data." });
            if (!email[0].isVerified) return res.status(403).json({ message: "You need to verify your email address prior to gaining access." });

            const date = new Date();
            const lastUpdated = date.toISOString();

            try {
                // console.log("updateUserProfile");
                const db = getDbConnection('Webshop2');
                const o_id = new ObjectId(userId);// *** Important *** without ObjectId() mongodb doesn't find the _id
                // console.log("updates.username:", updates.username + " : " + o_id);
                const result = await db.collection('Users').findOneAndUpdate(
                    { '_id': o_id },
                    {
                        $set: {
                            lastUpdated: lastUpdated,
                            'login.username': updates
                            /** The correct way to only update login.usename field */
                        }
                    },
                    {
                        projection: userProjection,
                        returnDocument: 'after' // Return the updated document.
                    }
                );
                console.log("result ", result);

                jwt.sign(
                    result.value,
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