// routerfiles.js

const { loadConfig } = require('./RouterInitialize');
const glob = require('glob');
const path = require('path');

const generateRoutes = (refreshCallback) => {
    const config = loadConfig();

    if (config) {
        const { router } = config;

        const files = glob.sync(router.includes, { ignore: router.excludes });

        const routes = {};

        files.forEach((file) => {
            const relativePath = path.relative(process.cwd(), file);
            const parsedPath = path.parse(relativePath);

            // Replace backslashes with forward slashes (for Windows compatibility)
            const routePath = parsedPath.dir.replace(/\\/g, '/') + '/' + parsedPath.name;

            // Remove "/index" from the route path if found
            const cleanedRoutePath = routePath.endsWith('/index') ? routePath.slice(0, -5) : routePath;

            // Add the route path to the routes object
            routes[cleanedRoutePath] = file;
        });

        // Invoke the refreshCallback when the file list changes
        refreshCallback();

        return routes;
    } else {
        console.error('Configuration not found. Make sure to run "npx nextrouterkit init" to create the configuration file.');
        return null;
    }
};

module.exports = generateRoutes;
