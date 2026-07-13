import { find } from 'cc';
// @ts-ignore
import { beforeClass, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';
import { EditboxCtrl } from '../../../cases/ui/12.editbox/editbox-ctrl';

@testClass('EditboxCtrlTest', 'editbox-ctrl')
export class EditboxCtrlTest {
    private caseScript!: EditboxCtrl;
    private df = 5;

    @beforeClass
    async initData() {
        this.caseScript = find('Canvas/ctrl')?.getComponent(EditboxCtrl)!;
    }

    @testCase
    async startPlay() {
        await screenshot_custom(this.df);
    }
   
    @testCase
    async focusOne() {
        this.caseScript.editBox1.string = 'AW34$5中';
        this.caseScript.editBox1.focus();
        this.caseScript.editBox1._showLabels();
        await screenshot_custom(this.df);
    }

    @testCase
    async focusTwo() {
        this.caseScript.editBox2.string = '!23DZ汉字X';
        this.caseScript.editBox2.focus();
        this.caseScript.editBox2._showLabels();
        await screenshot_custom(this.df);
    }

    @testCase
    async focusThree() {
        this.caseScript.editBox3.string = '!098《测》cd';
        this.caseScript.editBox3.focus();
        this.caseScript.editBox3._showLabels();
        await screenshot_custom(this.df);
    }
}