import { Button, director, find, Node } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass, srandom, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { FirstPersonCamera } from '../../../shared-res/first-person-camera';
import { UISimulate } from '../common/SimulateEvent';

@testClass('ParticleShape', 'particle-shape')
export class ParticleShape {
    private df = 45;
    private camera!: Node;

    @beforeClass
    async initData() {
        this.camera = find('Camera')!;
        this.camera.getComponent(FirstPersonCamera)!.enabled = false;
        srandom(director.getScene()!.name);
    }

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(200);

        this.camera?.setRotation(-0.0101336415205985, 0.25205553712026596, 0.002639615901842505, 0.967656110374154);
        await screenshot_custom_by_wait(this.df);

        this.camera?.setRotation(0.013657073199747656, -0.20789142441971997, 0.0029029005218141743, 0.9780522548273775);
        await screenshot_custom_by_wait(this.df);

        this.camera?.setPosition(24.7, 0, 53.94410232025706);
        this.camera?.setRotation(0, 0, 0, 1);
        const button = find('Canvas/Button')?.getComponent(Button)!;
        UISimulate.clickButton(button);
        await screenshot_custom_by_wait(this.df);

        UISimulate.clickButton(button);
        await screenshot_custom_by_wait(this.df);
    }
}