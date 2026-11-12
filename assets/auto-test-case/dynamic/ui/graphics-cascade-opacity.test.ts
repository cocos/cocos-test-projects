import { find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { GraphicsCascadeOpacity } from '../../../cases/ui/14.graphics/graphics-cascade-opacity';
import { screenshot_custom } from '../common/utils';

@runScene('graphics-cascade-opacity')
@testClass('GraphicsCascadeOpacityTest')
export class GraphicsCascadeOpacityTest {
    @testCase
    async retainedFillAndStroke () {
        const demo = find('Canvas')!.getComponent(GraphicsCascadeOpacity)!;
        for (const [name, value] of [['opaque', 255], ['half', 128], ['hidden', 0], ['restored', 255]] as const) {
            demo.setOpacity(value);
            await screenshot_custom(4, `graphics-cascade-opacity-${name}`);
        }
    }
}
