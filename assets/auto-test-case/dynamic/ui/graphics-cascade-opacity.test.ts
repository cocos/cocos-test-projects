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
        demo.resetComparison();
        for (const [name, value] of [['opaque', 255], ['half', 128], ['quarter', 64], ['half-again', 128]] as const) {
            demo.setOpacity(value);
            await screenshot_custom(4, `graphics-cascade-opacity-${name}`);
        }
        demo.appendPaint();
        await screenshot_custom(4, 'graphics-cascade-opacity-appended-at-half');
        demo.setOpacity(0);
        await screenshot_custom(4, 'graphics-cascade-opacity-hidden');
        demo.setOpacity(255);
        await screenshot_custom(4, 'graphics-cascade-opacity-restored');
        demo.setOpacity(128);
        await screenshot_custom(4, 'graphics-cascade-opacity-default-after-restore');
        demo.useVertexColorMaterial(true);
        await screenshot_custom(4, 'graphics-cascade-opacity-custom-at-half');
        demo.setOpacity(64);
        await screenshot_custom(4, 'graphics-cascade-opacity-custom-at-quarter');
        demo.useVertexColorMaterial(false);
        await screenshot_custom(4, 'graphics-cascade-opacity-default-at-quarter');
    }
}
