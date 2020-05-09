import { _decorator, Component, Node, CCObject , LabelComponent} from 'cc';
const { ccclass, property } = _decorator;

import {last_time_result} from "./ByteCodeCache";

@ccclass('typescript')
export class typescript extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({type: cc.LabelComponent})
    statusLabel: LabelComponent = null;

    
    @property({type: cc.LabelComponent})
    titleLabel: LabelComponent = null;

    start() {
        setTimeout(this.run_test.bind(this), 0);
    }

    run_test () {
        // Your initialization goes here.
        this.titleLabel.string ="Bytecode Test";

        if(typeof jsb === "undefined" || !jsb.saveByteCode) {
            this.statusLabel.string = "Bytecode is not supported!";
        } else {

            if(last_time_result.done) {
                this.statusLabel.string = last_time_result.message;
                this.titleLabel.string ="Bytecode Test (cached result)";
                return;
            }
            do { 
                this.statusLabel.string = "Generating JS file..";
                let src_file = jsb.fileUtils.getWritablePath() + "bytecode_bigjs.js";
                let src_file2 = jsb.fileUtils.getWritablePath() + "bytecode_bigjs2.js";
                {
                    
                    let start = (new Date).getTime();
                    if(jsb.fileUtils.isFileExist(src_file)){
                        jsb.fileUtils.removeFile(src_file);
                    }
                    if(jsb.fileUtils.isFileExist(src_file2)){
                        jsb.fileUtils.removeFile(src_file2);
                    }
                    let code_list = ["function test_func_0() { return Math.random();}"];
                    let func_cnt = 100000;
                    for(let i = 1;i < func_cnt; i++) {
                        code_list.push(`function test_func_${i}() { return test_func_${i-1}() * Math.random();}`)
                    }
                    code_list.push(`if(Math.random() < 0.00000001) console.log("wow " + test_func_${func_cnt-1}());`);
                    let data = code_list.join("\n");
                    let ok = jsb.fileUtils.writeStringToFile(data+`"Success bc"`, src_file);
                    if(!ok) {
                        this.statusLabel.string += "\n - failed to save source code.";
                        break ;
                    }
                    ok = jsb.fileUtils.writeStringToFile(data+`"Success js"`, src_file2);
                    if(!ok) {
                        this.statusLabel.string += "\n - failed to save source code..";
                        break;
                    }
                    this.statusLabel.string += "\n - file size "+ data.length;
                    let end = (new Date).getTime();
                    this.statusLabel.string += "\n - generating scripts takes " +(end -start) + "ms";
                } 
                this.statusLabel.string += "\nGenerating bytecode..";
                let dst_file = src_file + ".bc";
                {
                    if(jsb.fileUtils.isFileExist(dst_file)) {
                        jsb.fileUtils.removeFile(dst_file);
                    }

                    let start = (new Date).getTime();
                    let ok = jsb.saveByteCode(src_file, dst_file);
                    let end = (new Date).getTime();
                    if(!ok) {
                        this.statusLabel.string += "\n - failed to generate bytecode!";
                        break;
                    }
                    this.statusLabel.string += "\n - generating bytecode takes " +(end -start) + "ms";
                }
                this.statusLabel.string += "\nRunning bytecode.. (shorter time expected)";
                {
                    let start = (new Date).getTime();
                    let result = require(dst_file);
                    let end = (new Date).getTime();
                    this.statusLabel.string += "\n - script return: " +result;
                    this.statusLabel.string += "\n - require bytecode takes " +(end -start) + "ms";
                }
                this.statusLabel.string += "\nRunning text script.. (longer time expected)";
                {
                    let start = (new Date).getTime();
                    let result = require(src_file2);
                    let end = (new Date).getTime();
                    this.statusLabel.string += "\n - script return: " +result;
                    this.statusLabel.string += "\n - require text script takes " +(end -start) + "ms";
                }
            }while(false);

            last_time_result.done = true;
            last_time_result.message = this.statusLabel.string;
        }
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
