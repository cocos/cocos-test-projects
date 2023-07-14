import { director, find, Node } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass, srandom, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { FirstPersonCamera } from '../../../shared-res/first-person-camera';

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
        for (let i = 0; i < 3; i++) {
            await screenshot_custom_by_wait(this.df);
        }

        this.camera?.setPosition(24.7, 0, 70.47242696137303);
        for (let i = 0; i < 3; i++) {
            await screenshot_custom_by_wait(this.df);
        }
    }
}