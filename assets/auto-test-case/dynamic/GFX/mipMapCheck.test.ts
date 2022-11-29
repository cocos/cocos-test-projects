// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('mipMapCheck')
@testClass('MipMapCheck')
export class MipMapCheck {
    _delay = 1;
    _dt = 70;


    @testCase
    async startPlay() {
        await screenshot_custom();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        };
        await screenshot_custom(500);
    }

}