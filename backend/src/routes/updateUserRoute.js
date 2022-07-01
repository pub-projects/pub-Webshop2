import { getDbConnection } from '../db';
import jwt from 'jsonwebtoken';
import md5 from 'crypto-js/md5';
import { ObjectId } from 'mongodb';
import { userObjectToClientProjection as userProjection, UserUpdateClass, userCompareExclusions } from '../models/objectsAndClasses';

/** Recives the user object in the body data.
 * Returns the new updated user together with a new token.
 */
export const updateUser = {
    path: '/api/users/update/user/:userId',
    method: 'put',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;

        // console.log("updateUser - id:", userId);
        // console.log("updateUser - authorization:", authorization);
        // console.log("updateUser - req.body:", req.body);

        const buf = Buffer.from(req.body.data, 'base64');
        const content = JSON.parse(buf.toString('utf8'));

        // console.log("updateUser - content:", content);

        // Extract resetFormData
        const updates = ((
            data
        ) => (
            data
        ))(content);

        // console.log("updateUser - decoded-updates:", updates);

        if (!authorization) {
            return res.status(401).json({ message: "Not authorized." });
        }

        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({ message: "Unable to verify user." });
            // console.log("updateUser - jwt.verify - decoded:", decoded);
            const { _id: id, email } = decoded;
            // console.log("updateUser - jwt.verify - decoded email: ", email[0]);
            // console.log("updateUser - jwt.verify - decoded id: ", id);
            if (id != userId) return res.status(403).json({ message: "Not allowed to update user data." });
            if (!email[0].isVerified) return res.status(403).json({ message: "You need to verify your email address prior to gaining access." });

            const date = new Date();
            // 

            /**
        * We should have implemented a check that the data from the client doesn't contain 
        * things that we don't want to send to our database or any malicious compared
        * that could compromise security on our site. It might be done at a later stage,
        * but this is just a demo site and for now it is not a primary concern.
        */
            try {
                const db = await getDbConnection("Webshop2");
                const o_id = new ObjectId(userId);
                const oldUser = await db.collection("Users").findOne(
                    { '_id': o_id },
                    {
                        projection: userCompareExclusions
                    }
                );

                // console.log("updateUser - decoded-updates:", updates);
                // console.log("updateUser - oldUser (from DB):", oldUser);
                const newUser = JSON.parse(JSON.stringify(updates));
                // newUser.registered.updated = lastUpdated;
                delete newUser._id;
                delete newUser.iat;
                delete newUser.exp;
                delete newUser.lastUpdated;

                const UserUpdate = new UserUpdateClass(newUser, oldUser);
                const updateArray = UserUpdate.createUpdateArray();
                let updateStr = "", tmp;

                for (let i = 0; i < updateArray.length; i++) {
                    tmp = updateArray[i].split(":");
                    // console.log("updateUser - tmp[]: ", tmp);
                    updateStr += `"${tmp[0]}":`;
                    // console.log("updateUser - updateStr 1: ", updateStr);
                    if (Number.isNaN(Number.parseFloat(tmp[1]))) updateStr += `"${tmp[1]}"`
                    else updateStr += tmp[1];
                    console.log("updateUser - updateStr 2: ", updateStr);
                    updateStr += ",";
                }
                const lastUpdated = '"registered.updated"' + ':' + `"${date.toISOString()}"`;
                updateStr += lastUpdated + "}";
                updateStr = "{" + updateStr;
                // console.log("updateUserRoute - updateStr: ", updateStr);
                const updateObj = { $set: JSON.parse(updateStr) };
                // console.log("updateUserRoute - updateObj: ", updateObj);

                const result = await db.collection('Users').findOneAndUpdate(
                    { '_id': o_id },
                    updateObj,
                    {
                        projection: userProjection,
                        returnDocument: 'after' // Return the updated document.
                    }
                );
                console.log("updateUserRoute - result ", result);

                // jwt.sign(
                //     result.value,
                //     process.env.JWT_SECRET,
                //     {
                //         expiresIn: '2d',
                //     },
                //     (err, token) => {
                //         if (err) {
                //             return res.status(500).send("jwt" + err);
                //         }
                //         res.status(200).json({ token });
                //     }
                // )
                // console.log("updateUser - updateArray: ", updateArray);
                // console.log("updateUser - updateStr: ", updateStr);
                // const updateClass = new userUpdateClass()
                // const updateArray = updateClass.createUpdateArray();
                console.log("end of function");

                /**
                 * Temporary response.
                 */
                return res.status(200).json(updateArray);

            } catch (err) {
                console.error(err);
            }
        });
    }
}
