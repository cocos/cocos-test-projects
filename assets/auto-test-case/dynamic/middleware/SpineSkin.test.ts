import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('SpineSkin')
//@testClass('SpineSkin')
export class SpineSkin {
    _delay = 0.5;
    _dt = 10;

    
    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(this._dt);
        for (let i = 0; i < 4; i++) {
            // @ts-ignore
            find('Canvas').getComponent('SpineSkin').change();
            await screenshot_custom_by_wait(this._dt); 
        };
    }
}