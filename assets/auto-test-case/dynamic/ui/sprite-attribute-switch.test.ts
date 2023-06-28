// @ts-ignore
import { find, Button, Color, Size, Sprite } from 'cc';
import { beforeClass, testCase, testClass, waitForFrames } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('SpriteAttributeSwitch', 'sprite-attribute-switch')
export class SpriteAttributeSwitch {
    _dt = 3;
    caseScript!: any;

    @beforeClass
    async initData() {
        this.caseScript = find('Canvas')!.getComponent('SpriteAttributeSwitch')!;
    }

    @testCase
    async start() {
        const spriteFrameButton = find('Canvas/buttons/spriteFrameButton')!.getComponent(Button)!;
        const spriteTypeButton = find('Canvas/buttons/spriteTypeButton')!.getComponent(Button)!;

        await screenshot_custom(this._dt); // 1

        find('Canvas/buttons/activeButton')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom(this._dt); // 2

        this.caseScript.reset();
        find('Canvas/buttons/enabledButton')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom(this._dt); // 3

        // contentSizeButton
        this.caseScript.reset();
        this.caseScript!.transform.contentSize = new Size(200 * 2 * 0.6, 200 * 2 * 0.4);
        this.caseScript!.updateState();
        await screenshot_custom(this._dt); // 4
        
        // AnchorXButton
        this.caseScript.reset();
        this.caseScript!.transform.anchorX = 0.1;
        this.caseScript!.updateState();
        await screenshot_custom(this._dt); // 5

        // AnchorYButton
        this.caseScript.reset();
        this.caseScript!.transform.anchorY = 0.9;
        this.caseScript!.updateState();
        await screenshot_custom(this._dt); // 6

        // The color of the button changes randomly, and fixed parameters are provided here
        this.caseScript.reset();
        this.caseScript!.sprite.color = new Color(255 * 0.5, 255 * 0.5, 255 * 0.5, 255 * 0.5);
        this.caseScript!.updateState();
        await screenshot_custom(this._dt); // 7
        
        // spriteFrame
        this.caseScript.reset();
        await screenshot_custom(this._dt); // 8
        spriteFrameButton.clickEvents[0].emit([]);
        await screenshot_custom(this._dt); // 9

        // spriteType 1
        this.caseScript.reset();
        spriteTypeButton.clickEvents[0].emit([]);
        await screenshot_custom(this._dt); // 10
        spriteTypeButton.clickEvents[0].emit([]);
        await screenshot_custom(this._dt); // 11
        spriteTypeButton.clickEvents[0].emit([]);
        await screenshot_custom(this._dt); // 12
        spriteTypeButton.clickEvents[0].emit([]);
        await screenshot_custom(this._dt); // 13

        // spriteType 2
        this.caseScript.reset();
        spriteFrameButton.clickEvents[0].emit([]);
        spriteTypeButton.clickEvents[0].emit([]);
        await screenshot_custom(this._dt); // 14
        spriteTypeButton.clickEvents[0].emit([]);
        await screenshot_custom(this._dt); // 15
        spriteTypeButton.clickEvents[0].emit([]);
        await screenshot_custom(this._dt); // 16
        spriteTypeButton.clickEvents[0].emit([]);
        await screenshot_custom(this._dt); // 17

        // fillType 1
        this.caseScript.reset();
        this.caseScript.switchSpriteType();
        this.caseScript.switchSpriteType();
        this.caseScript.switchSpriteType();

        this.switchFillType(1);
        await screenshot_custom(this._dt); // 18
        this.switchFillType(2);
        await screenshot_custom(this._dt); // 19
        this.switchFillType(0);
        await screenshot_custom(this._dt); // 20

        // fillType 2
        this.caseScript.reset();
        spriteFrameButton.clickEvents[0].emit([]);
        this.caseScript.switchSpriteType();
        this.caseScript.switchSpriteType();
        this.caseScript.switchSpriteType();

        this.switchFillType(1);
        await screenshot_custom(this._dt); // 21
        this.switchFillType(2);
        await screenshot_custom(this._dt); // 22
        this.switchFillType(0);
        await screenshot_custom(this._dt); // 23
    }

    private switchFillType(value: number) {
        // @ts-ignore
        this.caseScript.sprite.fillType = this.caseScript.curFillTypeIndex = value;
        // @ts-ignore
        this.caseScript.sprite.fillRange = 0.7;
        this.caseScript.updateState();
    }
}