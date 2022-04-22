import { _decorator, Component, Node, BatchingUtility, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StaticBatcher')
export class StaticBatcher extends Component {


    @property({
        type: Node,
    })
    public staticNode: Node = null!;

    @property({
        type: Label,
    })
    public buttonLabel: Label = null!;

    _batched = false;

    onBtnClick () {
        if (this._batched) {
            BatchingUtility.unbatchStaticModel(this.staticNode, this.node);
            this._batched = false;
            this.buttonLabel.string = 'Batch';
        } else {
            BatchingUtility.batchStaticModel(this.staticNode, this.node);
            this._batched = true;
            this.buttonLabel.string = 'Unbatch';
        }
    }
}
