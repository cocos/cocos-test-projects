import { _decorator, Component, Material, Camera, geometry, input, Input, EventTouch, Touch, PhysicsSystem, MeshRenderer } from "cc";
const { ccclass, property } = _decorator;

@ccclass("RaycastColliderTest")
export class RaycastColliderTest extends Component {

    @property({ type: Material })
    readonly defaultMaterial: Material = null!;

    @property({ type: Material })
    readonly rayMaterial: Material = null!;

    @property({ type: Camera })
    readonly cameraCom: Camera = null!;

    @property({ type: MeshRenderer })
    readonly modelCom: MeshRenderer = null!;

    private _ray: geometry.Ray = new geometry.Ray();

    onEnable () {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onDisable () {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart (event: EventTouch) {
        const touch = event.touch!;
        this.cameraCom.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
        if (PhysicsSystem.instance.raycast(this._ray)) {
            const r = PhysicsSystem.instance.raycastResults;
            for (let i = 0; i < r.length; i++) {
                const item = r[i];
                if (item.collider.node.uuid == this.modelCom.node.uuid) {
                    this.modelCom.material = this.rayMaterial;
                }
            }
        } else {
            this.modelCom.material = this.defaultMaterial;
        }
    }
}
