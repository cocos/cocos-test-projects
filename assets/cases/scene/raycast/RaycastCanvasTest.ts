import { _decorator, Component, Node, Camera, Label, input, Input, EventTouch, Touch, geometry, director, Layers, Canvas, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("RaycastCanvasTest")
export class RaycastCanvasTest extends Component {

    @property({ type: Canvas })
    readonly canvas: Canvas = null!;

    @property({ type: Label })
    readonly label: Label = null!;

    private _ray = new geometry.Ray();
    private _aabb = new geometry.AABB();
    onEnable () {
        this.label.string = '点击文字测试射线检测';
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onDisable () {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart (event: EventTouch) {
        const touch = event.touch!;
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
