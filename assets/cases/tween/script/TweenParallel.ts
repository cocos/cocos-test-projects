import { _decorator, Component, Node, tween, Vec3, Tween } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenParallel")
@menu("tween/TweenParallel")
export class TweenParallel extends Component {

    private tweenParallel!: Tween<Node>;

    onLoad () {
        this.tweenParallel = tween(this.node)
            // 同时执行两个 Tween
            .parallel(
                tween().to(2, { scale: new Vec3(1, 2, 3) }),
                tween().to(2, { position: new Vec3(3, 0, 3) })
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
