import path from 'path';
const localPath = '../../data-store/images/';

export const getImageRoute = {
    path: '/api/images/:image',
    method: 'get',
    handler: async (req, res) => {
        const { image } = req.params;
        console.log("getImageRoute-image:", image);

        // Checks if the image parameter is old type or not. Old type has an = sign.
        // const img = image.match('=') !== null ? image.split('=')[1] : image;

        try {
            res.sendFile(path.join(__dirname, localPath, image));
        } catch (err) {
            console.log("getImageRoute", err);
            res.sendStatus(401);
        }
    }
}