import type { CreateLoggerReturns } from './logger.js';
import type { Json } from '../types.js';
declare const loadPkg: (rootDir: string, logger: CreateLoggerReturns) => Json;
export default loadPkg;
