import { _decorator, Component, Node, Vec3, Quat, tween, Tween } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenStop")
@menu("tween/TweenStop")
export class TweenStop extends Component {

    private tweenStop!: Tween<Node>;

    onLoad () {
        let scale = tween().to(1, { scale: new Vec3(3, 3, 3) })
        let rotate = tween().to(1, { rotation: new Quat(Math.sin(60), Math.sin(60), Math.sin(60), Math.cos(60)) })

        this.tweenStop = tween(this.node)
            .then(scale)
            .call(() => {
                // 停止缓动
                this.tweenStop.stop();
            })
            .then(rotate)
    }

    onEnable () {
        this.tweenStop.start();
    }

    onDisable () {
        this.tweenStop.stop();
    }
}
