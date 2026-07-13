// @ts-ignore
import { Button, Color, Component, find, Label, LabelOutline, LabelShadow, Size, UITransform, Vec2 } from 'cc';
// @ts-ignore
import { runScene, testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { UISimulate } from '../common/SimulateEvent';

@testClass('LabelAttributeSwitch', 'label-attribute-switch')
export class LabelAttributeSwitch {
    tickTime: number = 30;
    oriSize: Size = new Size(200, 200);
    caseScript!: any;
    resetBtn!: Button | null;
    label!: Label;
    transform!: UITransform | null;
    outline!: LabelOutline;
    shadow!: LabelShadow;

    @beforeClass
    initData() {
        this.caseScript = find("Canvas")!.getComponent("LabelAttributeSwitch")!;
        this.resetBtn = find("Canvas/buttons/resetButton")!.getComponent("cc.Button") as Button;
        this.label = find("Canvas/Label")!.getComponent("cc.Label") as Label;
        this.transform = find("Canvas/Label")!.getComponent("cc.UITransform") as UITransform;
        this.outline = find("Canvas/Label")!.getComponent("cc.LabelOutline") as LabelOutline;
        this.shadow = find("Canvas/Label")!.getComponent("cc.LabelShadow") as LabelShadow;
    }

    @testCase
    async startPlay() {
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async activeButton() {
        const btn = find("Canvas/buttons/activeButton")!.getComponent("cc.Button") as Button;
        for (let i = 0; i < 2; i++) {
            btn!.clickEvents[0].emit([]);
            await screenshot_custom(this.tickTime);
        }
    }

    @testCase
    async enabledButton() {
        const btn = find("Canvas/buttons/enabledButton")!.getComponent("cc.Button") as Button;
        for (let i = 0; i < 2; i++) {
            btn!.clickEvents[0].emit([]);
            await screenshot_custom(this.tickTime);
        }
    }

    @testCase
    async contentSizeButton() {
        const randX = 0.4547272307407113;
        const randY = 0.19348385088486952;
        //contentSizeButton!.clickEvents[0].emit([]);
        this.transform!.contentSize = new Size(this.oriSize.x * 2 * randX, this.oriSize.y * 2 * randY);
        this.caseScript.updateState();
        await screenshot_custom(this.tickTime);

        const x = 0.2945661979873351;
        const y = 0.7921869604254592;
        this.transform!.contentSize = new Size(this.oriSize.x * 2 * x, this.oriSize.y * 2 * y);
        this.caseScript.updateState();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async switchAnchorX() {
        this.reset();
        const randX = 0.6521365915694648;
        this.transform!.anchorX = randX;
        this.caseScript.updateState();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async switchAnchorY() {
        this.reset();
        const randY = 0.8641434767227314;
        this.transform!.anchorY = randY;
        this.caseScript.updateState();
        await screenshot_custom(this.tickTime);
    }


    @testCase
    async colorButton() {
        this.reset();
        const color = new Color(255 * 0.3, 255 * 0.5, 255 * 0.4, 255 * 0.8);
        this.label!.color = color;
        this.caseScript.updateState();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async stringButton() {
        this.reset();
        this.label!.string = "testing string 1";
        this.caseScript.updateState();
        await screenshot_custom(this.tickTime);

        this.label!.string = "testing string 2 hello";
        this.caseScript.updateState();
        await screenshot_custom(this.tickTime);

    }

    @testCase
    async horizontalAlignButton() {
        this.reset();
        const btn = find("Canvas/buttons/horizontalAlignButton")!.getComponent("cc.Button") as Button;
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async verticalAlignButton() {
        this.reset();
        const btn = find("Canvas/buttons/verticalAlignButton")!.getComponent("cc.Button") as Button;
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async fontButton() {
        this.reset();
        const btn = find("Canvas/buttons/fontButton")!.getComponent("cc.Button") as Button;
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async useSystemFontButton() {
        this.reset();
        const btn = find("Canvas/buttons/useSystemFontButton")!.getComponent("cc.Button") as Button;
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async fontSizeButton() {
        this.reset();
        this.label!.fontSize = 20;
        this.caseScript.updateState();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async overflowButton() {
        this.reset();
        const btn = find("Canvas/buttons/overflowButton")!.getComponent("cc.Button") as Button;
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async cacheModeButton() {
        this.reset();
        const btn = find("Canvas/buttons/cacheModeButton")!.getComponent("cc.Button") as Button;
        //mode:0
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
        //mode:1
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
        //mode:2
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async outlineButton() {
        this.reset();
        const btn = find("Canvas/buttons/outlineButton")!.getComponent("cc.Button") as Button;
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async outlineColorButton() {
        this.reset();
        this.outline.color = new Color(255 * 0.3722029865090255, 255 * 0.5710897253179028, 255 * 0.8497690059890528, 255 * 0.3513002481020939);
        this.caseScript.updateState();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async switchOutlineWidth() {
        this.reset();
        this.outline.width = 4.898001506301493;
        this.caseScript.updateState();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async shadowButton() {
        this.reset();
        const btn = find("Canvas/buttons/shadowButton")!.getComponent("cc.Button") as Button;
        btn!.clickEvents[0].emit([]);
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async shadowColorButton() {
        this.reset();
        this.shadow.color = new Color(255 * 0.8662123185692148, 255 * 0.15273869974057686, 255 * 0.7999636186648476, 255 * 0.9266380103869918);
        this.caseScript.updateState();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async shadowOffsetButton() {
        this.reset();
        this.shadow.offset = new Vec2(3 * 2 * 0.8943199701432856, 3 * 2 * 0.3134031421313581);
        this.caseScript.updateState();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async shadowBlurButton() {
        this.reset();
        this.shadow.blur = 2.382617145815883;
        this.caseScript.updateState();
        await screenshot_custom(this.tickTime);
    }

    @testCase
    async resetAll() {
        this.reset();
        await screenshot_custom(this.tickTime);
    }

    reset() {
        UISimulate.clickButton(this.resetBtn!);
    }

}