import { _decorator, Component, Animation, AnimationClip, Vec3} from "cc";
const { ccclass, property } = _decorator;

@ccclass("deprecated-testing")
export class DeprecatedTesting extends Component {

    start () {
        let anim = this.node.addComponent(Animation);
        let clip = new AnimationClip('DD');
        // API 更名
        anim.addClip(clip)
        // API 更名 + 参数不兼容
        anim.removeClip(clip);
        // 静态成员函数更名
        // @ts-ignore
        Vec3['sub'];
    }

}
