// lib/configChecker.ts
import fs from 'fs';
import path from 'path';

export interface RouterConfig {
    includes: string[];
    excludes: string[];
}

export interface Config {
    router: RouterConfig;
}

export const checkConfigFile = (): Config | null => {
    const configFiles = ['nextrouterkit.config.ts', 'nextrouterkit.config.js', 'nextrouterkit.config.json'];

    for (const configFile of configFiles) {
        const filePath = path.resolve(process.cwd(), configFile);

        if (fs.existsSync(filePath)) {
            console.log(`Configuration file (${configFile}) already exists in the root.`);
            return require(filePath) as Config;
        }
    }

    return null;
};

export const initializeConfigFile = (): void => {
    const configFilePath = path.resolve(process.cwd(), 'nextrouterkit.config.json');

    if (fs.existsSync(configFilePath)) {
        console.log('Configuration file already exists. No action taken.');
    } else {
        const defaultConfig: Config = {
            router: {
                includes: ["./**/*.{ts,js,tsx,jsx}"],
                excludes: [],
            },
        };

        fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
        console.log('nextrouterkit.config.json created successfully with default configuration.');
    }
};
