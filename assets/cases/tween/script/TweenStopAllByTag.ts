
import { _decorator, Component, Node, find, tween, Vec3, Tween } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TweenStopAllByTag
 * DateTime = Mon Dec 27 2021 19:17:51 GMT+0800 (中国标准时间)
 * Author = Greg1129
 * FileBasename = TweenStopAllByTag.ts
 * FileBasenameNoExtension = TweenStopAllByTag
 * URL = db://assets/cases/tween/script/TweenStopAllByTag.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('TweenStopAllByTag')
export class TweenStopAllByTag extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
        let node = find('Canvas/Sprite');
        tween(node)
            .tag(1)
            .by(2, {position: new Vec3(300, 300, 0)})
            .call(()=>{
                console.log('position change');
            })
            .start();

        tween(node)
            .tag(1)
            .by(3, {scale: new Vec3(1, 1, 1)})
            .call(()=>{
                console.log('scale change');
            })
            .start();

        this.scheduleOnce(()=>{
            Tween.stopAllByTag(1);
        }, 1.5);
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
