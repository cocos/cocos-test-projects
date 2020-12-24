import { _decorator, Component, Node, Size, UITransform } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("ClickChangeSize")
@menu('UI/ClickChangeSize')
export class ClickChangeSize extends Component {

    @property(Node)
    public target: Node = null!;
    @property(Size)
    size = new Size();

    start () {
        // Your initialization goes here.
        this.node.on('click', this.click, this);
    }

    click () {
        if (this.target) {
            const uiTrans = this.target.getComponent(UITransform);
            uiTrans!.contentSize = this.size;
        }
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
