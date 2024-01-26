import Context from './Context.js';
import type { ContextOptions } from './types.js';
export interface ICommandFn<T, U, K> {
    (ctx: Context<T, U, K>): void | Promise<void> | any;
}
export interface IServiceOptions<T, U, K> {
    /** Name of service */
    name: string;
    command: Partial<Record<'start' | 'build' | 'test' | string, ICommandFn<T, U, K>>>;
    extendsPluginAPI?: U;
}
declare class Service<T, U = any, K = any> {
    private serviceConfig;
    constructor(serviceConfig: IServiceOptions<T, U, K>);
    run: (options: ContextOptions<U>) => Promise<void>;
}
export default Service;
