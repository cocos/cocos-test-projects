import { Button, find, Component } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('DragonBonesAttach')
@testClass('DragonBonesAttach')
export class DragonBonesAttach {
    _delay = 0.1

    /**
    @testCase
    async generateAllNodes() {
        // @ts-ignore
        find('Canvas/dragonTest')!.getComponent('DragonBonesAttach')!.generateAllNodes();
        // 截图 or 断言
        await screenshot_custom();
    };

    @testCase
    async destroyAllNodes() {
        // @ts-ignore
        find('Canvas/dragonTest')!.getComponent('DragonBonesAttach')!.destroyAllNodes();
        // 截图 or 断言
        await screenshot_custom();
    };

    @testCase
    async generateSomeNodes() {
        // @ts-ignore
        find('Canvas/dragonTest')!.getComponent('DragonBonesAttach')!.generateSomeNodes();
        // 截图 or 断言
        await screenshot_custom();
    }

    @testCase
    async destroySomeNodes() {
        // @ts-ignore
        find('Canvas/dragonTest')!.getComponent('DragonBonesAttach')!.destroySomeNodes();
        // 截图 or 断言
        await screenshot_custom();
    };
     */

    @testCase
    async cacheNodes() {
        // Show all stars
        find('Canvas/ctrl/Button-004')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();
        // Destroy all the stars
        find('Canvas/ctrl/delete all')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();
        // Show a star
        find('Canvas/ctrl/Button-003')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();
        // Destroy a star
        find('Canvas/ctrl/Button-002')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();
    }

    @testCase
    async realtimeNodes() {
        // clikck realtime
        find('Canvas/ctrl/Button-001')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();
        // Show all stars
        find('Canvas/ctrl/Button-004')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();
        // Destroy all the stars
        find('Canvas/ctrl/delete all')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();
         // Show a star
        find('Canvas/ctrl/Button-003')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();
         // Destroy a star
        find('Canvas/ctrl/Button-002')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom();
    }
}
