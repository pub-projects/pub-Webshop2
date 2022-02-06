import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db';

export const getProductById = {
    path: '/api/products/getProductById/:id',
    method: 'get',
    handler: async (req, res) => {
        try {
            const db = getDbConnection('Webshop2');
            const { id } = req.params;
            const o_id = new ObjectId(id); // *** Important *** without this mongodb doesn't find the _id

            const data = await db.collection('Products').findOne({ _id: o_id });

            if (!data) return res.sendStatus(401);

            return res.status(200).json(data);
        } catch (err) {
            console.log("getProductById:", err);
            return res.sendStatus(500);
        }
    }
}