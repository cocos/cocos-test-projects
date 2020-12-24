import { _decorator, Component, Node, tween, Tween } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenShowHide")
@menu("tween/TweenShowHide")
export class TweenShowHide extends Component {

    private tweenSH!: Tween<Node>;

    onLoad () {
        /**
         * 注意 target 需要是 Node 的，才可以使用 show 和 hide
         */
        this.tweenSH = tween(this.node)
            .delay(0.1)
            .hide()
            .delay(0.1)
            .show()
            .union()
            .repeatForever()
    }

    onEnable () {
        this.tweenSH.start();
    }

    onDisable () {
        this.tweenSH.stop();
    }
}
