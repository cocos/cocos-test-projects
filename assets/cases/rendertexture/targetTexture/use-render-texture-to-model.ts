import { _decorator, Component, Node, MeshRenderer, RenderTexture } from 'cc';
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

            this.quad.setMaterialInstance(0, material);
            material.setProperty('mainTexture', this.rtTexture, 0);
        }, 3);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
