import type { PluginList, PluginInfo } from '../types.js';
import type { CreateLoggerReturns } from './logger.js';
declare const resolvePlugins: <T, U>(allPlugins: PluginList<any, import("../types.js").EmptyObject>, { rootDir, logger, }: {
    rootDir: string;
    logger: CreateLoggerReturns;
}) => Promise<PluginInfo<T, U, any>[]>;
export default resolvePlugins;
