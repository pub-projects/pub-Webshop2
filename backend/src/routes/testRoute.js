export const testRoute = {
    path: '/api/test',
    method: 'get',
    handler: (req, res) => {
        res.status(200).send('Webshop 2 server works.');
    }
};