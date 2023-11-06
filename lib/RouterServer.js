const express = require('express');
const path = require('path');
const fs = require('fs');
const generateRoutes = require('./routerfiles');
const chokidar = require('chokidar');

function startServer() {
    const app = express();

    // Function to refresh the server
    const refreshServer = () => {
        // Implement your server refresh logic here
        console.log('Refreshing server...');
        // For example, you can send a signal to the client to refresh the page here
        // (e.g., using socket.io or any other method suitable for your application)
    };

    // Set up static file serving for each route
    const routes = generateRoutes(refreshServer);

    // Serve the HTML file for each route
    for (const routePath in routes) {
        const filePath = routes[routePath];
        const absolutePath = path.resolve(process.cwd(), filePath);

        app.get(`/${routePath}`, (req, res) => {
            if (fs.existsSync(absolutePath)) {
                res.sendFile(absolutePath);
            } else {
                res.status(404).sendFile(path.resolve(process.cwd(), '404.html'));
            }
        });
    }

    // Set up a catch-all route for the root path
    app.get('/', (req, res) => {
        const rootPath = routes['/'];
        if (rootPath) {
            const absolutePath = path.resolve(process.cwd(), rootPath);
            if (fs.existsSync(absolutePath)) {
                res.sendFile(absolutePath);
            } else {
                res.status(404).sendFile(path.resolve(process.cwd(), '404.html'));
            }
        } else {
            res.status(404).sendFile(path.resolve(process.cwd(), '404.html'));
        }
    });

    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    // Watch for file changes
    const watcher = chokidar.watch(['./path/to/watched/files']);

    watcher.on('change', (changedFile) => {
        console.log(`File changed: ${changedFile}`);

        // Re-generate routes and refresh the server
        generateRoutes(refreshServer);

        // Log only in development mode
        if (process.env.NODE_ENV === 'development') {
            console.log('Reloading page...');
        }
    });

    watcher.on('add', (newFile) => {
        console.log(`New file added: ${newFile}`);

        // Re-generate routes and refresh the server
        generateRoutes(refreshServer);

        // Log only in development mode
        if (process.env.NODE_ENV === 'development') {
            console.log('Reloading page...');
        }
    });
}

module.exports = { startServer };
