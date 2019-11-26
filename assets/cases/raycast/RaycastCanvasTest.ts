import { _decorator, Component, Node, CameraComponent, LabelComponent, systemEvent, SystemEventType, EventTouch, Touch, geometry, director, Layers, CanvasComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("RaycastCanvasTest")
export class RaycastCanvasTest extends Component {

    @property({ type: CanvasComponent })
    readonly canvas: CanvasComponent = null;

    @property({ type: LabelComponent })
    readonly label: LabelComponent = null;

    private _ray: geometry.ray = new geometry.ray();

    onEnable () {
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onDisable () {
        systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
    }

    onTouchStart (touch: Touch, event: EventTouch) {
        this.label.string = '点击我测试 UI 的射线检测';
        const uiCamera = this.canvas.camera;
        uiCamera.screenPointToRay(this._ray, touch._point.x, touch._point.y);
        const rs = director.getScene().renderScene;
        if (rs.raycastAllCanvas(this._ray)) {
            const result = rs.rayResultCanvas;
            for (let i = result.length; i--;) {
                const item = result[i];
                if (item.node.uuid == this.label.node.uuid) {
                    this.label.string = '检测成功，距离为 ' + item.distance;
                }
            }
        }
    }
}
