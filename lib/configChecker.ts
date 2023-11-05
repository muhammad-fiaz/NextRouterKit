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
    const configFiles = ['nextrouter.config.ts', 'nextrouter.config.js', 'nextrouter.config.json'];

    for (const configFile of configFiles) {
        const filePath = path.resolve(process.cwd(), configFile);

        if (fs.existsSync(filePath)) {
            return require(filePath) as Config;
        }
    }

    return null;
};

export const initializeConfigFile = (): void => {
    const defaultConfig: Config = {
        router: {
            includes: ["./router/index.ts", "./**/*.{ts,js}"],
            excludes: [],
        },
    };

    const configFilePath = path.resolve(process.cwd(), 'nextrouter.config.json');
    fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));

    console.log('nextrouter.config.json created successfully with default configuration.');
};
