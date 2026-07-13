import { find, Button, EventHandler } from 'cc';
// @ts-ignore
import { testCase, testClass, beforeClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@testClass('HdrLdr', 'hdr-ldr')
export class HdrLdr {
    private button!: Button;

    @beforeClass
    async initData() {
        this.button = find('Canvas/Button')?.getComponent(Button)!;
    }

    @testCase
    async start() {
        await screenshot_custom(2);
    }

    @testCase
    async play() {
        for (let i=0; i<3; i++) {
            EventHandler.emitEvents(this.button.clickEvents, this.button);
            this.button.node.emit(Button.EventType.CLICK, this.button);
            await screenshot_custom(2);
        }
    }
}
