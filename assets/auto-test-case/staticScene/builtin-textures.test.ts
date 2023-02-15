// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'

@runScene('builtin-textures')
//@testClass('BuiltinTextures')
export class BuiltinTextures {
    _dt = 50;
    _delay = 0.5;
    @testCase
    async startPlay() {
        await sleep(this._delay);
        await screenshot_custom(this._dt);
    }
}