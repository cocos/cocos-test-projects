import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('graphics')
@testClass('Graphics')
export class Graphics {
    _dt = 5;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async drawArc() {
        // @ts-ignore
        find('Canvas/draw').getComponent('ChangeGraphics').drawArc()
        await screenshot_custom(this._dt);
    }

    @testCase
    async drawEllipse() {
        // @ts-ignore
        find('Canvas/draw').getComponent('ChangeGraphics').drawEllipse()
        await screenshot_custom(this._dt);
    }

    @testCase
    async drawLineTo() {
        // @ts-ignore
        find('Canvas/draw').getComponent('ChangeGraphics').drawLineTo()
        await screenshot_custom(this._dt);
    }

    @testCase
    async drawRect() {
        // @ts-ignore
        find('Canvas/draw').getComponent('ChangeGraphics').drawRect()
        await screenshot_custom(this._dt);
    }

 }