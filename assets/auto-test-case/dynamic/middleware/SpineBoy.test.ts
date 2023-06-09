import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('SpineBoy', 'SpineBoy')
export class SpineBoy {
    _delay = 0.2;
    _dt = 10;

    @testCase
    async startPlay() {
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async stop() {
        // @ts-ignore
        find('Canvas/spineboy').getComponent('SpineBoyCtrl').stop();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async walk() {
        // @ts-ignore
        find('Canvas/spineboy').getComponent('SpineBoyCtrl').walk();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(2 * this._dt);
        };
    }

    @testCase
    async run() {
        // @ts-ignore
        find('Canvas/spineboy').getComponent('SpineBoyCtrl').run();
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async jump() {
        // @ts-ignore
        find('Canvas/spineboy').getComponent('SpineBoyCtrl').jump();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async shoot() {
        // @ts-ignore
        find('Canvas/spineboy').getComponent('SpineBoyCtrl').shoot();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async idle() {
        // @ts-ignore
        find('Canvas/spineboy').getComponent('SpineBoyCtrl').idle();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(2 * this._dt);
        };
    }

    @testCase
    async portal() {
        // @ts-ignore
        find('Canvas/spineboy').getComponent('SpineBoyCtrl').portal();
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(3 * this._dt);
        };
    }

    @testCase
    async toggleDebugSlots() {
        for (let i = 0; i < 3; i++) {
            // @ts-ignore
            find('Canvas/spineboy').getComponent('SpineBoyCtrl').toggleDebugSlots();
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async toggleDebugBones() {
        // @ts-ignore
        find('Canvas/spineboy').getComponent('SpineBoyCtrl').toggleDebugBones();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        };
        // @ts-ignore
        find('Canvas/spineboy').getComponent('SpineBoyCtrl').toggleDebugBones();
        await screenshot_custom(this._dt);
    }

    @testCase
    async toggleDebugMesh() {
        // @ts-ignore
        find('Canvas/spineboy').getComponent('SpineBoyCtrl').toggleDebugMesh();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        }
        // @ts-ignore
        find('Canvas/spineboy').getComponent('SpineBoyCtrl').toggleDebugMesh();
        await screenshot_custom(this._dt);
    }

    @testCase
    async toggleUseTint() {
        // @ts-ignore
        find('Canvas/spineboy').getComponent('SpineBoyCtrl').toggleUseTint();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async toggleTimeScale() {
        // @ts-ignore
        find('Canvas/spineboy').getComponent('SpineBoyCtrl').toggleTimeScale();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        };
    }
}