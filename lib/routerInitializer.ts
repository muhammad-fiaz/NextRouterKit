// lib/routerInitializer.ts
import { checkConfigFile, initializeConfigFile, Config, RouterConfig } from './configChecker';
import path from 'path';
import glob from 'glob';

interface RouteConfig {
    [key: string]: string | RouteConfig;
}

const processRouteConfig = (config: RouteConfig, currentPath: string = ''): void => {
    for (const key in config) {
        const newPath = path.join(currentPath, key);

        if (typeof config[key] === 'string') {
            // Handle leaf nodes (actual routes)
            console.log(`Add route: ${newPath} -> ${config[key]}`);
            // Perform actions based on the route path and target
            // You might want to write a Next.js routing configuration here.
        } else {
            // Recursively process nested configurations
            processRouteConfig(config[key] as RouteConfig, newPath);
        }
    }
};

const getFiles = (pattern: string): string[] => {
    return glob.sync(pattern);
};

const initializeRoutesFromConfig = (config: RouterConfig): void => {
    const includes = config.includes || [];
    const excludes = config.excludes || [];

    for (const includePattern of includes) {
        const files = getFiles(includePattern);

        for (const file of files) {
            const relativePath = path.relative(process.cwd(), file);
            if (!excludes.some((excludePattern) => relativePath.match(excludePattern))) {
                console.log(`Add route from config: ${relativePath}`);
                // Perform actions based on the route path and target
                // You might want to write a Next.js routing configuration here.
            }
        }
    }
};

export const initializeRoutes = (): void => {
    const configFile = checkConfigFile();

    if (!configFile) {
        initializeConfigFile();
        console.log('Default configuration file created. Please customize it in nextrouter.config.json.');
        return;
    }

    // Start processing the route configuration
    processRouteConfig(configFile.router as unknown as RouteConfig);

    // Initialize routes based on include/exclude patterns
    initializeRoutesFromConfig(configFile.router);
};
