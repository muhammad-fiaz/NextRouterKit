const { loadConfig } = require('./RouterInitialize');
const glob = require('glob');
const path = require('path');

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

        routes[routePath] = file;
    });

    console.log('Routes assigned based on file structure:');
    console.log(routes);
} else {
    console.error('Configuration not found. Make sure to run "npx nextrouterkit init" to create the configuration file.');
}
