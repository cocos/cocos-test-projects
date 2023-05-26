import { Button, director, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@testClass('SpineAttach', 'SpineAttach')
export class SpineAttach {
    _delay = 2;
    _dt = 20;
    _totalFrames = 0;

    @testCase
    async part1() {
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt);
        };
    }

    @testCase
    async part2() {
        find('Canvas/Node-001/toggle cache')!.getComponent(Button)?.clickEvents[0].emit([]);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt); 
        };
    }

    @testCase
    async part3() {
        find('Canvas/Node-001/toggle cache')!.getComponent(Button)?.clickEvents[0].emit([]);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt); 
        };
    }

    @testCase
    async part4() {
        find('Canvas/Node-001/toggle attach')!.getComponent(Button)?.clickEvents[0].emit([]);
        for (let i = 0; i < 2; i++) {
            await screenshot_custom_by_wait(this._dt); 
        };
    }

    @testCase
    async part5() {
        find('Canvas/Node-001/toggle attach')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom_by_wait(this._dt); 
    }

}