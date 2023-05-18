// @ts-ignore

import { waitForNextFrame, runScene, testCase, testClass, sleep } from 'db://automation-framework/runtime/test-framework.mjs';
import { Component, find } from 'cc';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('planar-shadow')
@testClass('PlanarShadow')
export class PlanarShadow {
    @testCase
    async startPlay() {
        await waitForNextFrame();
        await screenshot_custom_by_wait(10);

    }
    @testCase
    async move() {
        let _camera: Component | null
        _camera = find('Camera')!.getComponent('first-person-camera');
        //@ts-ignore
        _camera._euler = { x: -51.195614, y: 22.180221, z: 0 };   
        await screenshot_custom_by_wait(100);
    }
}