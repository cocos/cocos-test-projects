import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('DragonBones')
// @testClass('DragonBones')
export class DragonBones {
    _dt = 30;

    @testCase
    async switchSkin() {
        for (let index = 0; index < 4; index++) {
            // @ts-ignore
            find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.switchSkin();
            await screenshot_custom(this._dt);
        };
    };

    @testCase
    async switchWeaponL() {
        for (let index = 0; index < 5; index++) {
            // @ts-ignore
            find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.switchWeaponL();
            await screenshot_custom(5);
        };
    };

    @testCase
    async switchWeaponR() {
        for (let index = 0; index < 5; index++) {
            // @ts-ignore
            find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.switchWeaponR();
            await screenshot_custom(5);
        };
    };

    @testCase
    async jump() {
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.jump();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        }
    };

    @testCase
    async moveRight() {
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.move(1);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        }
    }

    @testCase
    async moveLeft() {
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.move(-1);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        }
    }

    @testCase
    async moveDown() {
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.squat(true);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        }
    }

    @testCase
    async attack() {
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.attack(true);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        }
    }

    @testCase
    async attackStop() {
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.attack(false);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(this._dt);
        }
    }



    @testCase
    async aim_up() {
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.simulateTouchStart(468, 550)
        // // @ts-ignore
        // find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.attack(true);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(7);
        }
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.simulateTouchEnd()
    }

    @testCase
    async aim_done() {
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.simulateTouchStart(500, 10)
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.jump();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(7);
        }
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.simulateTouchEnd()
    }

    @testCase
    async aim_left() {
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.simulateTouchStart(64, 271)
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(7);
        }
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.simulateTouchEnd()
    }

    @testCase
    async aim_right() {
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.aim(900, 300);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom(7);
        }
        // @ts-ignore
        find('Canvas/Node')!.getComponent('DragonBonesCtrl')!.simulateTouchEnd()
    }
}




