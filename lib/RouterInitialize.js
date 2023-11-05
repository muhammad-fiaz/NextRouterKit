const fs = require('fs');
const path = require('path');

const loadConfig = () => {
    const configFile = 'nextrouterkit.config.json';
    const configFilePath = path.resolve(process.cwd(), configFile);

    if (!fs.existsSync(configFilePath)) {
        console.error(`Error: Configuration file (${configFile}) not found.`);
        return null; // Or you can throw an error: throw new Error(`Configuration file (${configFile}) not found.`);
    }

    const configContent = fs.readFileSync(configFilePath, 'utf8');
    return JSON.parse(configContent);
};

console.log(loadConfig());
module.exports = { loadConfig };
