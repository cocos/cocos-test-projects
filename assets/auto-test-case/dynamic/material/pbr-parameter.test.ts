import { Node, find, Quat } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('PbrParameter', 'pbr-parameter')
export class PbrParameter {
    private camera!: Node;
    private rotation: Quat = new Quat();

    @beforeClass
    async initData() {
        this.camera = find('camera')!;
    }

    @testCase
    async start() {
        await screenshot_custom(2);
    }

    @testCase
    async play() {
        this.rotation.set(-0.055041365505959214, -0.9131062736786808, -0.131580619651325, 0.38196062830790234);
        this.camera.setRotation(this.rotation);
        await screenshot_custom(2);

        this.rotation.set(0.020664223863779172, -0.9667495833235769, -0.0828796759626687, -0.24103774041584372);
        this.camera.setRotation(this.rotation);
        await screenshot_custom(2);

        this.rotation.set(0.039990429301202356, -0.737155532155776, -0.04379510830032282, -0.6731154993501509);
        this.camera.setRotation(this.rotation);
        await screenshot_custom(2);

        this.rotation.set(0.041779630429890684, -0.2870870163087052, -0.012534489828829605, -0.9569108600663063);
        this.camera.setRotation(this.rotation);
        await screenshot_custom(2);

        this.rotation.set(0.07454017355180437, 0.1076953519402229, 0.008097654188892198, -0.9913525617528688);
        this.camera.setRotation(this.rotation);
        await screenshot_custom(2);
    }
}
