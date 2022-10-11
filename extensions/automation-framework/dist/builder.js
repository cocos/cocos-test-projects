"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.unload = exports.load = void 0;
const load = function () {
    console.debug('custom-build-example load');
};
exports.load = load;
const unload = function () {
    console.debug('custom-build-example unload');
};
exports.unload = unload;
//export const assetHandlers: string = './asset-handlers';
exports.configs = {
    '*': {
        hooks: './hooks',
        options: {
            AutoTest: {
                default: false,
            },
        },
    },
};
