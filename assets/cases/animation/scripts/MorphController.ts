import { _decorator, Component, ModelComponent, CCFloat, Mesh, Prefab, instantiate, find, Slider, Label, Layout, EventHandler } from 'cc';
import { EDITOR } from 'cce.env';
const { ccclass, property, executeInEditMode } = _decorator;

declare const cce;

@ccclass('MorphController')
@executeInEditMode
export class MorphController extends Component {

    private _weightsControl: number[] = [];
    private _modelComp: ModelComponent;
    private _morph: NonNullable<Mesh['struct']['morph']>;
    private _totalTargets: number = 0;
    @property({type:Prefab})
    public controlItemPrfb: Prefab = null;
    @property({type:Layout})
    public itemLayout: Layout = null;

    @property({type:[CCFloat], range:[0, 1, 0.1], slide: true})
    public get weightsControl() {
        return this._weightsControl;
    }

    public set weightsControl(value) {
        // undo时会每个元素进行数组的一次set，等待fix
        if (value.length != this._totalTargets) {
            return;
        }
        this._weightsControl = value;

        this.setWeights(this._weightsControl);
    }

    public setWeights(weights: number[]) {
        if (weights.length === 0) {
            return;
        }
        for (let iSubMeshMorph = 0; iSubMeshMorph < this._morph.subMeshMorphs.length; ++iSubMeshMorph) {
            if (this._morph.subMeshMorphs[iSubMeshMorph]) {
                this._modelComp.setWeights(weights, iSubMeshMorph);
            }
        }
    }

    start () {
        this._modelComp = this.node.getComponent(ModelComponent)!;
        if (!this._modelComp)
        {
            return;
        }
        const mesh = this._modelComp.mesh;
        if (!mesh) {
            return;
        }
        this._morph = mesh.struct.morph;
        if (!this._morph) {
            return;
        }
        if (this._morph.subMeshMorphs.length === 0) {
            // TODO submeshcount是0
            console.warn('submesh count is 0');
            return;
        }
        const firstNonNullSubMeshMorph = this._morph.subMeshMorphs.find((subMeshMorph) => !!subMeshMorph);
        if (!firstNonNullSubMeshMorph) {
            // TODO 任何 submesh 都没有Morph
            console.warn(`all submesh don't have morph`)
            return;
        }
        if (!this._morph.subMeshMorphs.every((subMeshMorph) => !subMeshMorph || subMeshMorph.targets.length === firstNonNullSubMeshMorph.targets.length)) {
            // TODO 每个 submesh 的target数量不一样
            console.warn(`not all submesh count are the same`);
        }
        const subMeshMorph = this._morph.subMeshMorphs[0];
        const nTargets =  subMeshMorph.targets.length;
        this._totalTargets = nTargets;
        this.weightsControl = new Array(nTargets).fill(0);


        if (EDITOR) {
            cce.Node.emit('change', this.node);
            cce.Ipc.forceSend('broadcast', 'scene:change-node', this.node.uuid);
        }

        if (!EDITOR) {
            this.initUI();
        }
    }

    public initUI() {
        for (let i = 0; i < this._totalTargets; i++) {
            let controlItem = instantiate(this.controlItemPrfb);
            controlItem.parent = this.itemLayout.node;
            let nameLabel = find('Name', controlItem).getComponent(Label);
            nameLabel.string = ''+i;
            let slider = find('Slider', controlItem).getComponent(Slider);
            let sliderEventHandler = new EventHandler();
            sliderEventHandler.target = this.node;
            sliderEventHandler.handler = "onSliderChanged";
            sliderEventHandler.component = "MorphController";
            sliderEventHandler.customEventData = ''+i;
            slider.slideEvents.push(sliderEventHandler);
            
        }
    }

    public onSliderChanged(target, customEventData) {
        console.log(target, customEventData);
        let index = Number.parseInt(customEventData);
        this.weightsControl[index] = target.progress;
        this.weightsControl = this.weightsControl;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
