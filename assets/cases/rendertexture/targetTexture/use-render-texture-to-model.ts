import { _decorator, Component, Node, ModelComponent, RenderTexture } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UseRenderTextureToModel')
export class UseRenderTextureToModel extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(ModelComponent) quad: ModelComponent = null;
    @property(RenderTexture) rtTexture: RenderTexture = null;

    start () {
        // Your initialization goes here.
        this.scheduleOnce(() => {
            const material = this.quad.getMaterialInstance(0);
            this.quad.setMaterialInstance(0, material);
            material.setProperty('mainTexture', this.rtTexture, 0);
        }, 3);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
