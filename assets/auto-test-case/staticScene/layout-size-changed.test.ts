// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('layout-size-changed')
@testClass('LayoutSizeChanged')
export class LayoutSizeChanged {
    _dt = 10;
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await captureOneImage();
    }

    // @testCase
    // async play() {
    //     try {
    //         //@ts-ignore
    //         find('Canvas/v/New ScrollView').getComponent('cc.ScrollView').content.position = { x: 0, y: 270, z: 0 };
    //         await screenshot_custom(this._dt);
    //         //@ts-ignore
    //         find('Canvas/h/New ScrollView').getComponent('cc.ScrollView').content.position = { x: -54.7319, y: 1.333, z: 0 };
    //         await screenshot_custom(this._dt);

    //         //@ts-ignore
    //         find('Canvas/h/New ScrollView').getComponent('cc.ScrollView').content.position = { x: -54.7319, y: 1.333, z: 0 };
    //         await screenshot_custom(this._dt);
    //     } catch (error) {
    //         console.error(`【script】className:${LayoutSizeChanged.name},functionName:${this.play.name} has error:${error}`)
    //     }
    // }
}