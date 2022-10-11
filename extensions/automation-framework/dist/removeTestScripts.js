"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updataJsonObject = exports.getArgv = exports.processJudge = exports.startTest = void 0;
const fs_extra_1 = require("fs-extra");
/**
 * @zh 命令行启动构建编译
 * @param process
 * @param name
 */
async function startTest(process, name) {
    const result = processJudge(process);
    const autoTest = {
        'automation-framework': {
            AutoTest: '',
            __version__: '1.0.0',
        },
    };
    if (result) {
        const testConfigPath = getArgv('--testConfig');
        const platformIndex = Number(getArgv('--platformIndex'));
        // 修改buildConfig文件中的AutoTest值
        const len = process.argv.length;
        const index = process.argv[len - 1].includes('configPath');
        if (index) {
            const buildPath = process.argv[len - 1].split('=')[1];
            const buildConfigData = JSON.parse((0, fs_extra_1.readFileSync)(buildPath, 'utf-8'));
            updataJsonObject(buildConfigData, 'packages', autoTest);
            buildConfigData.packages[name].AutoTest = true;
            (0, fs_extra_1.writeJsonSync)(buildPath, buildConfigData);
        }
    }
    else {
        if (!await Editor.Panel.has(name)) {
            console.log('developer open panel');
        }
        // 修改buildConfig文件中的AutoTest值
        const len = process.argv.length;
        const index = process.argv[len - 1].includes('configPath');
        if (index) {
            const buildPath = process.argv[len - 1].split('=')[1];
            const buildConfigData = JSON.parse((0, fs_extra_1.readFileSync)(buildPath, 'utf-8'));
            updataJsonObject(buildConfigData, 'packages', autoTest);
            buildConfigData.packages[name].AutoTest = false;
            (0, fs_extra_1.writeJsonSync)(buildPath, buildConfigData);
        }
    }
}
exports.startTest = startTest;
/**
 * @zh 判断命令行传参是否正确
 * @param process
 * @returns
 */
function processJudge(process) {
    let result = true;
    let index = 0;
    const params = ['--project', '--testConfig', '--platformIndex', '--build', 'configPath'];
    if (process.argv.length >= 9) {
        for (const data of params) {
            for (const argv of process.argv) {
                if (argv.includes(data)) {
                    index += 1;
                }
            }
        }
        if (index === params.length) {
            result = true;
        }
        else {
            result = false;
        }
    }
    else {
        result = false;
    }
    return result;
}
exports.processJudge = processJudge;
/**
 * @zh 获取命令行中部分参数的值
 * @param name
 * @returns
 */
function getArgv(name) {
    let argv = '';
    const index = process.argv.indexOf(name);
    if (index !== -1) {
        argv = process.argv[index + 1];
    }
    return argv;
}
exports.getArgv = getArgv;
/**
 *
 * @param data
 * @param fild
 * @param value
 * @returns
 */
function updataJsonObject(data, fild, value) {
    const key = Object.keys(value)[0];
    if (data.hasOwnProperty(fild)) {
        if (JSON.stringify(data[fild][key]) != JSON.stringify(value[key])) {
            data[fild] = Object.assign(data[fild], value);
        }
        else {
            console.log('无需修改');
        }
    }
    else {
        console.log(`字段${fild}不存在`);
    }
    return data;
}
exports.updataJsonObject = updataJsonObject;
