import { _decorator, Component, Node, Vec3, tween, Tween } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenDelay")
@menu("tween/TweenDelay")
export class TweenDelay extends Component {

    private tweenDelay: Tween;

    onLoad () {
        this.tweenDelay = tween(this.node)
            // 延迟 1s
            .delay(1)
            .to(1, { scale: new Vec3(2, 2, 2) }, null)
            // 再延迟 1s
            .delay(1)
            .to(1, { scale: new Vec3(3, 3, 3) }, null)
    }

    onEnable () {
        this.tweenDelay.start()
    }

    onDisable () {
        this.tweenDelay.stop()
    }
}
