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
        this.tweenRF.stop();
    }
}
