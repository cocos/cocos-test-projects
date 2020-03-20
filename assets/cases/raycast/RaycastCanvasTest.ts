import { _decorator, Component, Node, CameraComponent, LabelComponent, systemEvent, SystemEventType, EventTouch, Touch, geometry, director, Layers, CanvasComponent, UITransformComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("RaycastCanvasTest")
export class RaycastCanvasTest extends Component {

    @property({ type: CanvasComponent })
    readonly canvas: CanvasComponent = null;

    @property({ type: LabelComponent })
    readonly label: LabelComponent = null;

    private _ray = new geometry.ray();
    private _aabb = new geometry.aabb();
    onEnable () {
        this.label.string = '点击文字测试射线检测';
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onDisable () {
        systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart (touch: Touch, event: EventTouch) {
        this.label.string = '点击文字测试射线检测';
        const uiCamera = this.canvas.camera;
        uiCamera.screenPointToRay(this._ray, touch._point.x, touch._point.y);
        const uitrans = this.label.getComponent(UITransformComponent);
        uitrans.getComputeAABB(this._aabb);
        if (geometry.intersect.ray_aabb(this._ray, this._aabb)) {
            this.label.string = '检测成功';
        }
    }
}
