import { getDbConnection } from '../db';

export const updateUser = {
    path: '/api/users/update/:id',
    method: 'post',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { id } = req.params;

        try {
            // console.log("updateUserProfile");
            const db = getDbConnection('Webshop2');

            const o_id = new Object(id);// *** Important *** without this mongodb doesn't find the _id
            const user = await db.collection('Users').findOne({ '_id': o_id });

        } catch (err) {
            console.log("getProductList-catch", err);
            return res.sendStatus(500);
        }
    }
}
