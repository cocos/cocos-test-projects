import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('SpineAttach')
// @testClass('SpineAttach')
export class SpineAttach {
    _delay = 2;
    _dt = 30;

    @testCase
    async startPlay() {
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changeMode_realtime() {
        // @ts-ignore
        await find('Canvas')?.getComponent('SpineAttach')?.changeMode()
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changeMode_cache() {
        // @ts-ignore
        await find('Canvas')?.getComponent('SpineAttach')?.changeMode()
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changeAttach_01() {
        // @ts-ignore
        await find('Canvas')?.getComponent('SpineAttach')?.changeAttach()
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changeAttach_02() {
        // @ts-ignore
        await find('Canvas')?.getComponent('SpineAttach')?.changeAttach()
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

}