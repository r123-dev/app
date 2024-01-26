import path from 'path';
import fs from 'fs-extra';
const loadPkg = (rootDir, logger) => {
    const resolvedPath = path.resolve(rootDir, 'package.json');
    let config = {};
    if (fs.existsSync(resolvedPath)) {
        try {
            config = fs.readJsonSync(resolvedPath);
        }
        catch (err) {
            logger.info(`Fail to load config file ${resolvedPath}, use empty object`);
        }
    }
    return config;
};
export default loadPkg;
