import { _decorator, Component, Node, game } from "cc";
const { menu, ccclass, property } = _decorator;

@ccclass("PersistSetUp")
@menu("physics/PersistSetUp")
export class PersistSetUp extends Component {

    onLoad () {
        this.node.removeFromParent();
        game.addPersistRootNode(this.node);
    }

}
