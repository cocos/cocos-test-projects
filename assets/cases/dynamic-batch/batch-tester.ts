import { _decorator, Component, Node, Prefab, instantiate, director, SliderComponent, LabelComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BatchTester")
export class BatchTester extends Component {
    @property(Prefab)
    prefab = null;
    @property(LabelComponent)
    label = null;
    @property(SliderComponent)
    slider = null;

    @property
    count = 15;
    @property
    xinterval = 6;
    @property
    zinterval = 3;
    @property
    hoverSpeed = 0.01;
    @property
    maxCount = 50;

    _nodes: Node[] = [];
    _delays: number[] = [];

    start () {
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < 10; j++) {
                this._createBatch(i, j);
            }
        }
        this.label.string = 'Boxes: ' + this.count * 100;
        this.slider.progress = this.count / this.maxCount;
    }

    update () {
        const t = director.getCurrentTime();
        for (let i = 0; i < this._nodes.length; i++) {
            const node = this._nodes[i];
            const delay = this._delays[i];
            const position = node.position;
            const y = Math.sin(delay + t * this.hoverSpeed);
            node.setPosition(position.x, y, position.z);
        }
    }

    setCount (e: SliderComponent) {
        const count = Math.floor(e.progress * this.maxCount);
        if (count > this.count) {
            for (let i = this.count; i < count; i++) {
                for (let j = 0; j < 10; j++) {
                    this._createBatch(i, j);
                }
            }
        } else {
            for (let i = count; i < this.count; i++) {
                for (let j = 0; j < 10; j++) {
                    const idx = count * 100;
                    this._nodes.splice(idx, 10)[0].parent.setParent(null);
                    this._delays.splice(idx, 10);
                }
            }
        }
        this.count = count;
        this.label.string = 'Boxes: ' + this.count * 100;
    }

    _createBatch (i: number, j: number) {
        const node = instantiate(this.prefab) as Node;
        node.setPosition(j * this.xinterval, 0, i * this.zinterval);
        node.name = '' + (i * 10 + j) * 10;
        node.setParent(this.node.parent as Node);
        Array.prototype.push.apply(this._nodes, node.children);
        Array.prototype.push.apply(this._delays, node.children.map(() => Math.random() * Math.PI * 2));
    }
}
