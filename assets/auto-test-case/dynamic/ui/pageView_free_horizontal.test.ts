import { find } from 'cc';
// @ts-ignore
import { runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('pageView_free_horizontal')
@testClass('PageViewFreeHorizontal')
export class PageViewFreeHorizontal {
    _delay = 0.5;
    _dt = 2;

    @testCase
    async page_Home() {
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').onLoad();
        await screenshot_custom(this._dt);
    }

    @testCase
    async page_One() {
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').target.setCurrentPageIndex(1);
        await sleep(this._delay);
        await screenshot_custom(this._dt * 5);
    }

    @testCase
    async page_Two() {
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').target.setCurrentPageIndex(2);
        await sleep(this._delay);
        await screenshot_custom(this._dt * 5);
    }

    @testCase
    async page_Three() {
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').target.setCurrentPageIndex(3);
        await sleep(this._delay);
        await screenshot_custom(this._dt * 5);
    }

    @testCase
    async page_Four() {
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').target.setCurrentPageIndex(4);
        await sleep(this._delay);
        await screenshot_custom(this._dt * 5);
    }

}