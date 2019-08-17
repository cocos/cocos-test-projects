import { _decorator, Component, Node, RenderTexture, CameraComponent, ModelComponent } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("RenderToModel")
@menu('UI/RenderToModel')
export class RenderToModel extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(ModelComponent)
    model: ModelComponent = null;

    start () {
        // Your initialization goes here.
        const renderTex = new RenderTexture({
            width: 256,
            height:256,
            colorFormat: RenderTexture.PixelFormat.RGBA8888,
            depthStencilFormat: RenderTexture.DepthStencilFormat.DEPTH_32_STENCIL_8,
        });
        const cameraComp = this.getComponent(CameraComponent);
        cameraComp.targetTexture = renderTex;
        const pass = this.model.material.passes[0];
        const binding = pass.getBinding('mainTexture');
        pass.bindTextureView(binding, renderTex.getGFXTextureView());
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
