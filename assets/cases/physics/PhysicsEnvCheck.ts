import { _decorator, Component, Node, LabelComponent, SpriteComponent } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("PhysicsEnvCheck")
@menu("physics/PhysicsEnvCheck")
export class PhysicsEnvCheck extends Component {

    start () {
        // Your initialization goes here.
        if (this.node.name == 'cannon') {
            if (!CC_PHYSICS_CANNON) {
                let lbCom = this.getComponentInChildren(LabelComponent);
                lbCom.string = "测试此场景需要将物理模块设置为 cannon.js";

                let sprCom = this.getComponent(SpriteComponent);
                sprCom.enabled = true;
            }
        } else if (this.node.name == 'builtin') {
            if (!CC_PHYSICS_BUILTIN) {
                let lbCom = this.getComponentInChildren(LabelComponent);
                lbCom.string = "测试此场景需要将物理模块设置为 builtin";

                let sprCom = this.getComponent(SpriteComponent);
                sprCom.enabled = true;
            }
        } else if (this.node.name == 'ammo') {
            if (!CC_PHYSICS_AMMO) {
                let lbCom = this.getComponentInChildren(LabelComponent);
                lbCom.string = "测试此场景需要将物理模块设置为 ammo";

                let sprCom = this.getComponent(SpriteComponent);
                sprCom.enabled = true;
            }
        }
    }
}
