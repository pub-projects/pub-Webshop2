import { getDbConnection } from '../db';

export const usernameExists = {
    path: '/api/users/usernameExists',
    method: 'post',
    handler: async (req, res) => {
        // console.log("usernameExists");
        try {
            const { username } = req.body;
            // console.log("username", username);
            const db = await getDbConnection('Webshop2');
            const user = await db.collection('Users').findOne({ 'login.username': username });
            // console.log("user", user);

            if (!user) return res.status(200).json({ exists: false });

            res.status(200).json({ exists: true });

        } catch (err) {
            console.log("loginRoute-catch", err);
            return res.sendStatus(500);
        }
    }
}