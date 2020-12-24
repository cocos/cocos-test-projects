
import { _decorator, Camera, Canvas, Color, Component, Font, Label, Node, Vec3, quat, UITransform } from 'cc';
const { ccclass, property, menu } = _decorator;

@ccclass('LabelModelComponent')
@menu('自定义脚本/LabelModel/label-model-component')
export class LabelModelComponent extends Component {

    @property({ type: Color })
    get color () {
        return this._color;
    }

    set color (value) {
        this._color.set(value);
    }

    @property
    get string () {
        return this._string;
    }

    set string (value) {
        this._string = value;
    }

    @property
    get typeName () {
        return this._typeName;
    }

    set typeName (value) {
        this._typeName = value;
    }

    @property({
        type: Font,
    })
    get font () {
        return this._font;
    }

    set font (value) {
        this._font = value;
    }

    @property
    get priority () {
        return this._priority;
    }

    set priority (value) {
        this._priority = value;
    }

    @property
    private _string = '';
    @property
    private _typeName = 'name-block';
    @property
    private _color = Color.WHITE.clone();
    @property
    private _font: Font | null = null;
    @property
    private _priority = 0;

    private _label: Label | null = null;
    private _camera: Camera | null = null;
    private _worldRot = quat();
    private _lastCameraWPos = new Vec3();
    private _wPos = new Vec3();
    private _cameraWPos = new Vec3();
    private _lastWPos = new Vec3();

    public onEnable () {
        this._camera = this.node.scene.getComponentInChildren(Camera) as Camera;
        if (this.labelInit()) {
            return;
        }

        const canvas = this.node.scene.getComponentInChildren(Canvas);
        if (!canvas) {
            return;
        }

        let root = canvas.node.getChildByName('label-model-manager');
        if (!root) {
            root = new Node('label-model-manager');
            root.setParent(canvas.node);
            root.setSiblingIndex(0);
            root.addComponent(UITransform);
        }

        const labelNode = new Node(this._typeName);
        labelNode.setParent(root);
        const labelTrans = labelNode.getComponent(UITransform)!;
        const label = labelNode.addComponent(Label);
        labelTrans.setContentSize(200, 50);
        label.horizontalAlign = Label.HorizontalAlign.CENTER;
        label.verticalAlign = Label.VerticalAlign.CENTER;
        this._label = label;
        this.labelInit();
    }

    public lateUpdate () {
        this._camera!.node.getWorldRotation(this._worldRot);
        this.node.setWorldRotation(this._worldRot);
        if (!this._camera || !this._label) {
            return;
        }

        this.node.getWorldPosition(this._wPos);
        this._camera.node.getWorldPosition(this._cameraWPos);
        if (this._cameraWPos.equals(this._lastCameraWPos) && this._wPos.equals(this._lastWPos)) {
            return;
        }

        this._lastCameraWPos.set(this._cameraWPos);
        this._lastWPos.set(this._wPos);

        // [HACK]
        // @ts-ignore
        this._camera._camera.update();
        this._camera.convertToUINode(this._wPos, this._label.node.parent!, this._wPos);
        this._label.node.setPosition(this._wPos);

    }

    public onDisable () {
        if (this._label) {
            this._label.node.active = false;
        }
    }

    public onDestroy () {
        if (this._label && this._label.node) {
            this._label.node.destroy();
        }
    }

    public labelInit () {
        if (this._label) {
            this._label.string = this._string;
            this._label.font = this._font;
            this._label.color = this._color;
            this._label.node.active = true;
            return true;
        }

        return false;
    }
}
