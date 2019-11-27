import { _decorator, Component, Node, Vec3, tweenUtil, Tween } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenRepeat2")
@menu("tween/TweenRepeat2")
export class TweenRepeat2 extends Component {

    private tweenRepeat: Tween;

    onLoad () {
        /**
         * 这里 repeat 重复的是嵌入的 Tween, target 将取上下文中的
         * 这个例子和脚本 TweenRepeat 中的效果是一样的
         */
        this.tweenRepeat = tweenUtil(this.node)
            .repeat(3, tweenUtil().by(1, { scale: new Vec3(2, 2, 2) }))
    }
    onEnable () {
        this.tweenRepeat.start();
    }

    onDisable () {
        this.tweenRepeat.stop();
    }
}
