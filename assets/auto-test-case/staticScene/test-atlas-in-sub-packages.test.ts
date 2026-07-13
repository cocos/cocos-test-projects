// @ts-ignore
import { Component, find } from 'cc';
import { runScene, testCase, testClass, beforeClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils'

@runScene('test-atlas-in-sub-packages')
@testClass('TestAtlasInSubPackages')
export class TestAtlasInSubPackages {
    _dt = 220;
    loadPackageInfo!: Component;

    @beforeClass
    initData() {
        this.loadPackageInfo = find("Canvas/loadPackageInfo")!.getComponent("loadSubPackages")!;
    }

    @testCase
    async startPlay() {
        if (this.loadPackageInfo.status) {
            await screenshot_custom(this._dt);
        } else {
            await waitForFrames(this._dt * 4)
            await screenshot_custom();
        }
    }
}