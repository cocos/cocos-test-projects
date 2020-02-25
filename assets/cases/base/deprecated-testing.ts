import { _decorator, Component, AnimationComponent, AnimationClip, tweenUtil } from "cc";
const { ccclass, property } = _decorator;

@ccclass("deprecated-testing")
export class deprecatedtesting extends Component {

    start () {
        // TODO: 支付宝平台上有问题
        if (!CC_ALIPAY) {
            let anim = this.node.addComponent(AnimationComponent);
            let clip = new AnimationClip('DD');
            // API 更名
            console.log(anim.addClip(clip));
            // API 更名 + 参数不兼容
            console.log(anim.removeClip(clip));
        }

        // API 更名
        tweenUtil({});
    }

}
