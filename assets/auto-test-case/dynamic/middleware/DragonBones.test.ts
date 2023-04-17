import { find, view, screen } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
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
        for (let index = 0; index < 4; index++) {
            this.dragonBonesCtrl!.switchSkin();
            await screenshot_custom_by_wait(this._dt);
        };
    };

    @testCase
    async switchWeaponL() {
        for (let index = 0; index < 5; index++) {
            this.dragonBonesCtrl!.switchWeaponL();
            await screenshot_custom_by_wait(this._dt);
        };
    };

    @testCase
    async switchWeaponR() {
        for (let index = 0; index < 5; index++) {
            this.dragonBonesCtrl!.switchWeaponR();
            await screenshot_custom_by_wait(this._dt);
        };
    };

    @testCase
    async moveLeft() {
        this.dragonBonesCtrl!.move(-1);
        await screenshot_custom_by_wait(this._dt * 3);
    }

    @testCase
    async moveRight() {
        this.dragonBonesCtrl!.move(1);
        await screenshot_custom_by_wait(this._dt * 3);
    }

    @testCase
    async moveDown() {
        this.dragonBonesCtrl!.squat(true);
        await screenshot_custom_by_wait(this._dt);
    }

    @testCase
    async jump() {
        this.dragonBonesCtrl!.move(-1);
        this.dragonBonesCtrl!.jump();
        await screenshot_custom_by_wait(this._dt * 3);
    };


    @testCase
    async attack() {
        this.dragonBonesCtrl!.attack(true);
        await screenshot_custom_by_wait(this._dt);
    }

    @testCase
    async attackStop() {
        this.dragonBonesCtrl!.attack(false);
        await screenshot_custom_by_wait(this._dt);
    }


    @testCase
    async aim_up() {
        simulateTouchStart(this.width / 2.3, this.height / 1, this.dragonBonesCtrl?.touchHandler!);
        await screenshot_custom_by_wait(this._dt);
        simulateTouchEnd(this.dragonBonesCtrl?.touchHandler!);
    }

    @testCase
    async aim_done() {
        simulateTouchStart(this.width / 2, this.height / 63.8, this.dragonBonesCtrl?.touchHandler!);
        // why jump, done aim it is not easy to see the difference,that's why add jump
        this.dragonBonesCtrl!.jump();
        await screenshot_custom_by_wait(this._dt + 20);
        simulateTouchEnd(this.dragonBonesCtrl?.touchHandler!);
    }

    // @testCase
    // async aim_left() {
    //     simulateTouchStart(this.width/23.71, this.height/1.84, this.dragonBonesCtrl?.touchHandler!);
    //     await screenshot_custom_by_wait(this._dt);
    //     simulateTouchEnd(this.dragonBonesCtrl?.touchHandler!);
    // }

    // @testCase
    // async aim_right() {
    //     simulateTouchStart(this.width, this.height/1.687, this.dragonBonesCtrl?.touchHandler!);
    //     await screenshot_custom_by_wait(this._dt);
    //     simulateTouchEnd(this.dragonBonesCtrl?.touchHandler!);
    // }
}