import { _decorator, Component, Node, Label, UITransform, Vec3, Enum, Vec2 } from "cc";
const { ccclass, property, menu } = _decorator;

enum ConvertType{
    LOCAL,
    WORLD,
}

Enum(ConvertType);

@ccclass("CoordinateUILocalLocal")
@menu('UI/CoordinateUILocalLocal')
export class CoordinateUILocalLocal extends Component {
    @property({
        type: ConvertType
    })
    convertType = ConvertType.LOCAL;

    @property(Label)
    public showLabel: Label = null!;

    @property(Node)
    public aim: Node = null!;

    private _time = 0;
    private _transform: UITransform = null!;
    private _aimTransform: UITransform = null!;
    private _out = new Vec3();
    private _fixPoint = new Vec3(100, 100, 0);

    start() {
        this._transform = this.getComponent(UITransform)!;
        this._aimTransform = this.aim.getComponent(UITransform)!;
    }

    update (deltaTime: number) {
        let pos = this.node.position;
        if (this._time >= 0.2) {
            if (pos.x > 200) {
                this.node.setPosition(-200, pos.y, pos.z);
            } else {
                this.node.setPosition(pos.x + 5, pos.y, pos.z);
            }

            this._time = 0;
        }

        this._time += deltaTime;
        if (this.convertType === ConvertType.LOCAL) {
            pos = this.node.worldPosition;
            this._aimTransform.convertToNodeSpaceAR(pos, this._out);
            this.showLabel.string = `金币位置与下方图标位置距离 5 的倍数：${this._out.toString()}`;
        } else {
            this._transform.convertToWorldSpaceAR(this._fixPoint, this._out);
            this.showLabel.string = `初始与金币 x 轴相距 100 的点的世界坐标\n实际观察每次坐标 x 轴差值为 5：${this._out.toString()}`;
        }


    }
}
