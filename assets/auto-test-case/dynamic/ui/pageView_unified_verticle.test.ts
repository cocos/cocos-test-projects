import { find } from 'cc';
// @ts-ignore
import { runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('pageView_unified_verticle')
@testClass('PageViewUnifiedVerticle')
export class PageViewUnifiedVerticle {
    _dt = 50;
    _delay = 2;
    @testCase
    async startPlay() {
        await screenshot_custom(5);
    }

    @testCase
    async removeThreeCurrentPage(){
        //click 3 times to exit and still show the first page
        for(let i=0;i<3;i++){
            this.removeCurrentP();
        }
        await sleep(this._delay);
        await screenshot_custom(this._dt);
    }
    
    @testCase
    async addEightTimesToLastPage(){
       //click 8 times to add a page and turn right to page 9
        for(let i=0;i<8;i++){
            this.addPage();
        }
        this.setCurrentPageIndex(8);
        await screenshot_custom(this._dt);

    }

    @testCase
    async addCurrentPage(){
        //validate the data inserted into the current page by the use case
        //the last use case is on page 4, insert a page directly
        this.insertCurrentPage();
        //take another screenshot
        await screenshot_custom();
        //turn to page 10
        this.setCurrentPageIndex(9);
        await screenshot_custom(this._dt);

    }

    @testCase
    async removePages(){
        //click to remove to return to page 9
        this.removePage();
        //view current page
        await screenshot_custom(this._dt + 5);
    }

    @testCase
    async removeLastPage(){
        //click to remove current page to page 8
        this.removeCurrentP();
        await screenshot_custom(this._dt + 5);
    }

    @testCase
    async turnToCurrentPageIndex(){
        //turn left to page 7
        this.setCurrentPageIndex(6);
        await screenshot_custom(this._dt);
    }
    @testCase
    async backToHomePage(){
        this.returnHomePage()
        await screenshot_custom(this._dt);
    }

    @testCase
    async clearAll(){
        //remove current page
        this.clearAllPage();
        //view current page
        await screenshot_custom(this._dt);
    }
    // @testCase
    // async startPlay() {
    //     await screenshot_custom(this._dt);
    // }

    // @testCase
    // async addOnePage(){
    //     this.setCurrentPageIndex(2);
    //     await sleep(this._delay);
    //     this.addPage();
    //     this.setCurrentPageIndex(3);
    //     await sleep(this._delay);
    //     await screenshot_custom();
    // }
    
    // @testCase
    // async returnIndex(){
    //     this.returnHomePage();
    //     await sleep(this._delay);
    //     await screenshot_custom(this._dt);
    // }

    // @testCase
    // async addCurrentPage(){
    //     this.insertCurrentPage();
    //     await screenshot_custom();
    //     this.setCurrentPageIndex(4);
    //     await sleep(this._delay);
    //     await screenshot_custom();
    //     this.setCurrentPageIndex(3);
    //     await sleep(this._delay);
    //     await screenshot_custom();
    // }

    // @testCase
    // async removeLastPage(){
    //     this.removePage();
    //     this.setCurrentPageIndex(4)
    //     await sleep(this._delay);
    //     await screenshot_custom();
    // }

    // @testCase
    // async removeCurrentPage(){
    //     this.removeCurrentP();
    //     await sleep(this._delay);
    //     await screenshot_custom(this._dt);
    // }

    // @testCase
    // async clearAll(){
    //     this.clearAllPage();
    //     await sleep(this._delay);
    //     await screenshot_custom(this._dt);
    // }

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