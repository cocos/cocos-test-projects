// @ts-ignore
import { Label, Toggle, find, sys } from 'cc';
import { testCase, testClass, expect } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom_by_wait } from '../dynamic/common/utils';

@testClass('Terrain', 'terrain')
export class Terrain {

    @testCase
    async startPlay() {
        await screenshot_custom_by_wait(60);
    }

    @testCase
    async lod() {
        const toggle = find('Canvas/Toggle1')?.getComponent(Toggle) as Toggle;
        expect(toggle).to.not.be.a('null');

        const label = find('Canvas/TerrainTris')?.getComponent(Label) as Label;
        expect(label).to.not.be.a('null');

        const value1 = parseInt(label.string);

        toggle.isChecked = true;
        await screenshot_custom_by_wait(90);

        const value2 = parseInt(label.string);

        toggle.isChecked = false;
        await screenshot_custom_by_wait(90);

        if (sys.platform === sys.Platform.DESKTOP_BROWSER || sys.platform === sys.Platform.MOBILE_BROWSER) {
            expect(value2, `勾选 Lod 后 Triangle（数值=${value2}）应比未勾选的（数值=${value1}）小`).to.be.below(value1);
        }
    }
}
