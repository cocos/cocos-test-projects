import { _decorator, Component, Node, tweenUtil, Vec3, Tween } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenParallel")
@menu("tween/TweenParallel")
export class TweenParallel extends Component {

    private tweenParallel: Tween;

    onLoad () {
        this.tweenParallel = tweenUtil(this.node)
            // 同时执行两个 Tween
            .parallel(
                tweenUtil().to(2, { scale: new Vec3(1, 2, 3) }),
                tweenUtil().to(2, { position: new Vec3(3, 0, 3) })
            )
            .call(() => {
                console.log('All tweens finished.')
            })
    }

    onEnable () {
        this.tweenParallel.start();
    }

    onDisable () {
        this.tweenParallel.stop();
    }

}
