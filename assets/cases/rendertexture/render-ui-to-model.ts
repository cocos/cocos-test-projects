import { _decorator, Component, Node, ModelComponent, CanvasComponent, RenderTexture } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("RenderUIToModel")
@menu('RenderTexture/RenderUIToModel')
export class RenderUIToModel extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(ModelComponent)
    model: ModelComponent = null;

    start () {
        const canvas = this.getComponent(CanvasComponent);
        const tex = new RenderTexture();
        const size = cc.view.getVisibleSize();
        tex.reset({
            width: size.width,
            height: size.height,
            colorFormat: RenderTexture.PixelFormat.RGBA8888,
            depthStencilFormat: RenderTexture.DepthStencilFormat.NONE,
        });

        canvas.targetTexture = tex;
        const mat = this.model.material;
        mat.setProperty('mainTexture', tex);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
