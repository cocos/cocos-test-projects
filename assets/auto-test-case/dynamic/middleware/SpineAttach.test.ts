import { Button, director, find } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../common/utils';

@runScene('SpineAttach')
//@testClass('SpineAttach')
export class SpineAttach {
    _delay = 2;
    _dt = 20;
    _totalFrames = 0;

    @testCase
    async cacheNodes1() {
        this._totalFrames = director.getTotalFrames();
        // click the cache button
        find('Canvas/Node-001/toggle cache')!.getComponent(Button)?.clickEvents[0].emit([]);
        for (let i = 0; i < 3; i++) { //each 20dt, take another screenshot
            await screenshot_custom_by_wait(this._dt*(i+1) + this._totalFrames - director.getTotalFrames()); 

        };
    }

    @testCase
    async cacheNodes2() {
        // click the cache button 2 times
        find('Canvas/Node-001/toggle cache')!.getComponent(Button)?.clickEvents[0].emit([]);
        for (let i = 0; i < 3; i++) { //each 20dt, take another screenshot
            await screenshot_custom_by_wait(this._dt*(i+4) + this._totalFrames - director.getTotalFrames()); 
        };
    }

    @testCase
    async attachNodes() {
        // click attach button
        find('Canvas/Node-001/toggle attach')!.getComponent(Button)?.clickEvents[0].emit([]);
        for (let i = 0; i < 3; i++) { //each 20dt, take another screenshot
            let xx = this._dt*(i+7) + this._totalFrames - director.getTotalFrames();
            await screenshot_custom_by_wait(xx); 
        };
    }

    /**
    @testCase
    async startPlay() {
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changeMode_realtime() {
        // @ts-ignore
        await find('Canvas')?.getComponent('SpineAttach')?.changeMode()
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changeMode_cache() {
        // @ts-ignore
        await find('Canvas')?.getComponent('SpineAttach')?.changeMode()
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changeAttach_01() {
        // @ts-ignore
        await find('Canvas')?.getComponent('SpineAttach')?.changeAttach()
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }

    @testCase
    async changeAttach_02() {
        // @ts-ignore
        await find('Canvas')?.getComponent('SpineAttach')?.changeAttach()
        for (let i = 0; i < 3; i++) {
            await screenshot_custom(this._dt);
        };
    }
     */

}