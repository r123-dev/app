/* eslint-disable no-nested-ternary */
import consola from 'consola';
import picocolors from 'picocolors';
// copy from consola
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Fatal"] = 0] = "Fatal";
    LogLevel[LogLevel["Error"] = 0] = "Error";
    LogLevel[LogLevel["Warn"] = 1] = "Warn";
    LogLevel[LogLevel["Log"] = 2] = "Log";
    LogLevel[LogLevel["Info"] = 3] = "Info";
    LogLevel[LogLevel["Success"] = 3] = "Success";
    LogLevel[LogLevel["Debug"] = 4] = "Debug";
    LogLevel[LogLevel["Trace"] = 5] = "Trace";
    LogLevel[LogLevel["Silent"] = -Infinity] = "Silent";
    LogLevel[LogLevel["Verbose"] = Infinity] = "Verbose";
})(LogLevel || (LogLevel = {}));
const colorize = (type) => (msg) => {
    const color = type === LogLevel.Info
        ? 'blue'
        : type === LogLevel.Error
            ? 'red'
            : type === LogLevel.Warn
                ? 'yellow'
                : 'green';
    return picocolors[color](msg);
};
function colorizeNamespace(name, type) {
    return name ? `${picocolors.dim('[')}${colorize(type)(name.toUpperCase())}${picocolors.dim(']')} ` : '';
}
/**
 * create logger
 * @param name
 * @returns
 */
export function createLogger(namespace) {
    return {
        info(...args) {
            consola.info(colorizeNamespace(namespace, LogLevel.Info), ...args.map((item) => colorize(LogLevel.Info)(item)));
        },
        error(...args) {
            consola.error(colorizeNamespace(namespace, LogLevel.Error), ...args.map((item) => colorize(LogLevel.Error)(item)));
        },
        warn(...args) {
            consola.warn(colorizeNamespace(namespace, LogLevel.Warn), ...args.map((item) => colorize(LogLevel.Warn)(item)));
        },
        debug(...args) {
            consola.debug(colorizeNamespace(namespace, LogLevel.Debug), ...args.map((item) => colorize(LogLevel.Debug)(item)));
        },
    };
}
