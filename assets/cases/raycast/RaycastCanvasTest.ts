import { _decorator, Component, Node, Camera, Label, systemEvent, SystemEventType, EventTouch, Touch, geometry, director, Layers, Canvas, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("RaycastCanvasTest")
export class RaycastCanvasTest extends Component {

    @property({ type: Canvas })
    readonly canvas: Canvas = null!;

    @property({ type: Label })
    readonly label: Label = null!;

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
        const point = touch.getLocation();
        uiCamera.screenPointToRay(this._ray, point.x, point.y);
        const uiTrans = this.label.getComponent(UITransform)!;
        uiTrans.getComputeAABB(this._aabb);
        if (geometry.intersect.rayAABB(this._ray, this._aabb)) {
            this.label.string = '检测成功';
        }
    }
}
