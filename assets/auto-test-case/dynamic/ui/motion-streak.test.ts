import { find, Texture2D } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('motion-streak')
@testClass('MotionStreak')
export class MotionStreak {
    _delay = 0.5;
    _dt = 30;

    @testCase
    async startPlay() {
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changeColor_01() {
        await this.onClickChangeColor(2, this._dt * 10)
    }

    @testCase
    async setMotionStreak_01() {
        // @ts-ignore
        find('motion-streak-ctrl').getComponent('MotionStreakCtrl').onClick();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(2 * this._dt);
        };
    }

    @testCase
    async setMotionStreak_02() {
        // @ts-ignore
        find('motion-streak-ctrl').getComponent('MotionStreakCtrl').onClick();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(2 * this._dt);
        };
    }

    @testCase
    async changeColor_02() {
        // @ts-ignore
        await this.onClickChangeColor(2, this._dt)
    }

    
    @testCase
    async changeColor_03() {
        // @ts-ignore
        find('motion-streak-ctrl').getComponent('MotionStreakCtrl').onClick();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(2 * this._dt);
        };
    }

    async onClickChangeColor(captureNumber: number, dt: number) {
        // @ts-ignore
        find('motion-streak-ctrl').getComponent('MotionStreakCtrl').colorChange();
        for (let i = 0; i < captureNumber; i++) {
            await screenshot_custom(dt);
        };
    }
    
}