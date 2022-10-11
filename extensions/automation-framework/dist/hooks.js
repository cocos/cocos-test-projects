"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.onAfterBuild = exports.onAfterCompressSettings = exports.onBeforeCompressSettings = exports.onAfterInit = exports.onBeforeBuildAssets = exports.onBeforeInit = exports.onBeforeBuild = exports.load = exports.throwError = void 0;
const PACKAGE_NAME = 'automation-framework';
function log(...arg) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}
exports.throwError = true;
const load = async function () {
};
exports.load = load;
const onBeforeBuild = async function (options, result) {
    // Todo some thing
    log(`${PACKAGE_NAME}`, 'onBeforeBuild');
};
exports.onBeforeBuild = onBeforeBuild;
const onBeforeInit = async function (options, result) {
    // Todo some thing
    // options.packages[PACKAGE_NAME].AutoTest = false
};
exports.onBeforeInit = onBeforeInit;
const skipTestScripts = '.test.ts';
async function onBeforeBuildAssets(options, result, cache) {
    const pkgOptions = options.packages[PACKAGE_NAME];
    if (!pkgOptions.AutoTest) {
        const testFramework = await Editor.Message.request('asset-db', 'query-asset-info', 'db://automation-framework/runtime/test-framework.mjs');
        const mainTs = await Editor.Message.request('asset-db', 'query-asset-info', 'db://automation-framework/runtime/main.ts');
        for (const bundle of result.bundles) {
            if ((testFramework === null || testFramework === void 0 ? void 0 : testFramework.uuid) !== undefined) {
                log(`automation-framework/runtime/test-framework.mjs---${testFramework === null || testFramework === void 0 ? void 0 : testFramework.uuid} has been removed`);
                bundle.removeAsset(testFramework === null || testFramework === void 0 ? void 0 : testFramework.uuid);
            }
            if ((mainTs === null || mainTs === void 0 ? void 0 : mainTs.uuid) !== undefined) {
                log(`automation-framework/runtime/main.ts---${mainTs === null || mainTs === void 0 ? void 0 : mainTs.uuid} has been removed`);
                bundle.removeAsset(mainTs === null || mainTs === void 0 ? void 0 : mainTs.uuid);
            }
            for (const scriptUuid of bundle.scripts) {
                const script = cache.getAssetInfo(scriptUuid);
                if (script.name.indexOf(skipTestScripts) !== -1) {
                    log(`${script.name}---${scriptUuid} has been removed`);
                    bundle.removeAsset(scriptUuid);
                }
            }
            log(`${PACKAGE_NAME}`, 'onBeforeBuildAssets');
        }
    }
}
exports.onBeforeBuildAssets = onBeforeBuildAssets;
const onAfterInit = async function (options, result) {
    // Todo some thing
};
exports.onAfterInit = onAfterInit;
const onBeforeCompressSettings = async function (options, result) {
    // Todo some thing
    console.debug('get settings test', result.settings);
};
exports.onBeforeCompressSettings = onBeforeCompressSettings;
const onAfterCompressSettings = async function (options, result) {
    // Todo some thing
    console.log('onAfterCompressSettings');
};
exports.onAfterCompressSettings = onAfterCompressSettings;
const onAfterBuild = async function (options, result) {
    // Todo some thing
};
exports.onAfterBuild = onAfterBuild;
const unload = async function () {
    console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
};
exports.unload = unload;
