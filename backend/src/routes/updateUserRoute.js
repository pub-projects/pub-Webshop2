import { getDbConnection } from '../db';
import jwt from 'jsonwebtoken';
import md5 from 'crypto-js/md5';
import { userObjectToClientProjection as userProjection } from '../models/objectsAndClasses';

/** Recives the user object in the body data.
 * Returns the new updated user together with a new token.
 */
export const updateUser = {
    path: '/api/users/update/user/:userId',
    method: 'put',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;

        // console.log("updateUser - id", userId);
        // console.log("updateUser - authorization", authorization);

        // console.log("req.body", req.body);
        // console.log("updates", content.data);
        const buf = Buffer.from(req.body.data, 'base64');
        const content = JSON.parse(buf.toString('utf8'));
        // console.log("decoded-updates", updates)

        // Extract resetFormData
        const updates = ((
            data
        ) => (
            data
        ))(content);

        console.log("decoded-updates", updates);

        if (!authorization) {
            return res.status(401).json({ message: "Not authorized." });
        }




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
                const o_id = new ObjectId(id);// *** Important *** without ObjectId() mongodb doesn't find the _id
                const result = await db.collection('Users').findOneAndUpdate(
                    { '_id': o_id },
                    {
                        $set: {
                            lastUpdated,
                            name: updates.name,
                            location: updates.location,
                            email: updates.email,
                            username: updates.username,
                            dob: updates.dob,
                            phone: updates.phone,
                            avatar: updates.avatar,
                            lang: updates.lang
                        }
                    },
                    {
                        projection: userProjection,
                        returnDocument: 'after' // Return the updated document.
                    }
                );
                /** Encode the new user and tokenize it to send to the client */

                console.log("result ", result);

            } catch (err) {
                console.log("updateUserRoute-catch", err);
                return res.sendStatus(500);
            }
        });
    }
}
