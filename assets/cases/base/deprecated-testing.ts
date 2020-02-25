import { _decorator, Component, AnimationComponent, AnimationClip, tweenUtil } from "cc";
const { ccclass, property } = _decorator;

@ccclass("deprecated-testing")
export class deprecatedtesting extends Component {

    start () {
        // API 更名
        tweenUtil({});
    }

}
