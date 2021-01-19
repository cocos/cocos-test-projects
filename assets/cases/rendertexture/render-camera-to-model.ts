import { _decorator, Component, RenderTexture, Camera, MeshRenderer } from 'cc';
const { ccclass, property, menu } = _decorator;

@ccclass('RenderCameraToModel')
@menu('RenderTexture/RenderCameraToModel')
export class RenderCameraToModel extends Component {

    @property(MeshRenderer)
    public model: MeshRenderer = null!;

    protected _renderTex: RenderTexture | null = null;

    start () {
        // Your initialization goes here.
        const renderTex = this._renderTex = new RenderTexture();
        renderTex.reset({
            width: 256,
            height: 256,
        });
        const cameraComp = this.getComponent(Camera)!;
        cameraComp.targetTexture = renderTex;
        const pass = this.model.material!.passes[0];
        const binding = pass.getBinding('mainTexture');
        pass.bindTexture(binding, renderTex.getGFXTexture()!);
    }

    onDestroy () {
        if (this._renderTex) {
            this._renderTex.destroy();
            this._renderTex = null;
        }        
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
