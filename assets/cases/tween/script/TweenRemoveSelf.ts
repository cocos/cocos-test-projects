import { _decorator, Component, Node, tween, tweenUtil, Tween } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenRemoveSelf")
@menu("tween/TweenRemoveSelf")
export class TweenRemoveSelf extends Component {

    private tweenRemoveSelf: Tween;

    onLoad () {
        /**
         * 注意 target 需要是 Node 的，才可以使用 removeSelf
         */
        this.tweenRemoveSelf = tweenUtil(this.node)
            .delay(1)
            .removeSelf()
    }

    onEnable () {
        this.tweenRemoveSelf.start();
    }

    onDisable () {
        this.tweenRemoveSelf.stop();
    }
}
