// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';
import { find } from 'cc'

@runScene('shield-node')
@testClass('ShieldNode')
export class ShieldNode {
    _dt = 10;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async move() {
        //@ts-ignore
        find("Canvas/Node").getComponent("ShieldNode").setSheildNodePosition(0, {x : -249, y : 175, z : 0});

        //@ts-ignore
        find("Canvas/Node").getComponent("ShieldNode").setSheildNodePosition(1,{x:-130,y:130,z:0});

        //@ts-ignore
        find("Canvas/Node").getComponent("ShieldNode").setSheildNodePosition(2,{x:-60,y:80,z:0});
        await screenshot_custom(this._dt);

        //@ts-ignore
        find("Canvas/Node").getComponent("ShieldNode").setSheildNodePosition(3,{x:350,y:-150,z:0})

        //@ts-ignore
        find("Canvas/Node").getComponent("ShieldNode").setSheildNodePosition(4,{x:10,y:10,z:0});
        await screenshot_custom(this._dt);
    }
}