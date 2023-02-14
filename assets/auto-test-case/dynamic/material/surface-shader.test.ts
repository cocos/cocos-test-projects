// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('surface-shader')
@testClass('SurfaceShader')
export class SurfaceShader {
    _dt = 50;
    _delay = 2;

    @testCase
    async start(){
        await sleep(this._delay);
        await screenshot_custom_by_wait(this._dt);
    }
}