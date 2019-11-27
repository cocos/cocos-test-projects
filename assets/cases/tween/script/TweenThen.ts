import { _decorator, Component, Node, Vec3, Quat, tweenUtil, Tween } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenThen")
@menu("tween/TweenThen")
export class TweenThen extends Component {

    private tweenThen: Tween;

    onLoad () {
        let scale = tweenUtil().to(1, { scale: new Vec3(2, 2, 2) })
        let rotate = tweenUtil().to(1, { eulerAngles: new Vec3(45, 45, 45) })
        let move = tweenUtil().to(1, { position: new Vec3(5, 5, 5) })

        // 先缩放，再旋转，再移动
        this.tweenThen = tweenUtil(this.node)
            .then(scale)
            .then(rotate)
            .then(move)

    }

    onEnable () {
        this.tweenThen.start();
    }

    onDisable () {
        this.tweenThen.stop();
    }

}
