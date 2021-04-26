import { _decorator, Component, Node, Material, MeshRenderer, RenderTexture } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UseRenderTextureToModel')
export class UseRenderTextureToModel extends Component {

    @property(MeshRenderer)
    public quad: MeshRenderer = null!;
    @property(RenderTexture)
    public rtTexture: RenderTexture = null!;

    start () {
        // Your initialization goes here.
        this.scheduleOnce(() => {
            const material = this.quad.getMaterialInstance(0);
            if(!material){
                return;
            }
            const defines = { SAMPLE_FROM_RT: true, ...material.passes[0].defines };
            const renderMat = new Material();
            renderMat.initialize({
                effectAsset: material.effectAsset,
                defines,
            });
            this.quad.setMaterialInstance(0, renderMat);
            renderMat.setProperty('mainTexture', this.rtTexture, 0);
        }, 3);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
