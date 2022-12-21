// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('lighting')
@testClass('Lighting')
export class Lighting {
    _dt = 216;
    _delay = 0.1;

    @testCase
    async oneFourPinkAppearTobox() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async pinkMoveDisappear() {
        // 截图 or 断言
        await screenshot_custom(350-this._dt);
    }
    
    @testCase
    async oneFourColorAppear() {
        // 截图 or 断言
        await screenshot_custom(518-350);
    }

    @testCase
    async twoFourPinkAppearTobox(){
        await screenshot_custom(750-518);
    }

    @testCase
    async twofourColorAppear() {
        // 截图 or 断言
        await screenshot_custom(843-750);
    }
}