// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('image-importer')
@testClass('ImageImporter')
export class ImageImporter {
    tikeTime: number = 50;

    @testCase
    async startPlay() {
        await screenshot_custom(this.tikeTime);
    }
}


