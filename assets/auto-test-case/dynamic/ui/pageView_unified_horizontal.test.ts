import { find } from 'cc';
// @ts-ignore
import { runScene, sleep, testCase, testClass } from 'db://automation-framework/runtime/test-framework.mjs';
import { screenshot_custom } from '../common/utils';

@runScene('pageView_unified_horizontal')
@testClass('PageViewUnifiedHorizontal')
export class PageViewUnifiedHorizontal {
    _dt = 4;
    _delay = 2;

    @testCase
    async startPlay() {
        await screenshot_custom(this._dt);
    }

    @testCase
    async removeThreeCurrentPage(){
        //点击3次移除仍然展示第一页
        for(let i=0;i<3;i++){
            await sleep(0.5)
            this.removeCurrentP();
        }
        await sleep(this._delay);
        await screenshot_custom();
    }
    
    @testCase
    async addEightTimesToLastPage(){
       //点击8次添加页面并右翻页到第9页
        for(let i=0;i<8;i++){
            this.addPage();
        }
        this.setCurrentPageIndex(8);
        await sleep(this._delay);
        await screenshot_custom();
    }

    @testCase
    async addCurrentPage(){
        //验证用例插入当前页面的数据
        //上一个用例再第4页,直接插入一张
        this.insertCurrentPage();
        //再截图
        await screenshot_custom();
        //翻页到第10页
        this.setCurrentPageIndex(9);
        await sleep(this._delay);
        await screenshot_custom();
    }

    @testCase
    async removePages(){
        //点击移除返回第9页
        this.removePage();
        await sleep(this._delay);
        //查看当前页
        await screenshot_custom();
    }

    @testCase
    async removeLastPage(){
        //点击移除当前页到第8页
        this.removeCurrentP();
        await sleep(this._delay);
        await screenshot_custom();
    }

    @testCase
    async turnToCurrentPageIndex(){
        //左翻到第7页
        this.setCurrentPageIndex(6);
        await sleep(this._delay);
        await screenshot_custom();
    }
    @testCase
    async backToHomePage(){
        this.returnHomePage()
        await sleep(this._delay);
        await screenshot_custom();
    }

    @testCase
    async clearAll(){
        //移除当前的页面
        this.clearAllPage();
        await sleep(this._delay);
        //查看当前页
        await screenshot_custom();
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