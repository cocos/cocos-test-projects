import { _decorator, Component, Node, Mesh, ModelComponent, Material, UIModelComponent, LabelComponent, Prefab, instantiate } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ModelTest")
export class ModelTest extends Component {

    @property({
        type: Node,
    })
    public mount: Node = null;

    @property({
        type: Prefab,
    })
    public prefab: Prefab = null;

    private _meshMounted = false;
    private _buttonLabel: LabelComponent = null;
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
        this._buttonLabel = this.node.children[0].getComponent(LabelComponent);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    onClick () {
        if (this._meshMounted) {
            const c = this.mount.children[0];
            c.removeFromParent();
            c.destroy();
            this._buttonLabel.string = 'Add';
            this._meshMounted = false;
        } else {
            const c = instantiate(this.prefab) as Node;
            c.setScale(100, 100, 100);
            this.mount.addChild(c);
            c.addComponent(UIModelComponent);
            this._buttonLabel.string = 'Remove';
            this._meshMounted = true;
        }
    }
}
