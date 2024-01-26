/**
 * create logger
 * @param name
 * @returns
 */
export declare function createLogger(namespace?: string): {
    info(...args: string[]): void;
    error(...args: string[]): void;
    warn(...args: string[]): void;
    debug(...args: string[]): void;
};
export declare type CreateLoggerReturns = ReturnType<typeof createLogger>;
