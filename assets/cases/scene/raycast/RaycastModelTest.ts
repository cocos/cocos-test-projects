import { _decorator, Component, Node, Material, Camera, MeshRenderer, geometry, systemEvent, SystemEventType, EventTouch, Touch, Director, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("RaycastModelTest")
export class RaycastModelTest extends Component {

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
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onDisable () {
        systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart (touch: Touch, event: EventTouch) {
        const point = touch.getLocation();
        this.cameraCom.screenPointToRay(point.x, point.y, this._ray);
        if (geometry.intersect.rayModel(this._ray, this.modelCom.model!)) {
            this.modelCom.material = this.rayMaterial;
        } else {
            this.modelCom.material = this.defaultMaterial;
        }
    }
}
