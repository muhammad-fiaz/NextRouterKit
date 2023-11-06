#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const createConfigFile = () => {
    const configFile = 'nextrouterkit.config.json';
    const configFilePath = path.resolve(process.cwd(), configFile);

    if (fs.existsSync(configFilePath)) {
        console.log(`Configuration file (${configFile}) already exists in the root.`);
        console.log(`You can edit this file manually if needed. (${configFilePath})`);

    } else {
        // Create a basic configuration file
        const defaultConfig = {
            router: {
                includes: ["./**/*.{html,htm}"],
                excludes: [],
            },
        };

        fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
        console.log(`Configuration file (${configFile}) created successfully.`);
    }
};

const command = process.argv[2];

if (command === 'init') {
    createConfigFile();
} else {
    console.log('Invalid command. Please use "npx nextrouterkit init" to initialize the configuration.');
}
