import { Button, Component, EventHandler, find, Label, Node } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, sleep, beforeClass, PlatformEnum, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { AssetLoading as AssetLoadingObj } from '../../../cases/scripting/asset_loading/AssetLoading/AssetLoading';
import { simulateTouchEnd, simulateTouchStart } from '../common/SimulateEvent';
import { random, screenshot_custom } from '../common/utils';


@runScene('PreloadAssets')
@testClass('PreloadAssets')
export class PreloadAssets {
    tickTime: number = 100;
    testData!: TestData;
    preloadAssets!: AssetLoadingObj | Component | null;
    backSceneButton!: Button | Component | null;
    label!: Label | Component | null;

    @beforeClass
    async initData() {
        this.preloadAssets = find("Canvas")!.getComponent("PreloadAssets");
        console.log(this.preloadAssets)
    }

    @testCase
    async assetLoadingTest() {
        const retryNum = 5;
        for (let i = 0; i < this.preloadAssets!.loadList.length; i++) {
            // console.log(`tcoadList.length ${this.assetLoading!.loadList.length}, i:${i}`)
            let loadName = this.preloadAssets!.loadList[i].name;
            let node = find(`Canvas/New Layout/${loadName}`);
            simulateTouchEnd(node!);
            await screenshot_custom(this.tickTime);

            if (loadName === "Preload_Scene") {
                simulateTouchEnd(node!);
                await waitForFrames(this.tickTime);
                this.backSceneButton = find("Canvas")!.getComponent("BackToAssetLoading");
                this.label = find("Canvas/Label")!.getComponent("cc.Label");
                let result = await this.tryLoadSceneSuccess(retryNum);
                if (result) {
                    await screenshot_custom(this.tickTime);
                    //click back button
                    await this.backSceneButton!.onClick();
                    if (!this.preloadAssets!.loadList) {
                        this.preloadAssets = find("Canvas")!.getComponent("PreloadAssets");
                    }
                    await screenshot_custom(this.tickTime * 5);
                    continue;
                } else {
                    console.warn(`retry the  number is ${retryNum}, until can't load test scene,please check test scene is fine!`);
                }
            } else {
                simulateTouchEnd(node!);
                await screenshot_custom(this.tickTime);
            }
        }
    }

    async tryLoadSceneSuccess(tryNum: number) {
        for (let i = 0; i < tryNum!; i++) {
            await waitForFrames(i);
            //@ts-ignore
            if (this.label!.string === '加载成功' && this.backSceneButton) {
                return true;
            } else {
                continue;
            }
        }
    }
}

export type TestData = {
    NodeName: String[];
}