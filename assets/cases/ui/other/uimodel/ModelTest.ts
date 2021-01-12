import { _decorator, Component, Node, Mesh, MeshRenderer, Material, UIMeshRenderer, Label, Prefab, instantiate, Layers } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("ModelTest")
@menu('UI/ModelTest')
export class ModelTest extends Component {

    @property({
        type: Node,
    })
    public mount: Node = null!;

    @property({
        type: Prefab,
    })
    public prefab: Prefab = null!;

    private _meshMounted = false;
    private _buttonLabel: Label = null!;


    start () {
        // Your initialization goes here.
        this._buttonLabel = this.node.children[0].getComponent(Label)!;
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
            c.layer = Layers.Enum.UI_2D;
            c.setScale(100, 100, 100);
            this.mount.addChild(c);
            c.addComponent(UIMeshRenderer);
            this._buttonLabel.string = 'Remove';
            this._meshMounted = true;
        }
    }
}
