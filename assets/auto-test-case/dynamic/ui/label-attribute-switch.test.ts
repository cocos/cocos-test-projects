// @ts-ignore
import { Color, Component, find, Label, LabelOutline, LabelShadow, Size, UITransform } from 'cc';
import { runScene, testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('label-attribute-switch')
@testClass('LabelAttributeSwitch')
export class LabelAttributeSwitch {
    tickTime: number = 30;
    caseList: String[] = ["activeButton", "enabledButton", "contentSizeButton", "AnchorXButton", "AnchorYButton", "colorButton", "stringButton", "horizontalAlignButton", "verticalAlignButton", "fontButton", "useSystemFontButton", "fontSizeButton", "overflowButton", "cacheModeButton", "outlineButton", "outlineColorButton", "outlineWidthButton", "shadowButton", "shadowColorButton", "shadowOffsetButton", "shadowBlurButton", "resetButton"];
    transform!: UITransform | Component | null;
    oriSize: Size = new Size(200, 200);
    labelAttribute!:Component;
    label!:Label |Component;
    outline!: LabelOutline |Component;
    shadow!: LabelShadow | Component;

    @beforeClass
    initData() {
        console.log("----------------",find("Canvas/Label"))
        this.transform = find("Canvas/Label")!.getComponent("cc.UITransform")!;
        this.label = find("Canvas/Label")!.getComponent("cc.Label")!;
        this.outline = find("Canvas/Label")!.getComponent("cc.LabelOutline")!;
        this.shadow = find("Canvas/Label")!.getComponent("cc.LabelShadow")!;
    }

    @testCase
    async startPlay() {
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async activeButton() {
        const activeBtn = find("Canvas/buttons/activeButton")!.getComponent("cc.Button");
        for (let i = 0; i < 2; i++) {
            activeBtn!.clickEvents[0].emit([]);
            await screenshot_custom(this.tickTime);
        }
    }

    @testCase
    async enabledButton() {
        const activeBtn = find("Canvas/buttons/enabledButton")!.getComponent("cc.Button");
        for (let i = 0; i < 2; i++) {
            activeBtn!.clickEvents[0].emit([]);
            await screenshot_custom(this.tickTime);
        }
    }

    @testCase
    async contentSizeButton() {
        const randX=0.4547272307407113;
        const randY=0.19348385088486952;
        //contentSizeButton!.clickEvents[0].emit([]);
        this.transform!.contentSize = new Size(this.oriSize.x * 2 * randX, this.oriSize.y * 2 * randY);
        console.log("this.transform!.contentSize ",this.transform!.contentSize);
        this.updateState();
        await screenshot_custom(this.tickTime);

        const x=0.2945661979873351;
        const y=0.7921869604254592;
        // contentSizeButton!.clickEvents[0].emit([]);
        this.transform!.contentSize = new Size(this.oriSize.x * 2 * x, this.oriSize.y * 2 * y);
        this.updateState();
        await screenshot_custom(this.tickTime);
    }


    @testCase
    async switchAnchorX(){
        const randX=0.6521365915694648;
        const randY=0.5;
        this.transform!.anchorX = randX;
        this.updateState();
        await screenshot_custom(this.tickTime);
    }


    @testCase
    async switchAnchorY(){
        const randY=0.8641434767227314;
        this.transform!.randY = randY;
        this.updateState();
        await screenshot_custom(this.tickTime);
    }


    @testCase
    async colorButton(){
        const color=new Color(255 * 0.3 , 255 * 0.5, 255 * 0.4, 255 * 0.8);
        this.label!.color = color;
        this.updateState();
        await screenshot_custom(this.tickTime);
    }


    @testCase
    async stringButton(){
        this.label!.string = "testing string"
        this.updateState();
        await screenshot_custom(this.tickTime);

        this.label!.string = "testing string wrjwqsjdlsakjdsaldsdjsldsaldsjdksajdsakjdsadsadsadsad"
        this.updateState();
        await screenshot_custom(this.tickTime);

    }

    @testCase
    async horizontalAlignButton(){
        const activeBtn = find("Canvas/buttons/horizontalAlignButton")!.getComponent("cc.Button");
        activeBtn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async verticalAlignButton(){
        const activeBtn = find("Canvas/buttons/verticalAlignButton")!.getComponent("cc.Button");
        activeBtn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async fontButton(){
        const activeBtn = find("Canvas/buttons/fontButton")!.getComponent("cc.Button");
        activeBtn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }


    @testCase
    async useSystemFontButton(){
        const activeBtn = find("Canvas/buttons/useSystemFontButton")!.getComponent("cc.Button");
        activeBtn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async fontSizeButton(){
        this.label!.fontSize = 20;
        this.updateState();
        await screenshot_custom(this.tickTime);
    }

    
    @testCase
    async overflowButton(){
        const activeBtn = find("Canvas/buttons/overflowButton")!.getComponent("cc.Button");
        activeBtn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async outlineButton(){
        const activeBtn = find("Canvas/buttons/outlineButton")!.getComponent("cc.Button");
        activeBtn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async outlineColorButton(){
        this.outline.color = new Color(255 * 0.3722029865090255, 255 * 0.5710897253179028, 255 * 0.8497690059890528, 255 * 0.3513002481020939);
        this.updateState();
        await screenshot_custom(this.tickTime);
    }


    @testCase
    async switchOutlineWidth() {
        this.outline.width =4.898001506301493;
        this.updateState();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async shadowButton(){
        this.shadow.enabled = !this.shadow.enabled;
        this.updateState();
        await screenshot_custom(this.tickTime);
    }


    @testCase
    async shadowColorButton(){
        this.shadow.color = new Color(255 * 0.8662123185692148, 255 * 0.15273869974057686, 255 * 0.7999636186648476, 255 * 0.9266380103869918);
        this.updateState();
        await screenshot_custom(this.tickTime);
    }


    @testCase
    async shadowOffsetButton(){
        this.shadow.offset = new Vec2(3 * 2 * 0.8943199701432856, 3 * 2 * 0.3134031421313581);
        this.updateState();
        await screenshot_custom(this.tickTime);
    }

    
    @testCase
    async shadowBlurButton(){
        this.shadow.blur = 2.382617145815883;
        this.updateState();
        await screenshot_custom(this.tickTime);
    }


    @testCase
    async reset(){
        const activeBtn = find("Canvas/buttons/resetButton")!.getComponent("cc.Button");
        activeBtn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }
   
    updateState(){
        //@ts-ignore
        this.labelAttribute = find("Canvas")!.getComponent("LabelAttributeSwitch")!;
        console.log("this.labelAttribute",this.labelAttribute);
        this.labelAttribute.updateState();
    }
}