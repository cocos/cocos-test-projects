import { _decorator, Component, Node, ModelComponent, director, Color } from 'cc';
const { ccclass, property } = _decorator;

const _color = new Color();
const _data = new Float32Array(4);

@ccclass('instancedColor')
export class instancedColor extends Component {

    private _models: ModelComponent[] = [];

    start () {
        this._models = this.node.getComponentsInChildren(ModelComponent);
    }

    update (deltaTime: number) {
        const models = this._models;
        const len = models.length;
        for (let i = 0; i < len; i++) {
            const model = models[i];
            Color.toArray(_data, _color.fromHSV((model.node.position.y + 1) * 0.5, 0.5, 1));
            model.setInstancedAttribute('a_color_instanced', _data);
        }
    }
}
