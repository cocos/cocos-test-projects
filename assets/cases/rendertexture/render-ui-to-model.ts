import { _decorator, Component, ModelComponent, CanvasComponent, RenderTexture, view } from 'cc';
const { ccclass, property, menu } = _decorator;

@ccclass('RenderUIToModel')
@menu('RenderTexture/RenderUIToModel')
export class RenderUIToModel extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(ModelComponent)
    model: ModelComponent = null;

    renderTexture: RenderTexture = null;

    start () {
        const canvas = this.getComponent(CanvasComponent);
        const tex = new RenderTexture();
        tex.name = 'render-ui-to-model';
        const size = view.getVisibleSize();
        tex.reset({
            width: size.width,
            height: size.height,
        });

        this.renderTexture = tex;

        canvas.targetTexture = tex;
        const mat = this.model.material;
        mat.setProperty('mainTexture', tex);
    }

    onDestroy () {
        if(this.renderTexture){
            this.renderTexture.destroy();
        }
    }
}
