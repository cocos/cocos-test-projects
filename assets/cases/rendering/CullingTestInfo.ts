import { _decorator, Component, Node, LabelComponent, RenderableComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CullingTestInfo")
export class CullingTestInfo extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({
        type: Node
    })
    public nodes: Node[] = [];

    private _renderables: RenderableComponent[] = [];
    private _infoLabel: LabelComponent = null;
    private _cullingInfo: string = null;

    start () {
        // Your initialization goes here.
        this._renderables.length = 0;
        for (const n of this.nodes) {
            this._renderables.push(n.getComponent(RenderableComponent));
        }
        this._infoLabel = this.node.getComponent(LabelComponent);
    }

    update (deltaTime: number) {
        // Your update function goes here.
        this._cullingInfo = String();
        for (const r of this._renderables) {
            if (r._getModel()._uboUpdated) {
                this._cullingInfo += r.node.name + ': Visible\n';
            } else {
                this._cullingInfo += r.node.name + ': Culled\n';
            }
        }
        this._infoLabel.string = this._cullingInfo;
    }
}
