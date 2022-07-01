import express from 'express';
import { initializeDbConnection } from './db';
import { routes } from './routes';

const PORT = process.env.SERVER_PORT || 8080;

const app = express();

app.use(express.json());

// Add all routes from routes/index.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Webshop server is listening on port ${PORT}`);
        });
    });

export default app;