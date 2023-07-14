import { find, Node } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass, srandom } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { FirstPersonCamera } from '../../../shared-res/first-person-camera';

@testClass('ParticleCulling', 'particle-culling')
export class ParticleCulling {
    private camera!: Node;
    private df = 60;

    @beforeClass
    async initData() {
        this.camera = find('Main Camera')!;
        this.camera.getComponent(FirstPersonCamera)!.enabled = false;
        srandom('particle-culling');
    }

    @testCase
    async startPlay() {
        for (let i=0; i<3; i++) {
            await screenshot_custom_by_wait(this.df);
        }

        this.camera.setPosition(4.127582478513955, -6.4638891333721356, 60.45422611717844);
        this.camera.setRotation(0.1042203919870644, 0.07629875326349554, -0.008019322113484231, 0.9915907929268704);

        for (let i=0; i<3; i++) {
            await screenshot_custom_by_wait(this.df);
        }
    }
}