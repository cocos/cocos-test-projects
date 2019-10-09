import { _decorator, Component, Node, LabelComponent, UITransformComponent, Vec3, Enum, Vec2 } from "cc";
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

    @property(LabelComponent)
    showLabel: LabelComponent = null;

    @property(Node)
    aim: Node = null;

    _time = 0;
    _transfrom: UITransformComponent = null;
    _aimTransform: UITransformComponent = null;
    _out = new Vec3();
    _fixPoint = new Vec3(100, 100, 0);

    start() {
        this._transfrom = this.getComponent(UITransformComponent);
        this._aimTransform = this.aim.getComponent(UITransformComponent);
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
            this._transfrom.convertToWorldSpaceAR(this._fixPoint, this._out);
            this.showLabel.string = `与金币 x 轴相距 100 的点的世界坐标：${this._out.toString()}`;
        }


    }
}
