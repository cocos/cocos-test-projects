import { _decorator, Component, Node, Vec3, Quat } from "cc";
const { ccclass, property, menu } = _decorator;

const _v3_0 = new Vec3();
const _quat_0 = new Quat();

@ccclass("rotate-around-axis")
@menu("UI/rotate-around-axis")
export class RotateAroundAxis extends Component {

    update (deltaTime: number) {
        _v3_0.set(-1, 1, 0);
        _v3_0.normalize();
        Quat.rotateAround(_quat_0, this.node.rotation, _v3_0, Math.PI * 0.01);
        this.node.setRotation(_quat_0);
    }
}
