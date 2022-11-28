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
        //先切换到第三页
        this.setCurrentPageIndex(2);
        await sleep(this._delay);
        //点击插入按钮
        this.addPage();
        //再切到第三页查看
        this.setCurrentPageIndex(3);
        await sleep(this._delay);
        //再截图
        await screenshot_custom();
    }
    
    @testCase
    async returnIndex(){
        //移除当前的页面
        this.returnHomePage();
        await sleep(this._delay);
        //查看当前页
        await screenshot_custom(this._dt);
    }

    @testCase
    async addCurrentPage(){
        //验证用例插入当前页面的数据
        //上一个用例再第4页,直接插入一张
        this.insertCurrentPage();
        //再截图
        await screenshot_custom();
        //查看最后一页
        this.setCurrentPageIndex(4);
        await sleep(this._delay);
        //存在第四页，证明是在前面插入的
        await screenshot_custom();
        //再切换回插入页面
        this.setCurrentPageIndex(3);
        await sleep(this._delay);
        //切换回插入页面截图
        await screenshot_custom();
    }

    @testCase
    async removeLastPage(){
        //移除最后一页
        this.removePage();
        //移除到已经被删除的地方
        this.setCurrentPageIndex(4)
        await sleep(this._delay);
        //查看当前页
        await screenshot_custom();
    }

    @testCase
    async removeCurrentPage(){
        //移除当前的页面
        this.removeCurrentP();
        await sleep(this._delay);
        //查看当前页
        await screenshot_custom(this._dt);
    }

    @testCase
    async clearAll(){
        //移除当前的页面
        this.clearAllPage();
        await sleep(this._delay);
        //查看当前页
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