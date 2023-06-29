import { Node, find, Quat } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('Tangents', 'tangents')
export class Tangents {
    private camera!: Node;
    private rotation: Quat = new Quat();

    @beforeClass
    async initData() {
        this.camera = find('Camera')!;
    }

    @testCase
    async start() {
        await screenshot_custom(2);
    }

    @testCase
    async play() {
        this.rotation.set(-0.008687806824460862, 0.09410472996137241, 0.0008212395368141832, 0.9955240566541321);
        this.camera.setRotation(this.rotation);
        await screenshot_custom(2);

        this.rotation.set(-0.008698426266795033, -0.08019587071643428, -0.0006998587611071062, 0.996740924161373);
        this.camera.setRotation(this.rotation);
        await screenshot_custom(2);
    }
}
