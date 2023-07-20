import { _decorator, Component, director, game, instantiate, Label, Node, Prefab, Slider } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BatchTester')
export class BatchTester extends Component {
    @property(Prefab)
    public prefab: Prefab = null!;
    @property(Label)
    public label: Label = null!;
    @property(Slider)
    public slider: Slider = null!;

    @property
    public count = 15;
    @property
    public xinterval = 6;
    @property
    public zinterval = 3;
    @property
    public hoverSpeed = 0.01;
    @property
    public maxCount = 50;

    public _nodes: Node[] = [];
    public _delays: number[] = [];
    public _startFrame = 0;

    public start () {
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < 10; j++) {
                this._createBatch(i, j);
            }
        }
        this.label.string = 'Boxes: ' + this.count * 100;
        this.slider.progress = this.count / this.maxCount;
        this._startFrame = director.getTotalFrames();
    }

    public update () {
        const t = Math.floor((director.getTotalFrames() - this._startFrame) * 16.7);
        for (let i = 0; i < this._nodes.length; i++) {
            const node = this._nodes[i];
            const delay = this._delays[i];
            const position = node.position;
            const y = Math.sin(delay + t * this.hoverSpeed);
            node.setPosition(position.x, y, position.z);
        }
    }

    public setCount (e: Slider) {
        const count = Math.floor(e.progress * this.maxCount);
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
    }

    public _createBatch (i: number, j: number) {
        const node = instantiate(this.prefab) as Node;
        node.setPosition(j * this.xinterval, 0, i * this.zinterval);
        node.name = '' + (i * 10 + j) * 10;
        node.setParent(this.node.parent as Node);
        Array.prototype.push.apply(this._nodes, node.children);
        Array.prototype.push.apply(this._delays, node.children.map(() => Math.random() * Math.PI * 2));
    }
}
