
//@ts-ignore
import { runScene, testCase, testClass, beforeClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { Component, find, view } from 'cc';
import { RaycastCanvasTest } from '../../../cases/scene/raycast/RaycastCanvasTest';
import { RaycastColliderTest } from '../../../cases/scene/raycast/RaycastColliderTest';
import { RaycastModelTest } from '../../../cases/scene/raycast/RaycastModelTest';
import { screenshot_custom } from '../common/utils';
import { simulateTouchStart } from '../common/SimulateEvent';

@testClass('Raycast', 'raycast')
export class Raycast {
    raycastCanvas!: RaycastCanvasTest | Component | null;
    raycastModel!: RaycastModelTest | Component | null;
    raycastCollider!: RaycastColliderTest | Component | null;
    tickTime: number = 1;
    testData!: TestData;
    screenWidth!:number;
    screenHeight!:number;

    @beforeClass
    async initData() {
        this.screenWidth=view.getCanvasSize().width;
        this.screenHeight=view.getCanvasSize().height

        this.raycastCanvas = find('Test')!.getComponent('RaycastCanvasTest');
        this.raycastModel = find('Test')!.getComponent('RaycastModelTest');
        this.raycastCollider = find('Test')!.getComponent('RaycastColliderTest');
        await waitForFrames(1)
    }

    @testCase
    async startPage() {
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickCollider() {
        const event = this.getEvent(this.screenWidth/2, this.screenHeight/4.08);
        //TODO: if engine team provide common emit event, it is need to change the emit event!
        this.raycastModel!.onTouchStart(event);
        this.raycastCanvas!.onTouchStart(event);
        this.raycastCollider!.onTouchStart(event);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickCanvas() {
        const event = this.getEvent(this.screenWidth/2, this.screenHeight/2);
        //TODO: if engine team provide common emit event, it is need to change the emit event!
        this.raycastCollider!.onTouchStart(event);
        this.raycastModel!.onTouchStart(event);
        this.raycastCanvas!.onTouchStart(event);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickModel() {
        const event = this.getEvent(this.screenWidth/2, this.screenHeight/1.5);
        //TODO: if engine team provide common emit event, it is need to change the emit event!
        this.raycastCollider!.onTouchStart(event);
        this.raycastCanvas!.onTouchStart(event);
        this.raycastModel!.onTouchStart(event);
        await screenshot_custom(this.tickTime);
    }

    getEvent(x: number, y: number) {
        const event = simulateTouchStart(x, y);
        event.bubbles = false;
        event.touch!.setPrevPoint(x, y);
        return event;
    }

}

export type TestData = {
    Collider: XY,
    Canvas: XY,
    Model: XY
}

export type XY = {
    x: number,
    y: number
}