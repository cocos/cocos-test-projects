// @ts-ignore
import { runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';

import { find, sys } from 'cc';

@runScene('static-batching')
// @testClass('StaticBatching')
export class StaticBatching {
    _dt = 10
    _delay = 0.5
    _delayMax=1


    @testCase
    async startPlay() {
        await screenshot_custom(this._dt)
    }


    @testCase
    async maxBoxes() {
        for(let i=0;i<5;i++){
            if(sys.platform === sys.Platform.WECHAT_GAME||sys.platform === sys.Platform.IOS||sys.platform === sys.Platform.ANDROID){
                await sleep(this._delayMax);
            }else{
                console.log('【srcipt】_delay 0.5 end')
                await sleep(this._delay);
            }
            if(i===4){
                await screenshot_custom(this._dt)
            }
            console.log('【srcipt】maxBoxes')
            await this.addOrReduce('add');
    }
        await screenshot_custom(this._dt)
    }

 

    @testCase
    async checkTrueAndReduce() {
        this.checkBox(true);
        for(let i=0;i<2;i++){
            await this.addOrReduce('');
        }
        await screenshot_custom(this._dt)
    }

  

    @testCase
    async checkFalseAndReduce() {
        this.checkBox(false);
        for(let i=0;i<2;i++){
            await this.addOrReduce('');
        }
        await screenshot_custom(this._dt)
    }

    @testCase
    async checkTrueAndAdd() {
        this.checkBox(true);
        await this.addOrReduce('add');
        await sleep(this._delay);
        await screenshot_custom(this._dt)
    }

    @testCase
    async checkFalseAndAdd() {
        this.checkBox(false);
        await this.addOrReduce('add');
        await sleep(this._delay);
        await screenshot_custom(this._dt)
    }

    @testCase
    async minBoxes() {
        await sleep(this._delay);
        for(let i=0;i<8;i++){
            await this.addOrReduce('');
        }
        await screenshot_custom(this._dt)
    }

    
    async addOrReduce(funStr: string) {
        //@ts-ignore
        if (find('Camera')) {
            //@ts-ignore
            let staticBatcher=find('Camera').getComponent('StaticBatcher')
            //@ts-ignore
            let toggle=find('New Canvas/check/Toggle').getComponent('cc.Button')
            //@ts-ignore
           await staticBatcher.setCount(toggle, funStr)
        }
    }

    async checkBox(ischeck: boolean) {
        //@ts-ignore
        if (find('Camera')) {
            //@ts-ignore
            find('Camera').getComponent('StaticBatcher').useBatch(find('New Canvas/check/Toggle').getComponent('cc.Button').isChecked = ischeck)
        }
    }

}