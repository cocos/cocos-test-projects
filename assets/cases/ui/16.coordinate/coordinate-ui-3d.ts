import { _decorator, Component, Camera, Vec3, Quat, Node } from "cc";
const { ccclass, property, menu } = _decorator;

const _v3_0 = new Vec3();

@ccclass("CoordinateUI3D")
@menu("UI/CoordinateUI3D")
export class CoordinateUI3D extends Component {

    @property({ type: Node })
    public D3Node: Node = null!;

    @property({ type: Node })
    public UINode: Node = null!;

    @property({ type: Camera })
    public mainCamera: Camera = null!;

    lateUpdate (deltaTime: number) {
        this.D3Node.getWorldPosition(_v3_0);
        this.mainCamera.convertToUINode(_v3_0, this.UINode.parent!, _v3_0);
        this.UINode.setPosition(_v3_0);
    }
}
