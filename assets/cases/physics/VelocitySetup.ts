import { _decorator, Component, Node, Vec3, RigidBodyComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("VelocitySetup")
export class VelocitySetup extends Component {

    @property({ type: Vec3 })
    public linearVelocity: Vec3 = new Vec3();

    start () {
        let rigidbody = this.getComponent(RigidBodyComponent);
        if (rigidbody) {
            rigidbody.setLinearVelocity(this.linearVelocity);
        }
    }

}
