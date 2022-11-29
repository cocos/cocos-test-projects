// @ts-ignore
import { Button, find } from 'cc';
import { runScene, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('SpineMesh')
@testClass('SpineMesh')
export class SpineMesh {
    _delay = 0.5;
    _dt = 30;

    @testCase
    async startPlay() {
        // 进来先截一张图
        await screenshot_custom();
        // 点击1下按钮，再截1张图
        find('Canvas/Button')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom(this._dt);

        // 点击1下按钮，再截1张图
        find('Canvas/Button')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom(this._dt);
        
        // 点击1下按钮，再截1张图
        find('Canvas/Button')!.getComponent(Button)?.clickEvents[0].emit([]);
        await screenshot_custom(this._dt);
    }
}