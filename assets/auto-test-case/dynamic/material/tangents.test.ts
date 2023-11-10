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



        this.camera.setPosition(2.325041430657566, 0.556564761813006, -52.46685840066919);
        this.camera.setRotation(1.2605840654548671e-18, -0.999925369660452, -1.0317507583378383e-16, -0.012217000835247235);
        await screenshot_custom(2);

        this.camera.setPosition(2.325041430657566, 0.556564761813006, -52.46685840066919);
        this.camera.setRotation(-0.001164256030389918, -0.985972009042598, 0.0068834949875476595, -0.1667646826793828);
        await screenshot_custom(2);

        this.camera.setPosition(2.325041430657566, 0.556564761813006, -52.46685840066919);
        this.camera.setRotation(0.0012144990059467617, -0.9902303623678638, 0.008641609454779431, 0.13916780167482914);
        await screenshot_custom(2);

        this.camera.setPosition(5.267529926824865, -3.1112065330100322, -27.560909063608825);
        this.camera.setRotation(-0.000182757832520245, -0.9997928728728744, -0.017451449510765354, 0.010470189212805516);
        await screenshot_custom(2);
    }
}
