import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

import { LastTimeResult } from './ByteCodeCache';

declare const jsb: any;

declare function require(pkg: string): any;

@ccclass('ByteCodeCache')
export class ByteCodeCache extends Component {
    @property({ type: Label })
    public statusLabel: Label = null!;

    @property({ type: Label })
    public titleLabel: Label = null!;

    public isAutoTest = false; // In order to automate test take over

    start() {
        if (!this.isAutoTest) setTimeout(this.runTest.bind(this), 0);
    }

    runTest() {
        this.titleLabel.string = 'Bytecode Test';

        if (typeof jsb === 'undefined' || !jsb.saveByteCode) {
            this.statusLabel.string = 'Bytecode is not supported!';
        } else {

            if (LastTimeResult.done) {
                this.statusLabel.string = LastTimeResult.message;
                this.titleLabel.string = 'Bytecode Test (cached result)';
                return;
            }
            do {
                this.statusLabel.string = 'Generating JS file..';
                const src_file = jsb.fileUtils.getWritablePath() + 'bytecode_bigjs.js';
                const src_file2 = jsb.fileUtils.getWritablePath() + 'bytecode_bigjs2.js';
                {

                    const start = (new Date()).getTime();
                    if (jsb.fileUtils.isFileExist(src_file)) {
                        jsb.fileUtils.removeFile(src_file);
                    }

                    if (jsb.fileUtils.isFileExist(src_file2)) {
                        jsb.fileUtils.removeFile(src_file2);
                    }
                    const codeLines = ['function test_func_0() { return Math.random();}'];
                    const funcCount = 100000;
                    for (let i = 1; i < funcCount; i++) {
                        codeLines.push(`function test_func_${i}() { return test_func_${i - 1}() * Math.random();}`)
                    }
                    codeLines.push(`if(Math.random() < 0.00000001) console.log("wow " + test_func_${funcCount - 1}());`);
                    const codeText = codeLines.join('\n');
                    let ok = jsb.fileUtils.writeStringToFile(codeText + `"Success bc"`, src_file);
                    if (!ok) {
                        this.statusLabel.string += '\n - failed to save source code.';
                        break;
                    }
                    ok = jsb.fileUtils.writeStringToFile(codeText + `"Success js"`, src_file2);
                    if (!ok) {
                        this.statusLabel.string += '\n - failed to save source code..';
                        break;
                    }
                    this.statusLabel.string += '\n - file size ' + codeText.length;
                    const end = (new Date()).getTime();
                    this.statusLabel.string += '\n - generating scripts takes ' + (end - start) + 'ms';
                }
                this.statusLabel.string += '\nGenerating bytecode..';
                const dstFile = src_file + '.bc';
                {
                    if (jsb.fileUtils.isFileExist(dstFile)) {
                        jsb.fileUtils.removeFile(dstFile);
                    }

                    const start = (new Date()).getTime();
                    const ok = jsb.saveByteCode(src_file, dstFile);
                    const end = (new Date()).getTime();
                    if (!ok) {
                        this.statusLabel.string += '\n - failed to generate bytecode!';
                        break;
                    }
                    this.statusLabel.string += '\n - generating bytecode takes ' + (end - start) + 'ms';
                }
                this.statusLabel.string += '\nRunning bytecode.. (shorter time expected)';
                {
                    const start = (new Date()).getTime();
                    const result = require(dstFile);
                    const end = (new Date()).getTime();
                    this.statusLabel.string += '\n - script return: ' + result;
                    this.statusLabel.string += '\n - require bytecode takes ' + (end - start) + 'ms';
                }
                this.statusLabel.string += '\nRunning text script.. (longer time expected)';
                {
                    const start = (new Date()).getTime();
                    const result = require(src_file2);
                    const end = (new Date()).getTime();
                    this.statusLabel.string += '\n - script return: ' + result;
                    this.statusLabel.string += '\n - require text script takes ' + (end - start) + 'ms';
                }
            } while (false);

            LastTimeResult.done = true;
            LastTimeResult.message = this.statusLabel.string;
        }
    }

}
