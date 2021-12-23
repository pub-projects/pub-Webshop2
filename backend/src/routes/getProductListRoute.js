import { getDbConnection } from '../db';

export const getProductList = {
    path: '/api/products/getProductList',
    method: 'get',
    handler: async (req, res) => {
        try {
            const db = getDbConnection('webshop2');

            const data = await db.collection('products').find({}).toArray((err, result) => {
                if (err) {
                    console.log("getProductList-find.toArray:", err);
                    return res.sendStatus(500);
                }
                return res.status(200).json(result);
            });

        } catch (err) {
            console.log("getProductList-catch", err);
            return res.sendStatus(500);
        }
    }
}

