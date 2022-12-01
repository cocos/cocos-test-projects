import { find, Button } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('particle-main')
@testClass('ParticleMain')
export class ParticleMain {
    _delay = 0.3;
    _dt = 30;

    @testCase
    async startPlay() {
        // 起始一下
        await screenshot_custom();
        // 30帧后截图一下， 当列一个粒子
        await screenshot_custom(this._dt*2);
        // 90帧截图一下， 单列4个粒子
        await screenshot_custom(this._dt*6);
        // 90帧截图一下， 单列5个粒子
        await screenshot_custom(this._dt*2);

        // 按钮一下
        find('Canvas//Button')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();

        // 文字出现后移动一下
        //@ts-ignore
        find('Camera').getComponent('first-person-camera')._euler = {x: -8.600000000000007, y: -2.20000000000001, z: 0}
        await screenshot_custom(this._dt);
        /**
        for (let i = 0; i < 8; i++) {
            await screenshot_custom(this._dt);
        };
         */
    }

}