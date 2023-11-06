const fs = require('fs');
const path = require('path');

const loadConfig = () => {
    const configFile = 'nextrouterkit.config.json';
    const configFilePath = path.resolve(process.cwd(), configFile);

    if (!fs.existsSync(configFilePath)) {
        console.error(`Error: Configuration file (${configFile}) not found.`);
        process.exit(1); // Terminate the process with a non-zero exit code
    }

    const configContent = fs.readFileSync(configFilePath, 'utf8');
    return JSON.parse(configContent);
};

console.log(loadConfig());
module.exports = { loadConfig };
