import { _decorator, Component, Node, SpriteComponent, UITransformComponent, Vec2, GraphicsComponent, Size, Color } from "cc";
const { ccclass, property, executeInEditMode, menu } = _decorator;

@ccclass("Trimmed")
@menu('UI/Trimmed')
@executeInEditMode
export class Trimmed extends Component {
    @property({
        type:Node
    })
    trimmed : Node = null;

    @property({
        type:Node
    })
    noTrimmed : Node = null;

    private _trimmedContentSize : Size;
    private _noTrimmedContentSize : Size;
    private _gra : GraphicsComponent;

    start () {
        this._gra = this.node.getComponent(GraphicsComponent);
        this._trimmedContentSize = this.trimmed.getComponent(UITransformComponent).contentSize;
        this._noTrimmedContentSize = this.noTrimmed.getComponent(UITransformComponent).contentSize;

        this._gra.clear();
        this._gra.lineWidth = 2;
        this._gra.strokeColor = Color.RED;
        this._gra.moveTo(this.trimmed.position.x - this._trimmedContentSize.width/2 + 1, this._trimmedContentSize.height /2 - 1);
        this._gra.lineTo(this.trimmed.position.x + this._trimmedContentSize.width/2 - 1, this._trimmedContentSize.height /2 - 1);
        this._gra.lineTo(this.trimmed.position.x + this._trimmedContentSize.width/2 - 1, - this._trimmedContentSize.height /2 + 1);
        this._gra.lineTo(this.trimmed.position.x - this._trimmedContentSize.width/2 + 1, - this._trimmedContentSize.height /2 + 1);
        this._gra.lineTo(this.trimmed.position.x - this._trimmedContentSize.width/2 + 1, this._trimmedContentSize.height /2 - 1);

        this._gra.moveTo(this.noTrimmed.position.x - this._noTrimmedContentSize.width/2 + 1, this._noTrimmedContentSize.height /2 - 1);
        this._gra.lineTo(this.noTrimmed.position.x + this._noTrimmedContentSize.width/2 - 1, this._noTrimmedContentSize.height /2 - 1);
        this._gra.lineTo(this.noTrimmed.position.x + this._noTrimmedContentSize.width/2 - 1, - this._noTrimmedContentSize.height /2 + 1);
        this._gra.lineTo(this.noTrimmed.position.x - this._noTrimmedContentSize.width/2 + 1, - this._noTrimmedContentSize.height /2 + 1);
        this._gra.lineTo(this.noTrimmed.position.x - this._noTrimmedContentSize.width/2 + 1, this._noTrimmedContentSize.height /2 - 1);
        this._gra.stroke();
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
