import { _decorator, Component, Node } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("VisibilityChanged")
@menu('UI/VisibilityChanged')
export class VisibilityChanged extends Component {
    @property(Node)
    target: Node | null = null;

    start() {
        this.scheduleOnce(()=>{
            this.node.setParent(this.target);
            this.node.walk((child) => {
                child.layer = this.target!.layer;
            })
        }, 1);
    }
}
