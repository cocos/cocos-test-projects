import { _decorator, Color, Component, MeshRenderer } from 'cc';
const { ccclass } = _decorator;

const _color = new Color();
const _data = new Float32Array(4);

@ccclass('InstancedColor')
export class InstancedColor extends Component {

    private _models: MeshRenderer[] = [];

    public start () {
        this._models = this.node.getComponentsInChildren(MeshRenderer);
    }

    public update (deltaTime: number) {
        const models = this._models;
        const len = models.length;
        for (let i = 0; i < len; i++) {
            const model = models[i];
            Color.toArray(_data, _color.fromHSV((model.node.position.y + 1) * 0.5, 0.5, 1));
            model.setInstancedAttribute('a_color_instanced', _data);
        }
    }
}
