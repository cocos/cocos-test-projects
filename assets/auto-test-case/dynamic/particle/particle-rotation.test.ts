import { find, Vec3 } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('particle-rotation')
@testClass('ParticleRotation')
export class ParticleRotation {
    _dt = 15;

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(45);
        await this.onMouseWheel(15);
        await screenshot_custom_by_wait(45);
        await this.onMouseWheel(-16);
        await screenshot_custom_by_wait(45);
        //@ts-ignore
        find('Camera').getComponent('first-person-camera')._euler = {x: -18.600000000000007, y: 3.20000000000001, z: 0}
        await screenshot_custom_by_wait(15);
        //for (let i = 0; i < 2; i++) {
        //    await screenshot_custom(this._dt);
        //};
    }

    //@testCase
    //async changePosition() {
        //@ts-ignore
    //    find('Camera').getComponent('first-person-camera')._euler = {x: -18.600000000000007, y: 4.20000000000001, z: 0}
    //    await screenshot_custom(this._dt);
    //}

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