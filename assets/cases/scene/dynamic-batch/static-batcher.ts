import { _decorator, Component, director, instantiate, Label, Node, Prefab, Slider, BatchingUtility, Toggle, game, Director, Button, profiler, random } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StaticBatcher')
export class StaticBatcher extends Component {
    @property(Prefab)
    public prefab: Prefab = null!;
    @property(Label)
    public label: Label = null!;
    @property(Node)
    public static_box: Node = null!;
    @property(Node)
    public root: Node = null!;
    @property(Label)
    public profile: Label = null!;

    @property
    public count = 5;
    @property
    public xinterval = 6;
    @property
    public zinterval = 3;
    @property
    public hoverSpeed = 0.01;
    @property
    public maxCount = 10;

    public _nodes: Node[] = [];
    public _delays: number[] = [];
    private _batchState = false;
    private _recoveryProfiler = false;

    public onLoad(){
        this._recoveryProfiler = profiler.isShowingStats();
    }

    public start () {
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < 10; j++) {
                this._createBatch(i, j);
            }
        }
        if(this._batchState){
            this._changeBatchState(true);
        }

        this.label.string = 'Boxes: ' + this.count * 100;
        // this.slider.progress = this.count / this.maxCount;
    }

    public onEnable(){
        if(!this._recoveryProfiler){
            profiler.showStats();
        }
    }

    public onDisable(){
        if(!this._recoveryProfiler){
            profiler.hideStats();
        }
    }

    public update () {
        // @ts-ignore
        let state = profiler._stats;
        if(!state){
            this.profile.string = `DrawCall: ${director.root?.device.numDrawCalls}`;
            return;
        }

        this.profile.string = `
        FPS: ${state.fps.counter.human()}
        DrawCall: ${director.root?.device.numDrawCalls}
        `;
    }

    public setCount (e: Button, state: string) {
        if(this._batchState && this.count > 0){
            this._changeBatchState(false);
        }

        const count = state === 'add' ? this.count + 1 > this.maxCount ? this.maxCount : this.count + 1 : this.count - 1 <= 0 ? 1 : this.count - 1;
        if (count > this.count) {
            for (let i = this.count; i < count; i++) {
                for (let j = 0; j < 10; j++) {
                    this._createBatch(i, j);
                }
            }
        } else {
            if(this._nodes.length > 0){
                for (let i = count; i < this.count; i++) {
                    for (let j = 0; j < 10; j++) {
                        const idx = count * 100;
                        this._nodes.splice(idx, 10)[0].parent?.setParent(null);
                        this._delays.splice(idx, 10);
                    }
                }
            }
        }
        this.count = count;
        this.label.string = 'Boxes: ' + this.count * 100;
        if(this._batchState && count > 0){
            this._changeBatchState(true);
        }
    }

    public _createBatch (i: number, j: number) {
        const node = instantiate(this.prefab) as Node;
        node.setPosition(j * this.xinterval, 0, i * this.zinterval);
        node.name = '' + (i * 10 + j) * 10;
        node.setParent(this.root as Node);
        Array.prototype.push.apply(this._nodes, node.children);
        Array.prototype.push.apply(this._delays, node.children.map(() => random() * Math.PI * 2));
    }

    public useBatch(t: Toggle){
        this._batchState = t.isChecked;
        this._changeBatchState(this._batchState);
    }

    private _changeBatchState(batch: boolean){
        if(batch){
            BatchingUtility.batchStaticModel(this.root, this.static_box);
        }else{
            BatchingUtility.unbatchStaticModel(this.root, this.static_box);
        }
    }
}