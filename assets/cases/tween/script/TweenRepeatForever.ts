import { _decorator, Component, Node, Vec3, tween, Tween } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenRepeatForever")
@menu("tween/TweenRepeatForever")
export class TweenRepeatForever extends Component {

    private tweenRF: Tween;

    onLoad () {
        // 一直重复执行下去
        this.tweenRF = tween(this.node)
            .by(1, { scale: new Vec3(2, 2, 2) })
            .repeatForever()
    }

    onEnable () {
        this.tweenRF.start();
    }

    onDisable () {
        /**
         * v1.0.4 版本开始，当缓动目标为 node 后，节点销毁后将会自动进行 stop
         */
        // this.tweenRF.stop();
    }
}
