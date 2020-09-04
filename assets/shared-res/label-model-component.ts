
import { _decorator, CameraComponent, CanvasComponent, Color, Component, Font, LabelComponent, Node, Vec3, quat } from 'cc';
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

    private _label: LabelComponent | null = null;
    private _camera: CameraComponent | null = null;
    private _worldRot = quat();
    private _lastCameraWpos = new Vec3();
    private _wpos = new Vec3();
    private _cameraWpos = new Vec3();
    private _lastWpos = new Vec3();

    public onEnable () {
        this._camera = this.node.scene.getComponentInChildren('cc.CameraComponent') as CameraComponent;
        if (this.labelInit()) {
            return;
        }

        const canvas = this.node.scene.getComponentInChildren('cc.CanvasComponent') as CanvasComponent;
        if (!canvas) {
            return;
        }

        let root = canvas.node.getChildByName('label-model-manager');
        if (!root) {
            root = new Node('label-model-manager');
            root.setParent(canvas.node);
            root.setSiblingIndex(0);
            root.addComponent('cc.UITransformComponent');
        }

        const labelNode = new Node(this._typeName);
        labelNode.setParent(root);
        const label = labelNode.addComponent('cc.LabelComponent') as LabelComponent;
        labelNode.setContentSize(200, 50);
        label.horizontalAlign = LabelComponent.HorizontalAlign.CENTER;
        label.verticalAlign = LabelComponent.VerticalAlign.CENTER;
        this._label = label;
        this.labelInit();
    }

    public lateUpdate () {
        this._camera.node.getWorldRotation(this._worldRot);
        this.node.setWorldRotation(this._worldRot);
        if (!this._camera || !this._label) {
            return;
        }

        this.node.getWorldPosition(this._wpos);
        this._camera.node.getWorldPosition(this._cameraWpos);
        if (this._cameraWpos.equals(this._lastCameraWpos) && this._wpos.equals(this._lastWpos)) {
            return;
        }

        this._lastCameraWpos.set(this._cameraWpos);
        this._lastWpos.set(this._wpos);

        // [HACK]
        // @ts-ignore
        this._camera._camera.update();
        cc.pipelineUtils.WorldNode3DToLocalNodeUI(this._camera, this._wpos, this._label.node.parent, this._wpos);
        this._label.node.setPosition(this._wpos);

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
