import { Button, director, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@testClass('SpineApiTest', 'SpineApiTest')
export class SpineApiTest {
    _dt = 30;

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(1);
        await screenshot_custom_by_wait(10);
        await screenshot_custom_by_wait(this._dt);
    }

    @testCase
    async RealTime() {
        find('Canvas/RealTimeBtn')!.getComponent(Button)?.clickEvents[0].emit([]);
        for (let i = 0; i < 4; i++) {
            await screenshot_custom_by_wait(this._dt);
        };
    }

    @testCase
    async Cache() {
        find('Canvas/CacheBtn')!.getComponent(Button)?.clickEvents[0].emit([]);
        for (let i = 0; i < 3; i++) {
            await screenshot_custom_by_wait(10);
        };
    }

}