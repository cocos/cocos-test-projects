// @ts-ignore
import { runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';

import { find } from 'cc';

@runScene('static-batching')
@testClass('StaticBatching')
export class StaticBatching {
    _dt = 10
    _delay = 0.5


    @testCase
    async startPlay() {
        await sleep(this._delay);
        await screenshot_custom(this._dt)
    }

    @testCase
    async maxBoxes() {
        await sleep(this._delay);
        this.addOrReduce('add');
        this.addOrReduce('add');
        this.addOrReduce('add');
        this.addOrReduce('add');
        this.addOrReduce('add');
        await screenshot_custom(this._dt)
    }

 

    @testCase
    async checkTrueAndReduce() {
        this.checkBox(true);
        this.addOrReduce('');
        this.addOrReduce('');
        await sleep(this._delay);
        await screenshot_custom(this._dt)
    }

  

    @testCase
    async checkFalseAndReduce() {
        this.checkBox(false);
        this.addOrReduce('');
        this.addOrReduce('');
        await sleep(this._delay);
        await screenshot_custom(this._dt)
    }

    @testCase
    async checkTrueAndAdd() {
        this.checkBox(true);
        this.addOrReduce('add');
        await sleep(this._delay);
        await screenshot_custom(this._dt)
    }

    @testCase
    async checkFalseAndAdd() {
        this.checkBox(false);
        this.addOrReduce('add');
        await sleep(this._delay);
        await screenshot_custom(this._dt)
    }

    @testCase
    async minBoxes() {
        await sleep(this._delay);
        this.addOrReduce('');
        this.addOrReduce('');
        this.addOrReduce('');
        await screenshot_custom(this._dt)
    }
    async addOrReduce(funStr: string) {
        //@ts-ignore
        if (find('Camera')) {
            //@ts-ignore
            find('Camera').getComponent('StaticBatcher').setCount(find('New Canvas/check/Toggle').getComponent('cc.Button'), funStr)
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