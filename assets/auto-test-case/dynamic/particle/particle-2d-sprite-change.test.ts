import { Button, director, find } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { UISimulate } from '../common/SimulateEvent';

@testClass('Particle2dSpriteChange', 'particle-2d-sprite-change')
export class Particle2dSpriteChange {
    private df = 60;

    @beforeClass
    async initData() {
        srandom(director.getScene()!.name);
    }

    @testCase
    async startPlay() {
        for (let i=0; i<3; i++) {
            await screenshot_custom_by_wait(this.df);
        }

        const button = find('Canvas/Button')?.getComponent(Button)!

        UISimulate.clickButton(button);
        for (let i=0; i<3; i++) {
            await screenshot_custom_by_wait(this.df);
        }

        UISimulate.clickButton(button);
        for (let i=0; i<3; i++) {
            await screenshot_custom_by_wait(this.df);
        }

        UISimulate.clickButton(button);
        await screenshot_custom_by_wait(this.df);
    }
}