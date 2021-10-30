
import { _decorator, Component, Node, ScrollView } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ScrollViewBounceBack
 * DateTime = Sat Oct 30 2021 16:20:55 GMT+0800 (中国标准时间)
 * Author = zmzczy
 * FileBasename = scroll-view-bounce-back.ts
 * FileBasenameNoExtension = scroll-view-bounce-back
 * URL = db://assets/cases/ui/06.scrollview/scroll-view-bounce-back.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('ScrollViewBounceBack')
export class ScrollViewBounceBack extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
        let com = this.node.getComponent(ScrollView);
        com?.node.on('scrolling',()=>{
            console.log('scrolling')
        },this)
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
