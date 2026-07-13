import { Node, find, Quat } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { FirstPersonCamera } from '../../../shared-res/first-person-camera';

@testClass('PbrParameter', 'pbr-parameter')
export class PbrParameter {
    private camera!: Node;

    @beforeClass
    async initData() {
        this.camera = find('camera')!;
        this.camera.getComponent(FirstPersonCamera)!.enabled = false;
    }

    @testCase
    async start() {
        await screenshot_custom(2);
    }

    @testCase
    async play() {
        this.camera.setRotation(-0.055041365505959214, -0.9131062736786808, -0.131580619651325, 0.38196062830790234);
        await screenshot_custom(2);

        this.camera.setRotation(0.039990429301202356, -0.737155532155776, -0.04379510830032282, -0.6731154993501509);
        await screenshot_custom(2);

        this.camera.setRotation(0.041779630429890684, -0.2870870163087052, -0.012534489828829605, -0.9569108600663063);
        await screenshot_custom(2);

        this.camera.setPosition(-3.1303482813770294, 10.850889345956116, 36.351608367907005);
        this.camera.setRotation(-0.16329014215911614, 0.020661208453604682, 0.0034204408791174354, 0.9863557900286715);
        await screenshot_custom(2);

        this.camera.setPosition(-1.753310300691027, 4.844417036876045, 17.632903173100956);
        this.camera.setRotation(-0.10279191053993653, -0.0034721607962966547, -0.00035881291401079643, 0.9946967570472153);
        await screenshot_custom(2);
    }
}
