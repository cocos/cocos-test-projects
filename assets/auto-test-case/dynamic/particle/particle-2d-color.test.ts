import { director } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@testClass('Particle2dColor', 'particle-2d-color')
export class Particle2dColor {
    private df = 30;

    @beforeClass
    async initData() {
        srandom(director.getScene()!.name);
    }

    @testCase
    async startPlay() {
        for (let i=0; i<6; i++) {
            await screenshot_custom_by_wait(this.df);
        }
    }
}