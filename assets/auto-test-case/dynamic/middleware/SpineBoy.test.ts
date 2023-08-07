import { find } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import SpineBoyCtrl from '../../../cases/middleware/spine/SpineBoyCtrl';

@testClass('SpineBoy', 'SpineBoy')
export class SpineBoy {
    private caseScript!: SpineBoyCtrl;
    private df = 10;

    @beforeClass
    async initData() {
        this.caseScript = find('Canvas/spineboy')?.getComponent(SpineBoyCtrl)!;
    }

    @testCase
    async startPlay() {
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.df);
        };
    }

    @testCase
    async stop() {
        this.caseScript.stop();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.df);
        };
    }

    @testCase
    async walk() {
        this.caseScript.walk();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(2 * this.df);
        };
    }

    @testCase
    async run() {
        this.caseScript.run();
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this.df);
        };
    }

    @testCase
    async jump() {
        this.caseScript.jump();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.df);
        };
    }

    @testCase
    async shoot() {
        this.caseScript.shoot();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.df);
        };
    }

    @testCase
    async idle() {
        this.caseScript.idle();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(2 * this.df);
        };
    }

    @testCase
    async portal() {
        this.caseScript.portal();
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(3 * this.df);
        };
    }

    @testCase
    async toggleDebugSlots() {
        this.caseScript.run();
        this.caseScript.toggleDebugSlots();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.df);
        };
        this.caseScript.toggleDebugSlots();
    }

    @testCase
    async toggleDebugBones() {
        this.caseScript.toggleDebugBones();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.df);
        };
        this.caseScript.toggleDebugBones();
    }

    @testCase
    async toggleDebugMesh() {
        this.caseScript.toggleDebugMesh();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.df);
        }
        this.caseScript.toggleDebugMesh();
    }

    @testCase
    async toggleUseTint() {
        this.caseScript.toggleUseTint();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.df);
        };
        this.caseScript.toggleUseTint();
    }

    @testCase
    async toggleTimeScale() {
        this.caseScript.toggleTimeScale();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.df);
        };
        this.caseScript.toggleTimeScale();
    }
}