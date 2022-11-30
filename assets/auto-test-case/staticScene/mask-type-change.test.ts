// @ts-ignore
import { sleep, runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../dynamic/common/utils';
import { find } from 'cc';

@runScene('mask-type-change')
@testClass('MaskTypeChange')
export class MaskTypeChange{
    _delay = 1;
    _dt =120;
    
    @testCase
    async start(){
        await screenshot_custom()
    }

    @testCase
    async play(){
        for(let i=0;i<10;i++){
            await screenshot_custom(this._dt)
        }
    }
}
