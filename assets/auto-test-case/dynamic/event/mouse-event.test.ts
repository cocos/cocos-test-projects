//@ts-ignore
import { runScene, testCase, testClass, beforeClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { Component, find, NodeEventType, view } from 'cc';
import { screenshot_custom } from '../common/utils';
import { simulateMouseEvent } from '../common/SimulateEvent';
import { systemEventPC as SystemEventPC } from '../../../cases/event/system-event/mouse-event';


@runScene('mouse-event')
@testClass('MouseEvent')
export class MouseEvent {
    mouseEvent!: SystemEventPC | Component | null;
    testData!: TestData;
    tickTime: number = 5;


    @beforeClass
    async initData() {
        this.mouseEvent = find('mouse-event')!.getComponent('systemEventPC');
        this.testData = {
            MouseDown: {
                x: 717.25,
                y: 451.75,
            },

            MouseUP: {
                x: 632,
                y: 434,
            },
            MouseMove: {
                x: 729.7499942779541,
                y: 341.7500114440918,
            },
            BasePonit: {
                x: 0,
                y: 0,
            },
            Scroll: {
                x: 0,
                y: 235,
            }

        }
    }

    @testCase
    async start() {
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async mouseUp() {
        const event = simulateMouseEvent(NodeEventType.MOUSE_UP, this.testData.MouseUP.x, this.testData.MouseUP.y);
        this.mouseEvent!.onMouseUp(event);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async mouseDown() {
        const event = simulateMouseEvent(NodeEventType.MOUSE_DOWN, this.testData.MouseDown.x, this.testData.MouseDown.y);
        this.mouseEvent!.onMouseDown(event);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async mouseMove() {
        const event = simulateMouseEvent(NodeEventType.MOUSE_MOVE, this.testData.MouseMove.x, this.testData.MouseMove.y);
        this.mouseEvent!.onMouseMove(event);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async mouseScroll() {
        const event = simulateMouseEvent(NodeEventType.MOUSE_WHEEL, this.testData.Scroll.x, this.testData.Scroll.y);
        event.setScrollData(this.testData.Scroll.x, this.testData.Scroll.y);
        this.mouseEvent!.onMouseScroll(event);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async basePoint() {
        const event = simulateMouseEvent(NodeEventType.MOUSE_MOVE, this.testData.BasePonit.x, this.testData.BasePonit.y);
        this.mouseEvent!.onMouseMove(event);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async screenSize() {
        const canvasSize = view.getCanvasSize();
        const event = simulateMouseEvent(NodeEventType.MOUSE_MOVE, canvasSize.width, canvasSize.height);
        this.mouseEvent!.onMouseMove(event);
        await screenshot_custom(this.tickTime);
    }
}


export type TestData = {
    MouseDown: XY,
    MouseUP: XY,
    MouseMove: XY,
    BasePonit: XY,
    Scroll: XY,
}

export type XY = {
    x: number,
    y: number,
}