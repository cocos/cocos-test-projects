import { _decorator, Component, Node, Vec3, tweenUtil, Tween } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenRepeat")
@menu("tween/TweenRepeat")
export class TweenRepeat extends Component {

    private tweenRepeat: Tween;

    onLoad () {
        this.tweenRepeat = tweenUtil(this.node)
            .by(1, { scale: new Vec3(2, 2, 2) })
            // 对前一个 by 重复执行 3次
            .repeat(3)
            .call(() => { console.log('All tweens finished.') })
    }

    onEnable () {
        this.tweenRepeat.start();
    }

    onDisable () {
        this.tweenRepeat.stop();
    }
}

