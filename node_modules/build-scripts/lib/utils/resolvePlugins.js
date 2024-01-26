var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from 'path';
import _ from 'lodash';
import { createRequire } from 'module';
import dynamicImport from './dynamicImport.js';
const require = createRequire(import.meta.url);
const resolvePlugins = (allPlugins, { rootDir, logger, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userPlugins = yield Promise.all(allPlugins.map((pluginInfo) => __awaiter(void 0, void 0, void 0, function* () {
        let pluginInstance;
        if (_.isFunction(pluginInfo)) {
            return {
                setup: pluginInfo,
                options: {},
            };
        }
        else if (typeof pluginInfo === 'object' && !Array.isArray(pluginInfo)) {
            return pluginInfo;
        }
        const plugins = Array.isArray(pluginInfo)
            ? pluginInfo
            : [pluginInfo, undefined];
        const pluginResolveDir = process.env.EXTRA_PLUGIN_DIR
            ? [process.env.EXTRA_PLUGIN_DIR, rootDir]
            : [rootDir];
        const pluginPath = path.isAbsolute(plugins[0])
            ? plugins[0]
            : require.resolve(plugins[0], { paths: pluginResolveDir });
        const options = plugins[1];
        try {
            pluginInstance = yield dynamicImport(pluginPath);
        }
        catch (err) {
            if (err instanceof Error) {
                logger.error(`Fail to load plugin ${pluginPath}`);
                logger.error(err.stack || err.toString());
                process.exit(1);
            }
        }
        return {
            name: plugins[0],
            pluginPath,
            setup: pluginInstance.default || pluginInstance || (() => { }),
            options,
        };
    })));
    return userPlugins;
});
export default resolvePlugins;
