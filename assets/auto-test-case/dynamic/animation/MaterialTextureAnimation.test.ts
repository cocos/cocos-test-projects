// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('MaterialTextureAnimation')
@testClass('MaterialTextureAnimation')
export class MaterialTextureAnimation {
    _delay = 2;
    _dt = 60;
    
    @testCase
    async index(){
        await screenshot_custom();
    }

    @testCase
    async startPlay() {
        for (let index = 0; index < 4; index++) {
            // 截图 or 断言
            await screenshot_custom(this._dt);
        };
    }
}