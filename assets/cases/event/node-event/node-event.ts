import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("NodeEvent")
@menu('Event/NodeEvent')
export class NodeEvent extends Component {

    @property(Label)
    public labelComp: Label = null!;
    @property(Node)
    public receiver: Node = null!;

    private _receiver: NodeEvent = null!;

    start() {
        if (this.receiver) {
            this._receiver = this.receiver.getComponent(NodeEvent)!;
        } else {
            this._receiver = this;
        }

        this.node.on('click', this.click, this._receiver);
    }

    onDestroy(){
        this.node.off('click', this.click, this._receiver);
    }

    click() {
        this.labelComp.string = `Receiver is: ${this._receiver.node.name}`;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
