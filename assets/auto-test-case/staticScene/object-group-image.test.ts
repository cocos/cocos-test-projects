// @ts-ignore
import { captureOneImage, waitForNextFrame, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';

@runScene('object-group-image')
@testClass('object_group_image')
export class object_group_image {
    @testCase
    async startPlay() {
        for (let i = 0; i < 10; i++){
            await waitForNextFrame();
        } 
        await captureOneImage();
    }
}