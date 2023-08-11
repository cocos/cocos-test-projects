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
        await screenshot_custom(this.df);

        this.caseScript.walk();
    }


    @testCase
    async toggleDebugSlots() {
        this.caseScript.toggleDebugSlots();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.df);
        };
        this.caseScript.toggleDebugSlots();
        await screenshot_custom(this.df);
    }

    @testCase
    async toggleDebugBones() {
        this.caseScript.toggleDebugBones();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.df);
        };
        this.caseScript.toggleDebugBones();
        await screenshot_custom(this.df);
    }

    @testCase
    async toggleDebugMesh() {
        this.caseScript.toggleDebugMesh();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.df);
        }
        this.caseScript.toggleDebugMesh();
        await screenshot_custom(this.df);
    }

    @testCase
    async toggleUseTint() {
        this.caseScript.toggleUseTint();
        await screenshot_custom(this.df);
        this.caseScript.toggleUseTint();
        await screenshot_custom(this.df);
    }

    @testCase
    async toggleTimeScale() {
        this.caseScript.toggleTimeScale();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(30);
        };
        this.caseScript.toggleTimeScale();
    }




    @testCase
    async stop() {
        this.caseScript.toggleDebugSlots();
        this.caseScript.toggleDebugBones();
        this.caseScript.toggleDebugMesh();
        this.caseScript.toggleUseTint();

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
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this.df);
        };
    }

    @testCase
    async jump() {
        this.caseScript.jump();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(30);
        };
    }

    @testCase
    async shoot() {
        this.caseScript.shoot();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(5);
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
        await screenshot_custom(20);
        await screenshot_custom(20);
        await screenshot_custom(38);
        await screenshot_custom(120);
    }

}