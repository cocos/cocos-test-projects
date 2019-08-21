import { _decorator, Component, LabelComponent, renderer } from "cc";
const { ccclass } = _decorator;

interface CullingState {
    model: renderer.Model;
    visible: boolean;
}

@ccclass("CullingTestInfo")
export class CullingTestInfo extends Component {

    private _label: LabelComponent = null;
    private _states: CullingState[] = [];

    start () {
        const models = cc.director.getScene().renderScene.models;
        for (let i = 0; i < models.length; i++) {
            const model = models[i];
            const oldFn = model.updateUBOs.bind(model);
            model.updateUBOs = (...args: any) => {
                this._states[i].visible = true;
                return oldFn(...args);
            }
            this._states.push({ model, visible: false });
        }
        this._label = this.node.getComponent(LabelComponent);
    }

    update () {
        let info = '';
        for (let i = 0; i < this._states.length; i++) {
            const state = this._states[i];
            if (state.visible) {
                info += state.model.node.name + '\n';
                state.visible = false;
            }
        }
        this._label.string = info;
    }
}
