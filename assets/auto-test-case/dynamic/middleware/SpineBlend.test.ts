// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';
import { find, sp, Skeleton } from 'cc';

@testClass('SpineBlend', 'SpineBlend')
export class SpineBlend {
    // skeleton: sp.Skeleton = new Skeleton;
    @testCase
    async startPlay() {
        const skeleton = find('Canvas/Node')!.getComponent(sp.Skeleton)!;
        skeleton.premultipliedAlpha = false; // 关闭茶壶

        await screenshot_custom_by_wait(10);
        skeleton.premultipliedAlpha = true; // 开启茶壶

        await screenshot_custom_by_wait(10);

    }
}