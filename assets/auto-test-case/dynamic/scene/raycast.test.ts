
//@ts-ignore
import { runScene, testCase, testClass, beforeClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { Component, find } from 'cc';
import { RaycastCanvasTest } from '../../../cases/scene/raycast/RaycastCanvasTest';
import { RaycastColliderTest } from '../../../cases/scene/raycast/RaycastColliderTest';
import { RaycastModelTest } from '../../../cases/scene/raycast/RaycastModelTest';
import { screenshot_custom } from '../common/utils';
import { simulateTouchStart } from '../common/SimulateEvent';



@runScene('raycast')
@testClass('Raycast')
export class Raycast {
    raycastCanvas!: RaycastCanvasTest | Component | null;
    raycastModel!: RaycastModelTest | Component | null;
    raycastCollider!: RaycastColliderTest | Component | null;
    tickTime: number = 1;
    testData!: TestData;

    @beforeClass
    async initData() {
        this.raycastCanvas = find('Test')!.getComponent('RaycastCanvasTest');
        this.raycastModel = find('Test')!.getComponent('RaycastModelTest');
        this.raycastCollider = find('Test')!.getComponent('RaycastColliderTest');
        this.testData = {
            Collider: {
                x: 671.25,
                y: 195.5000114440918
            },
            Canvas: {
                x: 596.4999961853027,
                y: 399.2500114440918
            },
            Model: {
                x: 621.4999961853027,
                y: 616.7500114440918
            }
        }
        await waitForFrames(1)
    }

    @testCase
    async startPage() {
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickCollider() {
        const event = this.getEvent(this.testData.Collider.x, this.testData.Collider.y);
        //TODO: if engine team provide common emit event, it is need to change the emit event!
        this.raycastModel!.onTouchStart(event);
        this.raycastCanvas!.onTouchStart(event);
        this.raycastCollider!.onTouchStart(event);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickCanvas() {
        const event = this.getEvent(this.testData.Canvas.x, this.testData.Canvas.y);
        //TODO: if engine team provide common emit event, it is need to change the emit event!
        this.raycastCollider!.onTouchStart(event);
        this.raycastModel!.onTouchStart(event);
        this.raycastCanvas!.onTouchStart(event);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickModel() {
        const event = this.getEvent(this.testData.Model.x, this.testData.Model.y);
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