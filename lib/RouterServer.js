const express = require('express');
const path = require('path');
const generateRoutes = require('./routerfiles');

function startServer() {
    const app = express();
    const routes = generateRoutes();

    // Set up static file serving for each route
    for (const routePath in routes) {
        const filePath = routes[routePath];
        const absolutePath = path.resolve(process.cwd(), filePath);

        // Serve the HTML file for each route
        app.get(`/${routePath}`, (req, res) => {
            res.sendFile(absolutePath);
        });
    }

    // Set up a catch-all route for the root path
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(process.cwd(), routes['/']));
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = { startServer };
