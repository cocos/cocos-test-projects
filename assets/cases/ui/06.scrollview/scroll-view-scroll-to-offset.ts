
import { _decorator, Component, find, ScrollView, Label, Vec2, Button } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ScrollViewScrollToOffset
 * DateTime = Sat Oct 30 2021 16:33:29 GMT+0800 (中国标准时间)
 * Author = zmzczy
 * FileBasename = scroll-view-scroll-to-offset.ts
 * FileBasenameNoExtension = scroll-view-scroll-to-offset
 * URL = db://assets/cases/ui/06.scrollview/scroll-view-scroll-to-offset.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('ScrollViewScrollToOffset')
export class ScrollViewScrollToOffset extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    protected scroll: ScrollView = null!;
    protected offsetLabel: Label = null!;
    protected curOffsetLabel: Label = null!;
    protected randomButton: Button =  null!;

    start () {
        // [3]
        this.scroll = find('Canvas/ScrollView')?.getComponent(ScrollView) as ScrollView;
        this.offsetLabel = find('Canvas/Label')?.getComponent(Label) as Label;
        this.curOffsetLabel =  find('Canvas/curOffsetLabel')?.getComponent(Label) as Label;
        this.randomButton =  find('Canvas/Button')?.getComponent(Button) as Button;

        this.randomButton.node.on('click', this.randomScrollOffset, this);
        this.scroll.node.on('scrolling', ()=>{
            let curScrollOffset = this.scroll.getScrollOffset();
            this.showCurOffsetLog(curScrollOffset);
        }, this);

        let curScrollOffset = this.scroll.getScrollOffset();
        this.showCurOffsetLog(curScrollOffset);
        this.offsetLabel.string = '点击随机滚动查看偏移数据';
    }

    public randomScrollOffset(btn: Button | null, param1?: number) {
        let offsetAnchor = param1 || Math.random();
        let maxOffsetVec = this.scroll.getMaxScrollOffset();
        let thisOffsetVec: Vec2 =new Vec2(offsetAnchor * maxOffsetVec.x, offsetAnchor * maxOffsetVec.y);
        this.scroll.scrollToOffset(thisOffsetVec);
        let afterScrollOffset = this.scroll.getScrollOffset();
        this.showRandomOffsetLog(thisOffsetVec, afterScrollOffset);
        this.showCurOffsetLog(afterScrollOffset)
    }

    protected showCurOffsetLog(offset: Vec2) {
        let curOffsetLog: string = `当前Offset = ${offset}`;
        this.curOffsetLabel.string = curOffsetLog;
    }

    protected showRandomOffsetLog(paramOffset: Vec2, afterOffset: Vec2) {
        let offsetLog: string = `ScrollToOffset，参数Offset = ${paramOffset}\nGetScrollOffset，结果Offset = ${afterOffset}`;
        this.offsetLabel.string = offsetLog;
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
