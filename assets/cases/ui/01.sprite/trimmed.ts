import { _decorator, Component, Node, Sprite, UITransform, Vec2, Graphics, Size, Color } from "cc";
const { ccclass, property, executeInEditMode, menu } = _decorator;

@ccclass("Trimmed")
@menu('UI/Trimmed')
@executeInEditMode
export class Trimmed extends Component {
    @property({
        type:Node
    })
    public trimmed : Node = null!;

    @property({
        type:Node
    })
    public noTrimmed : Node = null!;

    start () {
        const g = this.node.getComponent(Graphics)!;
        const trimmedContentSize = this.trimmed.getComponent(UITransform)!.contentSize;
        const noTrimmedContentSize = this.noTrimmed.getComponent(UITransform)!.contentSize;

        g.clear();
        g.lineWidth = 2;
        g.strokeColor = Color.RED;
        g.moveTo(this.trimmed.position.x - trimmedContentSize.width/2 + 1, trimmedContentSize.height /2 - 1);
        g.lineTo(this.trimmed.position.x + trimmedContentSize.width/2 - 1, trimmedContentSize.height /2 - 1);
        g.lineTo(this.trimmed.position.x + trimmedContentSize.width/2 - 1, - trimmedContentSize.height /2 + 1);
        g.lineTo(this.trimmed.position.x - trimmedContentSize.width/2 + 1, - trimmedContentSize.height /2 + 1);
        g.lineTo(this.trimmed.position.x - trimmedContentSize.width/2 + 1, trimmedContentSize.height /2 - 1);

        g.moveTo(this.noTrimmed.position.x - noTrimmedContentSize.width/2 + 1, noTrimmedContentSize.height /2 - 1);
        g.lineTo(this.noTrimmed.position.x + noTrimmedContentSize.width/2 - 1, noTrimmedContentSize.height /2 - 1);
        g.lineTo(this.noTrimmed.position.x + noTrimmedContentSize.width/2 - 1, - noTrimmedContentSize.height /2 + 1);
        g.lineTo(this.noTrimmed.position.x - noTrimmedContentSize.width/2 + 1, - noTrimmedContentSize.height /2 + 1);
        g.lineTo(this.noTrimmed.position.x - noTrimmedContentSize.width/2 + 1, noTrimmedContentSize.height /2 - 1);
        g.stroke();
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
