import { find } from 'cc';
// @ts-ignore
import { captureOneImage, runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('pageView_free_verticle')
@testClass('PageViewFreeVerticle')
export class PageViewFreeVerticle {
    _dt = 2;
    _delay = 2;

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
        await screenshot_custom(this._dt * 5 + 30);
    }

    @testCase
    async page_Two() {
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').target.setCurrentPageIndex(2);
        await screenshot_custom(this._dt * 5 + 30);
    }

    @testCase
    async page_Three() {
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').target.setCurrentPageIndex(3);
        await screenshot_custom(this._dt * 5 + 30);
    }

    @testCase
    async page_Four() {
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').target.setCurrentPageIndex(4);
        await screenshot_custom(this._dt * 5 + 30);
    }

    @testCase
    async page_Five() {
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').target.setCurrentPageIndex(5);
        await screenshot_custom(this._dt * 5 + 30);
    }

    @testCase
    async page_Six() {
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').target.setCurrentPageIndex(6);
        await screenshot_custom(this._dt * 5 + 30);
    }

    @testCase
    async page_Seven() {
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').target.setCurrentPageIndex(7);
        await screenshot_custom(this._dt * 5 + 30);
    }

}