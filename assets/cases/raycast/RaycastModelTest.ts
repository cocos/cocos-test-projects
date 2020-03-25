import { _decorator, Component, Node, Material, CameraComponent, ModelComponent, geometry, systemEvent, SystemEventType, EventTouch, Touch, Director, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("RaycastModelTest")
export class RaycastModelTest extends Component {

    @property({ type: Material })
    readonly defaultMaterial: Material = null;

    @property({ type: Material })
    readonly rayMaterial: Material = null;

    @property({ type: CameraComponent })
    readonly cameraCom: CameraComponent = null;

    @property({ type: ModelComponent })
    readonly modelCom: ModelComponent = null;

    private _ray: geometry.ray = new geometry.ray();

    onEnable () {
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onDisable () {
        systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart (touch: Touch, event: EventTouch) {
        this.cameraCom.screenPointToRay(touch._point.x, touch._point.y, this._ray);
        if (geometry.intersect.ray_model(this._ray, this.modelCom.model)) {
            this.modelCom.material = this.rayMaterial;
        } else {
            this.modelCom.material = this.defaultMaterial;
        }
    }
}
