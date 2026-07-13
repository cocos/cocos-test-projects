import { Button, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('SpineMeshJitterEffect')
@testClass('SpineMeshJitterEffect')
export class SpineMeshJitterEffect {
    _delay = 0.5;
    _dt = 10;

    @testCase
    async startPlay() {
        // start screenshot
        await screenshot_custom_by_wait(1);
        await screenshot_custom_by_wait(this._dt);
        // click button
        find('Canvas/Button')!.getComponent(Button)?.clickEvents[0].emit([]);
        for (let i = 0; i < 3; i++) {
            await screenshot_custom_by_wait(this._dt);
        };
        find('Canvas/Button')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom_by_wait(this._dt);
    }
}