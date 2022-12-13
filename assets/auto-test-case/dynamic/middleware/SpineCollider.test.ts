// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('SpineCollider')
//@testClass('SpineCollider')
export class SpineCollider {
    _delay = 0.5;
    _dt = 10;

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait();
        for (let i = 0; i < 4; i++) {
            await screenshot_custom_by_wait(this._dt);
        };
    }
}