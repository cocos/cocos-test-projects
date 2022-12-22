import { find, Button, Vec3 } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('particle-main')
@testClass('ParticleMain')
export class ParticleMain {
    _delay = 0.3;
    _dt = 30;

    @testCase
    async startPlay() {
        // begin start to screenshot
        await screenshot_custom_by_wait();
        // take a screenshot after 30 frames, when listing a particle
        await screenshot_custom_by_wait(this._dt*2);
        // take a screenshot at 90 frames, 4 particles in a single row
        await screenshot_custom_by_wait(this._dt*6);
        // take a screenshot at 90 frames, 5 grains in a single row
        await screenshot_custom_by_wait(this._dt*2);

        // button click
        find('Canvas//Button')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom_by_wait();

        // move after the text appears
        //@ts-ignore
        find('Camera').getComponent('first-person-camera')._euler = {x: 19.1, y: 2.0, z: 0}
        await screenshot_custom_by_wait(this._dt);

        await this.onMouseWheel(-10);
        await screenshot_custom_by_wait(this._dt);

        await this.onMouseWheel(30);
        await screenshot_custom_by_wait(this._dt);
    }

    // zoom
    public onMouseWheel (delta=1) {
        return new Promise((resolve, reject)=>{
        let _self = find('Camera')!.getComponent('first-person-camera')!;
        const v3_1 = new Vec3();
        Vec3.transformQuat(v3_1, Vec3.UNIT_Z, _self.node.rotation);
        // @ts-ignore
        Vec3.scaleAndAdd(_self._position, _self.node.position, v3_1, delta);
        resolve("ok")
        });
    
    }

}