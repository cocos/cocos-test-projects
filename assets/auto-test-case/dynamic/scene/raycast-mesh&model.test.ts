//@ts-ignore
import { runScene, testCase, testClass, beforeClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { IntersectRayTest } from '../../../cases/scene/raycast/IntersectRayTest';
import { screenshot_custom } from '../common/utils'
import { simulateTouchStart } from "../common/SimulateEvent"
import { Camera, Component, find, view } from 'cc';

@testClass('RaycastMeshModel', 'raycast-mesh&model')
export class RaycastMeshModel {
    intersecttraytest!: IntersectRayTest;
    camera!: Camera | Component;
    testData!: TestData;
    tickTime: number = 3;
    screenWidth!:number;
    screenHeight!:number;

    @beforeClass
    async initData() {
        this.screenWidth=view.getCanvasSize().width;
        this.screenHeight=view.getCanvasSize().height;
        console.log("view.getCanvasSize()", view.getCanvasSize())
        //@ts-ignore
        this.intersecttraytest = find("Node")!.getComponent("IntersectRayTest")!;
        this.camera = find("Camera")?.getComponent("cc.Camera")!;
        await waitForFrames(1);
    }

    @testCase
    async startPage(){
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickCubeNonUniformScaled() {
        const event = this.getEvent(this.screenWidth/1.3, this.screenHeight/8.4);
        this.intersecttraytest.onTouchStart(event);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickCube() {
        const event = this.getEvent(this.screenWidth/1.3, this.screenHeight/2.17);
        this.intersecttraytest.onTouchStart(event);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickBrainStem() {
        const eventOne = this.getEvent(this.screenWidth/2.0, this.screenHeight/2.0);
        this.intersecttraytest.onTouchStart(eventOne);
        await screenshot_custom(this.tickTime);

        const eventTwo = this.getEvent(this.screenWidth/1.77, this.screenHeight/1.42);
        this.intersecttraytest.onTouchStart(eventTwo);
        await screenshot_custom(this.tickTime);

        const eventThree = this.getEvent(this.screenWidth/1.9, this.screenHeight/1.25);
        this.intersecttraytest.onTouchStart(eventThree);
        await screenshot_custom(this.tickTime);

        const eventFour = this.getEvent(this.screenWidth/1.81,  this.screenHeight/2.1);
        this.intersecttraytest.onTouchStart(eventFour);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async clickTorus() {
        const eventFour = this.getEvent(this.screenWidth/7.44,  this.screenHeight/3);
        this.intersecttraytest.onTouchStart(eventFour);
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
    CubeNonUniformScaled: XY,
    Cube: XY,
    BrainStem: {
        Left?: XY,
        Right?: XY,
        Up?: XY,
        Down?: XY
    },
    Torus: XY
}


export type XY = {
    x: number,
    y: number
}