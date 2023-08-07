import { Node, find, Quat } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { FirstPersonCamera } from '../../../shared-res/first-person-camera';

@testClass('Tangents', 'tangents')
export class Tangents {
    private camera!: Node;

    @beforeClass
    async initData() {
        this.camera = find('Camera')!;
        this.camera.getComponent(FirstPersonCamera)!.enabled = false;
    }

    @testCase
    async start() {
        await screenshot_custom(2);
    }

    @testCase
    async play() {
        this.camera.setRotation(0.013826301359866911, -0.13915953492417107, 0.0019431599339625042, 0.9901715413805153);
        await screenshot_custom(2);

        this.camera.setRotation(0.0051656561550280046, 0.16332372340977433, -0.0008551688309908151, 0.9865586379198785);
        await screenshot_custom(2);

        this.camera.setPosition(-1.2563742276377736, -0.12566345081071834, 14.02214941804851);
        this.camera.setRotation(-0.0017450625439344948, 0.017452379855755446, 0.000030460180008177638, 0.9998461723016526);
        await screenshot_custom(2);



        this.camera.setPosition(0.26180447187289835, 0.2617946030839381, -49.997258306822644);
        this.camera.setRotation(-5.072806380139907e-21, -0.9999451693655121, -4.843996188841496e-19, 0.010471784116247647);
        await screenshot_custom(2);

        this.camera.setPosition(7.3459872745635355, 1.3285473739082954, 51.301739877409325);
        this.camera.setRotation(-0.0017408616917531311, -0.07149733543587761, -0.000124786517683066, 0.9974392637421412);
        await screenshot_custom(2);

        this.camera.setPosition(7.345987274563534, 1.328547373908295, 51.30173987740931);
        this.camera.setRotation(-0.018720373560375543, 0.22150766891688872, 0.004253164521787505, 0.9749696460999783);
        await screenshot_custom(2);

        this.camera.setPosition(0.9947891677905263, 0.26179460308393815, -15.004934385202839);
        this.camera.setRotation(-5.072806380139906e-21, -0.9999451693655123, -4.843996188841495e-19, 0.010471784116247648);
        await screenshot_custom(2);
    }
}
