import { _decorator, Component, CCFloat, Mesh, Prefab, instantiate, find, Slider, Label, Layout, EventHandler, MeshRenderer } from 'cc';
import { EDITOR } from 'cc/env';
const { ccclass, property, executeInEditMode } = _decorator;

declare const cce: any;

@ccclass('NumberArray')
export class NumberArray {
    @property({type:[CCFloat], range:[0, 1, 0.1], slide: true})
    array : number[] = [];

    constructor (n: number) {
        this.array = new Array(n).fill(0);
    }
}

@ccclass('MorphController')
@executeInEditMode
export class MorphController extends Component {
    private _weightsControl: NumberArray[] = [];
    private _modelComp: MeshRenderer = null!;
    private _morph!: NonNullable<Mesh['struct']['morph']>;
    private _totalTargets: number[] = [];
    private _targetNames: string[] = [];
    @property({type:Prefab})
    public controlItemPrfb: Prefab = null!;
    @property({type:Prefab})
    public controlMaskPrfb: Prefab = null!;
    @property({type:Layout})
    public itemLayout: Layout = null!;

    @property({type: NumberArray})
    public get weightsControl() {
        return this._weightsControl;
    }

    public set weightsControl(value) {
        // undo时会每个元素进行数组的一次set，等待fix
        if (value.length != this._totalTargets.length) {
            return;
        }
        this._weightsControl = value;

        this.setWeight(this._weightsControl);
    }

    public setWeight(weights: any) {
        if (weights.length === 0) {
            return;
        }
        const newWeights = this.dataConversion(weights);
        for (let iSubMeshMorph = 0; iSubMeshMorph < this._morph.subMeshMorphs.length; ++iSubMeshMorph) {
            if (this._morph.subMeshMorphs[iSubMeshMorph]) {
                for (let iShape = 0; iShape < this._morph.subMeshMorphs[iSubMeshMorph]!.targets.length; ++iShape) {
                    this._modelComp.setWeight(newWeights[iSubMeshMorph][iShape], iSubMeshMorph, iShape);
                }
            }
        }
    }

    // 数据转换
    // 因为要在编辑器上实现二维数组，封装了 NumberArray 类，把 NumberArray 转换成 number[][] 数据
    dataConversion (weights: any) {
        let values : number[][] = [];
        let iCount = 0;
        for (let iSubMeshMorph = 0; iSubMeshMorph < this._morph.subMeshMorphs.length; ++iSubMeshMorph) {
            values[iSubMeshMorph] = [];
            if (this._morph.subMeshMorphs[iSubMeshMorph]) {
                values[iSubMeshMorph] = weights[iCount].array;
                ++iCount;
            } else {
                values[iSubMeshMorph] = null!;
            }
        }
        return values;
    }

    start () {
        this._modelComp = this.node.getComponent(MeshRenderer)!;
        if (!this._modelComp) {
            return;
        }

        const mesh = this._modelComp.mesh;
        if (!mesh) {
            return;
        }

        this._morph = mesh.struct.morph!;
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
        let subMeshMorphs = [];
        for (let i = 0; i < this._morph.subMeshMorphs.length; i++) {
            if (this._morph.subMeshMorphs[i]) {
                subMeshMorphs.push(this._morph.subMeshMorphs[i]);
            }
        }

        for (let i = 0; i < this._morph.targetNames!.length; i++) {
            let targetNames = this._morph.targetNames![i].split('.');
            this._targetNames.push(targetNames[targetNames.length - 1]);
        }

        let nTargets = [];
        for (let i = 0; i < subMeshMorphs.length; i++) {
            let count = subMeshMorphs[i] && subMeshMorphs[i]!.targets.length > 0 ? subMeshMorphs[i]!.targets.length : 0;
            nTargets.push(count);
        }
        this._totalTargets = nTargets;

        for (let i = 0; i < nTargets.length; i++) {
            let nArray = new NumberArray(nTargets[i]);
            this.weightsControl.push(nArray);
        }

        if (EDITOR) {
            cce.Node.emit('change', this.node);
            // @ts-ignore
            Editor.Message.broadcast('scene:change-node', this.node.uuid);
        }

        if (!EDITOR) {
            this.initUI();
        }
    }

    public initUI() {
        let iCount = 0;
        for (let i = 0; i < this._totalTargets.length; i++) {
            if (this._totalTargets[i] > 0) {
                let controlMask = instantiate(this.controlMaskPrfb);
                controlMask.parent = this.itemLayout.node;
                let nameLabel = find('Name', controlMask)?.getComponent(Label);
                if (nameLabel){
                    nameLabel.string = `SubMesh${iCount}`;
                    iCount ++;
                }
            }

            for (let j = 0; j < this._totalTargets[i]; j++) {
                let controllItem = instantiate(this.controlItemPrfb);
                controllItem.parent = this.itemLayout.node;
                let nameLabel = find('Name', controllItem)?.getComponent(Label);
                if (nameLabel){
                    if (this._targetNames[j]) {
                        nameLabel.string = this._targetNames[j];
                    } else {
                        nameLabel.string = '' + j;
                    }
                }

                let slider = find('Slider', controllItem)?.getComponent(Slider);
                let sliderEventHandler = new EventHandler();
                sliderEventHandler.target = this.node;
                sliderEventHandler.handler = "onSliderChanged";
                sliderEventHandler.component = "MorphController";
                let customEventData = `${i},${j}`;
                sliderEventHandler.customEventData = customEventData;
                slider?.slideEvents.push(sliderEventHandler);
            }
            
        }
        this.itemLayout.getComponent(Layout)?.updateLayout();
    }

    public onSliderChanged(target: Slider, customEventData: any) {
        let customEventDatas = customEventData.split(',');
        let x = Number.parseInt(customEventDatas[0]);
        let y = Number.parseInt(customEventDatas[1]);
        this.weightsControl[x].array[y] = target.progress;
        this.weightsControl = this.weightsControl;
    }
}
