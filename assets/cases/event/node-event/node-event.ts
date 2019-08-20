import { _decorator, Component, LabelComponent, Node } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("NodeEvent")
@menu('Event/NodeEvent')
export class NodeEvent extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(LabelComponent)
    labelComp: LabelComponent = null;
    @property(Node)
    receiver: Node = null;

    _receiver: NodeEvent = null;

    start() {
        if (this.receiver) {
            this._receiver = this.receiver.getComponent(NodeEvent);
        } else {
            this._receiver = this;
        }

        this.node.on('click', this.click, this._receiver);
    }

    click() {
        this.labelComp.string = `Receiver is: ${this._receiver.node.name}`;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
