import { find, view, screen } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep, beforeClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import DragonBonesCtrl from '../../../cases/middleware/dragonbones/DragonBonesCtrl';
import { simulateTouchStart, simulateTouchEnd } from '../common/SimulateEvent';
import { screenshot_custom_by_wait } from '../common/utils';


@runScene('DragonBones')
@testClass('DragonBones')
export class DragonBones {
    _dt = 30;
    dragonBonesCtrl!: DragonBonesCtrl | null;
    width!: number;
    height!: number;

    @beforeClass
    async initData() {
        
        //@ts-ignore
        this.dragonBonesCtrl = find('Canvas/Node')!.getComponent('DragonBonesCtrl');
        if (!this.dragonBonesCtrl) {
            //@ts-ignore
            this.dragonBonesCtrl = find('Canvas/Node')!.getComponent('DragonBonesCtrl');
        }
        this.width = screen.windowSize.width;
        this.height = screen.windowSize.height;

    }

    @testCase
    async switchSkin() {
        await screenshot_custom_by_wait(this._dt);
        for (let index = 0; index < 5; index++) {
            this.dragonBonesCtrl!.switchSkin();
            await screenshot_custom_by_wait(this._dt);
        };
    };

    @testCase
    async switchWeaponL() {
        for (let index = 0; index < 6; index++) {
            this.dragonBonesCtrl!.switchWeaponL();
            await screenshot_custom_by_wait(this._dt);
        };
    };

    @testCase
    async switchWeaponR() {
        for (let index = 0; index < 6; index++) {
            this.dragonBonesCtrl!.switchWeaponR();
            await screenshot_custom_by_wait(this._dt);
        };
    };

    @testCase
    async jump() {
        // this.dragonBonesCtrl!.move(-1);
        this.dragonBonesCtrl!.jump();
        await screenshot_custom_by_wait(this._dt);
    };

    @testCase
    async moveDown() {
        this.dragonBonesCtrl!.squat(true);
        await screenshot_custom_by_wait(this._dt + 20);
        this.dragonBonesCtrl!.squat(false);
    }

    @testCase
    async moveLeft() {
        this.dragonBonesCtrl!.move(-1);
        await waitForFrames(this._dt * 3);
        this.dragonBonesCtrl!.move(0);
        await screenshot_custom_by_wait(this._dt);
        
    }

    @testCase
    async moveRight() {
        this.dragonBonesCtrl!.move(1);
        await waitForFrames(this._dt * 2);
        this.dragonBonesCtrl!.move(0);
        await screenshot_custom_by_wait(this._dt);
    }

    @testCase
    async attack_left() {
        simulateTouchStart(this.width / 3, this.height / 2.5, this.dragonBonesCtrl?.touchHandler!);
        this.dragonBonesCtrl!.attack(true);
        // simulateTouchStart(this.width / 4, this.height / 2.5, this.dragonBonesCtrl?.touchHandler!);
        await screenshot_custom_by_wait(this._dt);
        simulateTouchEnd(this.dragonBonesCtrl?.touchHandler!);
    }

    @testCase
    async attack_right() {
        simulateTouchStart(this.width * 3 / 4, this.height * 3 / 5, this.dragonBonesCtrl?.touchHandler!);
        await screenshot_custom_by_wait(this._dt - 15);
        simulateTouchEnd(this.dragonBonesCtrl?.touchHandler!);
    }

    @testCase
    async attack_jump_right() {
        simulateTouchStart(this.width / 1.5, this.height / 63.8, this.dragonBonesCtrl?.touchHandler!);
        // why jump, done aim it is not easy to see the difference,that's why add jump
        this.dragonBonesCtrl!.jump();
        await screenshot_custom_by_wait(this._dt + 5);
        simulateTouchEnd(this.dragonBonesCtrl?.touchHandler!);
    }

    @testCase
    async attack_jump_left() {
        await waitForFrames(this._dt * 2);
        simulateTouchStart(this.width / 10, this.height / 63.8, this.dragonBonesCtrl?.touchHandler!);
        // why jump, done aim it is not easy to see the difference,that's why add jump
        this.dragonBonesCtrl!.jump();
        await screenshot_custom_by_wait(this._dt);
        simulateTouchEnd(this.dragonBonesCtrl?.touchHandler!);
        this.dragonBonesCtrl!.attack(false);
    }

}