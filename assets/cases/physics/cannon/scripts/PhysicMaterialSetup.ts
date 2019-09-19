import { _decorator, Component, Node, PhysicMaterial, ColliderComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PhysicMaterialSetup")
export class PhysicMaterialSetup extends Component {

    @property
    public friction: number = 0;

    @property
    public restitution: number = 0;

    start () {
        if (CC_PHYSICS_CANNON) {
            let collider = this.getComponent(ColliderComponent);
            if (collider) {
                collider.material.friction = this.friction;
                collider.material.restitution = this.restitution;
            }
        }
    }

}
