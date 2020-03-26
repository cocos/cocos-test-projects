import { _decorator, Component, AnimationComponent, AnimationClip, Vec3} from "cc";
const { ccclass, property } = _decorator;

@ccclass("deprecated-testing")
export class deprecatedtesting extends Component {

    start () {
        let anim = this.node.addComponent(AnimationComponent);
        let clip = new AnimationClip('DD');
        // API 更名
        anim.addClip(clip)
        // API 更名 + 参数不兼容
        anim.removeClip(clip);
        // 静态成员函数更名
        Vec3['sub'];
    }

}
