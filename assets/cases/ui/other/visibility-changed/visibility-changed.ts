import { _decorator, Component, Node } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("VisibilityChanged")
@menu('UI/VisibilityChanged')
export class VisibilityChanged extends Component {
    @property(Node)
    target: Node | null = null;

    start() {
        setTimeout(() => {
            this.node.setParent(this.target);
        }, 1000);
    }
}
