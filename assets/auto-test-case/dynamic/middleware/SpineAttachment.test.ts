import { Button, director, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@testClass('SpineAttachment', 'SpineAttachment')
export class SpineAttachment {
    _dt = 40;

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(10);
        await screenshot_custom_by_wait(this._dt);
    }

    @testCase
    async Change() {
        find('Canvas/Change')!.getComponent(Button)?.clickEvents[0].emit([]);
        for (let i = 0; i < 3; i++) {
            await screenshot_custom_by_wait(this._dt);
        };
    }

}