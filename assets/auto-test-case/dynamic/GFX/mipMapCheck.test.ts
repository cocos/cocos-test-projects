//@ts-ignore
import { director } from 'cc';
//@ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('mipMapCheck')
@testClass('MipMapCheck')
export class MipMapCheck {
    _delay = 1;
    _dt = 60;
    

    @testCase
    async index(){
       await screenshot_custom();
    }
    @testCase
    async play_big_case() {
        await screenshot_custom(this._dt+1);
    }

    @testCase
    async play_small_case() { 
        await screenshot_custom(this._dt+1+20); 
    }

    @testCase
    async play_big_coin() { 
        await screenshot_custom(this._dt*2-5); 
    }

    @testCase
    async play_small_coin() {
        await screenshot_custom(this._dt*2+32);
    }
   
    @testCase
    async play_end() {
        await screenshot_custom(this._dt*4);
    }
}