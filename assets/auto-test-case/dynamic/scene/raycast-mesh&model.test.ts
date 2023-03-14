
//@ts-ignore
import { runScene, testCase, testClass, beforeClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { IntersectRayTest } from '../../../cases/scene/raycast/IntersectRayTest';
import { screenshot_custom } from '../common/utils'
import { simulateTouchStart } from "../common/SimulateEvent"
import { find, game } from 'cc';

@runScene('raycast-mesh&model')
@testClass('RaycastMeshModel')
export class RaycastMeshModel {
    intersecttraytest!: IntersectRayTest;

    @beforeClass
    async initData() {
        //@ts-ignore
        this.intersecttraytest = find("Node").getComponent("IntersectRayTest")!;
    }
    @testCase
    async clickLeftAndRight() {
        game.resume();
        const event = simulateTouchStart(0, 100);
        event.bubbles =false;
        event.touch!.setPrevPoint(300, 200);
        console.log("event--",event)
        this.intersecttraytest.onTouchStart(event);
        await waitForFrames(100);
    }
}