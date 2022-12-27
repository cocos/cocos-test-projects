
// @ts-ignore
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { Component, find } from 'cc';

@runScene('toggle')
@testClass('Toggle')
export class Toggle{
    _dt = 5;

    @testCase
    async start(){
       await screenshot_custom(this._dt);
    }
    @testCase
    async transition(){
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-transition-none", "cc.Toggle", false);
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-transition-color", "cc.Toggle", false);
        await screenshot_custom(this._dt);
    }


    @testCase
    async allFalse(){
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-transition-none",  "cc.Toggle", false);
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-transition-color", "cc.Toggle", false);
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-transition-scale", "cc.Toggle", false);
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-transition-sprite", "cc.Toggle", false);
        await screenshot_custom(this._dt);
    }

    @testCase
    async allTrue(){
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-transition-none", "cc.Toggle", true);
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-transition-color", "cc.Toggle", true);
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-transition-scale", "cc.Toggle", true);
         //@ts-ignore
         this.findComponentAndSetValue("Canvas/toggle-transition-sprite", "cc.Toggle", true);
         await screenshot_custom(this._dt);
    }

    @testCase
    async toggleContainerNormal(){
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-container-normal/Toggle2", "cc.Toggle", true);
        await screenshot_custom(this._dt);
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-container-normal/Toggle3", "cc.Toggle", true);
        await screenshot_custom(this._dt);
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-container-normal/Toggle1", "cc.Toggle", true);
        await screenshot_custom(this._dt);
    }

    @testCase
    async toggleContainerAllSwitchOff(){
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-container-AllowSwitchOff/Toggle2", "cc.Toggle", true);
        await screenshot_custom(this._dt);
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-container-AllowSwitchOff/Toggle3", "cc.Toggle", true);
        await screenshot_custom(this._dt);
        //@ts-ignore
        this.findComponentAndSetValue("Canvas/toggle-container-AllowSwitchOff/Toggle1", "cc.Toggle", true);
        await screenshot_custom(this._dt);
    }


    findComponentAndSetValue(node:Node,componentName:Component,value:boolean){
         //@ts-ignore
        find(node).getComponent(componentName).isChecked=value;
    }
}