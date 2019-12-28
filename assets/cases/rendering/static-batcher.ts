import { _decorator, Component, Node, BatchingUtility, ModelComponent, LabelComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("staticBatcher")
export class staticBatcher extends Component {
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

    batch () {
        BatchingUtility.batchStaticModel(this.staticNode, this.node);
        this.staticNode.active = false;
    }

    unbatch () {
        this.node.getComponent(ModelComponent).destroy();
        this.staticNode.active = true;
    }

    onBtnClick () {
        if (this.staticNode.activeInHierarchy) {
            this.batch();
            this.buttonLabel.string = 'Unbatch';
        } else {
            this.unbatch();
            this.buttonLabel.string = 'Batch';
        }
    }
}
