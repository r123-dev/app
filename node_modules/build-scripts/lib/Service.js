var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createContext } from './Context.js';
import consola from 'consola';
class Service {
    constructor(serviceConfig) {
        this.run = (options) => __awaiter(this, void 0, void 0, function* () {
            const { command } = options;
            const ctx = yield createContext(Object.assign({ extendsPluginAPI: this.serviceConfig.extendsPluginAPI }, options));
            const hasCommandImplement = Object.keys(this.serviceConfig.command).includes(command);
            if (!hasCommandImplement) {
                const errMsg = `No command that corresponds to ${command}`;
                consola.error(errMsg);
                return Promise.reject(errMsg);
            }
            return this.serviceConfig.command[command](ctx);
        });
        this.serviceConfig = serviceConfig;
    }
}
export default Service;
