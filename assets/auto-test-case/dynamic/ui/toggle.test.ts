
// @ts-ignore
import { testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { find } from 'cc';
import { simulateTouchEnd, simulateTouchStart } from '../common/SimulateEvent';

@testClass('Toggle', 'toggle')
export class Toggle{
    @testCase
    async start(){
       await screenshot_custom(1);
    }

    @testCase
    async transitionNone(){
        const node = find("Canvas/toggle-transition-none")!;
        simulateTouchStart(0, 0, node);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);

        simulateTouchStart(0, 0, node);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);
    }

    @testCase
    async transitionColor(){
        const node = find("Canvas/toggle-transition-color")!;
        simulateTouchStart(0, 0, node);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);

        simulateTouchStart(0, 0, node);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);
    }

    @testCase
    async transitionScale(){
        const node = find("Canvas/toggle-transition-scale")!;
        simulateTouchStart(0, 0, node);
        await screenshot_custom(5);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);

        simulateTouchStart(0, 0, node);
        await screenshot_custom(5);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);
    }

    @testCase
    async transitionSprite(){
        const node = find("Canvas/toggle-transition-sprite")!;
        simulateTouchStart(0, 0, node);
        await screenshot_custom(5);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);

        simulateTouchStart(0, 0, node);
        await screenshot_custom(5);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);
    }

    @testCase
    async toggleContainer(){
        let node = find("Canvas/toggle-container-normal/Toggle2")!;
        simulateTouchStart(0, 0, node);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);

        node = find("Canvas/toggle-container-normal/Toggle3")!;
        simulateTouchStart(0, 0, node);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);

        node = find("Canvas/toggle-container-normal/Toggle1")!;
        simulateTouchStart(0, 0, node);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);
    }

    @testCase
    async allowSwitchOff(){
        let node = find("Canvas/toggle-container-AllowSwitchOff/Toggle2")!;
        simulateTouchStart(0, 0, node);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);

        node = find("Canvas/toggle-container-AllowSwitchOff/Toggle3")!;
        simulateTouchStart(0, 0, node);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);

        node = find("Canvas/toggle-container-AllowSwitchOff/Toggle1")!;
        simulateTouchStart(0, 0, node);
        simulateTouchEnd(node, 0, 0);
        await screenshot_custom(5);
    }
}