import { find } from 'cc';
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

    @beforeClass
    async initData(){
        //@ts-ignore
        this.dragonBonesCtrl = find('Canvas/Node')!.getComponent('DragonBonesCtrl');
        if(!this.dragonBonesCtrl){
            await sleep(5);
            //@ts-ignore
            this.dragonBonesCtrl = find('Canvas/Node')!.getComponent('DragonBonesCtrl');
        }
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
    async jump() {
        this.dragonBonesCtrl!.jump();
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt);
        }
    };


    @testCase
    async moveDown() {
        this.dragonBonesCtrl!.squat(true);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt);
        }
    }

    @testCase
    async moveRight() {
        this.dragonBonesCtrl!.move(1);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt);
        }
    }

    @testCase
    async moveLeft() {
        this.dragonBonesCtrl!.move(-1);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt);
        }
    }

    @testCase
    async attack() {
        this.dragonBonesCtrl!.attack(true);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt);
        }
    }

    @testCase
    async attackStop() {
        this.dragonBonesCtrl!.attack(false);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt);
        }
    }

    
    @testCase
    async aim_up() {
        simulateTouchStart(521.7500007152557, 778.75, this.dragonBonesCtrl?.touchHandler!);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt);
        }
        simulateTouchEnd(this.dragonBonesCtrl?.touchHandler!);
    }

    @testCase
    async aim_done() {
        simulateTouchStart(619.2500007152557, 12.5, this.dragonBonesCtrl?.touchHandler!);
        // why jump, done aim it is not easy to see the difference,that's why add jump
        this.dragonBonesCtrl!.jump();  
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt);
        }
        simulateTouchEnd(this.dragonBonesCtrl?.touchHandler!);
    }

    @testCase
    async aim_left() {
        simulateTouchStart(50.50000071525574, 432.5, this.dragonBonesCtrl?.touchHandler!);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt);
        }
        simulateTouchEnd(this.dragonBonesCtrl?.touchHandler!);
    }

    @testCase
    async aim_right() {
        simulateTouchStart(1153.0000007152557, 472.5, this.dragonBonesCtrl?.touchHandler!);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt);
        }
        simulateTouchEnd(this.dragonBonesCtrl?.touchHandler!);
    }
}




