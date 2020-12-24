import { _decorator, Component, Label, renderer, director } from "cc";
const { ccclass } = _decorator;

interface CullingState {
    model: renderer.scene.Model;
    visible: boolean;
}

@ccclass("CullingTestInfo")
export class CullingTestInfo extends Component {

    private _label: Label = null!;
    private _states: CullingState[] = [];
    private _oldFns: any[] = [];

    start () {
        const models = director.getScene()!.renderScene!.models;
        for (let i = 0; i < models.length; i++) {
            const model = models[i];
            const oldFn = this._oldFns[i] = model.updateUBOs.bind(model);
            model.updateUBOs = (...args: any[]) => {
                this._states[i].visible = true;
                return oldFn(args.length > 0 ? args[0] : 0);
            }
            this._states.push({ model, visible: false });
        }
        this._label = this.node.getComponent(Label)!;
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

    onDestroy () {
        for (let i = 0; i < this._states.length; i++) {
            const model = this._states[i].model;
            model.updateUBOs = this._oldFns[i];
        }
    }
}
