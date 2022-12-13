// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('progress')
@testClass('Progress')
export class Progress {
    _dt = 90;

    @testCase
    async index() {
        await screenshot_custom();
    }

    @testCase
    async play() {
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt * 2);
        }
    }

}