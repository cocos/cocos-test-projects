import { _decorator, Component, Node, BatchingUtility, LabelComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StaticBatcher')
export class StaticBatcher extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({
        type: Node,
    })
    staticNode = null;

    @property({
        type: LabelComponent,
    })
    buttonLabel = null;

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
