import { director, find, Node } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass, srandom, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { FirstPersonCamera } from '../../../shared-res/first-person-camera';

@testClass('ParticleRenderer', 'particle-renderer')
export class ParticleRenderer {
    private df = 60;
    private camera!: Node;

    @beforeClass
    async initData() {
        this.camera = find('Camera')!;
        this.camera.getComponent(FirstPersonCamera)!.enabled = false;
        srandom(director.getScene()!.name);
    }

    @testCase
    async startPlay() {
        await waitForFrames(180);

        for (let i = 0; i < 3; i++) {
            await screenshot_custom_by_wait(this.df);
        }

        this.camera?.setPosition(3.707, 0, 3.5857984799816562);
        await screenshot_custom_by_wait(this.df);

        this.camera?.setPosition(3.707, 0, 54.59651096129296);
        await screenshot_custom_by_wait(this.df);
    }
}