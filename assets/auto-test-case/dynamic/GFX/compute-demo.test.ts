//@ts-ignore
import { director } from 'cc';
//@ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
// ensure the compute pipeline module is loaded/registered before the scene renders
import '../../../cases/GFX/compute-demo/raytracingByCompute';

@runScene('compute-demo')
@testClass('ComputeDemo')
export class ComputeDemo {
    // give the compute pipeline a few frames to create storage/dispatch resources
    _delay = 5;

    @testCase
    async index() {
        await screenshot_custom(this._delay);
    }
}
