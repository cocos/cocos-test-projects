import { _decorator, Component, Node, LabelComponent, SpriteComponent, Enum } from "cc";
const { ccclass, property, menu } = _decorator;

enum EPhysicsItem {
    BUILTIN = 1 << 0,
    CANNON = 1 << 1,
    AMMO = 1 << 2,
    CANNON_AMMO = EPhysicsItem.CANNON + EPhysicsItem.AMMO,
    ALL = -1,
}
Enum(EPhysicsItem);

@ccclass("PhysicsEnvCheck")
@menu("physics/PhysicsEnvCheck")
export class PhysicsEnvCheck extends Component {

    @property({ type: EPhysicsItem })
    physics: EPhysicsItem = EPhysicsItem.CANNON_AMMO;

    start () {
        switch (this.physics) {
            case EPhysicsItem.ALL:
                return;
            case EPhysicsItem.CANNON_AMMO:
                if (CC_PHYSICS_CANNON || CC_PHYSICS_AMMO) {
                    return;
                }

                let lbCom = this.getComponentInChildren(LabelComponent);
                lbCom.string = "测试此场景需要将物理模块设置为 cannon.js 或 ammo.js";
                let sprCom = this.getComponent(SpriteComponent);
                sprCom.enabled = true;
                break;
            case EPhysicsItem.CANNON:
                if (!CC_PHYSICS_CANNON) {
                    let lbCom = this.getComponentInChildren(LabelComponent);
                    lbCom.string = "测试此场景需要将物理模块设置为 cannon.js";

                    let sprCom = this.getComponent(SpriteComponent);
                    sprCom.enabled = true;
                }
                break;
            case EPhysicsItem.AMMO:
                if (!CC_PHYSICS_AMMO) {
                    let lbCom = this.getComponentInChildren(LabelComponent);
                    lbCom.string = "测试此场景需要将物理模块设置为 ammo.js";

                    let sprCom = this.getComponent(SpriteComponent);
                    sprCom.enabled = true;
                }
                break;
            case EPhysicsItem.BUILTIN:
                if (!CC_PHYSICS_BUILTIN) {
                    let lbCom = this.getComponentInChildren(LabelComponent);
                    lbCom.string = "测试此场景需要将物理模块设置为 builtin";

                    let sprCom = this.getComponent(SpriteComponent);
                    sprCom.enabled = true;
                }
                break;
        }
    }
}
