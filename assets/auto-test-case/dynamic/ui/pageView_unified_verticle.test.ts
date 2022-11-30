import { find } from 'cc';
// @ts-ignore
import { runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('pageView_unified_verticle')
@testClass('PageViewUnifiedVerticle')
export class PageViewUnifiedVerticle {
    _dt = 4;
    _delay = 2;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async addOnePage(){
        this.setCurrentPageIndex(2);
        await sleep(this._delay);
        this.addPage();
        this.setCurrentPageIndex(3);
        await sleep(this._delay);
        await screenshot_custom();
    }
    
    @testCase
    async returnIndex(){
        this.returnHomePage();
        await sleep(this._delay);
        await screenshot_custom(this._dt);
    }

    @testCase
    async addCurrentPage(){
        this.insertCurrentPage();
        await screenshot_custom();
        this.setCurrentPageIndex(4);
        await sleep(this._delay);
        await screenshot_custom();
        this.setCurrentPageIndex(3);
        await sleep(this._delay);
        await screenshot_custom();
    }

    @testCase
    async removeLastPage(){
        this.removePage();
        this.setCurrentPageIndex(4)
        await sleep(this._delay);
        await screenshot_custom();
    }

    @testCase
    async removeCurrentPage(){
        this.removeCurrentP();
        await sleep(this._delay);
        await screenshot_custom(this._dt);
    }

    @testCase
    async clearAll(){
        this.clearAllPage();
        await sleep(this._delay);
        await screenshot_custom(this._dt);
    }

    setCurrentPageIndex(index:number){
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').target.setCurrentPageIndex(index);
    }

    returnHomePage(){
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').target.setCurrentPageIndex(1);
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').onJumpHome();
    }

    clearAllPage(){
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').onRemoveAllPage();
    }

    removeCurrentP(){
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').onRemovePageAtIndex();
    }

    removePage(){
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').onRemovePage();
    }

    insertCurrentPage(){
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').onInsertPage();
    }

    addPage(){
        // @ts-ignore
        find('Canvas/page-view-ctrl').getComponent('PageViewCtrl').onAddPage();
    }

}