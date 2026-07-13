import { Button, Component, EventHandler, find, Label, Node, director, Director, EventTouch, Input } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep, beforeClass, PlatformEnum, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { AssetLoading as AssetLoadingObj } from '../../../cases/scripting/asset_loading/AssetLoading/AssetLoading';
import { simulateTouchEnd, simulateTouchStart } from '../common/SimulateEvent';
import { random, screenshot_custom, waitSceneLaunched } from '../common/utils';

@testClass('AssetLoading', 'AssetLoading')
export class AssetLoading {
    tickTime: number = 10;
    caseScript!: AssetLoadingObj | null;
    backSceneButton!: Button | Component | null;
    label!: Label | Component | null;

    @beforeClass
    async initData() {
        this.caseScript = find("Canvas")!.getComponent("AssetLoading") as AssetLoadingObj;
    }

    @testCase
    async startPlay() {
        await screenshot_custom(1);
    }

    @testCase
    async assetLoadTest() {
        let btnNode, btnNodeName, event, result;
        for (let i = 0; i < this.caseScript!.loadList.length; i++) {
            btnNode = this.caseScript!.loadList[i];
            btnNodeName = btnNode.name;

            // simulateTouchEnd(btnNode!);
            event = new EventTouch([], true, Input.EventType.TOUCH_END, []);
            event.target = btnNode;
            result = await this.caseScript!._onClick(event);

            if (btnNodeName === 'Load_Scene') {
                // let result = await waitSceneLaunched('test-scene');
                await screenshot_custom();
                if (result) {
                    (find("Canvas")!.getComponent("BackToAssetLoading") as any).onClick();
                    result = await waitSceneLaunched('AssetLoading');
                    if (result) this.initData();
                } else {
                    console.warn('Load scene "test-scene" failed!');
                }
                await screenshot_custom();
            } else {
                await screenshot_custom(this.tickTime);
                simulateTouchEnd(btnNode!);
                await screenshot_custom(this.tickTime);
            }
        }
    }
}
