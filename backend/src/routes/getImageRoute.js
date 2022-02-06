import path from 'path';
const localPath = '../../data-store/images/';


export const getImageRoute = {
    path: '/api/images/:image',
    method: 'get',
    handler: async (req, res) => {
        const { image } = req.params;

        try {
            res.sendFile(path.join(__dirname, localPath, image));
        } catch (err) {
            console.log("getImageRoute", err);
            res.sendStatus(401);
        }
    }
}