import { find, Button } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('particle-main')
@testClass('ParticleMain')
export class ParticleMain {
    _delay = 0.3;
    _dt = 30;

    @testCase
    async startPlay() {
        // begin start to screenshot
        await screenshot_custom();
        // take a screenshot after 30 frames, when listing a particle
        await screenshot_custom(this._dt*2);
        // take a screenshot at 90 frames, 4 particles in a single row
        await screenshot_custom(this._dt*6);
        // take a screenshot at 90 frames, 5 grains in a single row
        await screenshot_custom(this._dt*2);

        // button click
        find('Canvas//Button')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();

        // move after the text appears
        //@ts-ignore
        find('Camera').getComponent('first-person-camera')._euler = {x: -8.600000000000007, y: -2.20000000000001, z: 0}
        await screenshot_custom(this._dt);
        /**
        for (let i = 0; i < 8; i++) {
            await screenshot_custom(this._dt);
        };
         */
    }

}