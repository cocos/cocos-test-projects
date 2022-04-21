
import { _decorator, Component, Node, Color, Texture2D, Label, Material, ImageAsset, macro } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('setMipRange_quad')
export class setMipRange_quad extends Component {
    @property({
        type: ImageAsset
    })
    mipMaps: ImageAsset[] = [];

    @property({
        type: Material
    })
    mat: Material | null = null;

    textureUsed: Texture2D | null = null;

    ready = false;

    start () {
        this.textureUsed = new Texture2D();

        this.textureUsed.mipmaps = this.mipMaps;
        this.textureUsed.setMipFilter(2);

        this.schedule(() => {
            this.textureUsed!.setMipRange(0, this.mipMaps.length);
            this.mat!.setProperty('albedoMap', this.textureUsed);
        }, 6, macro.REPEAT_FOREVER, 1.5);

        this.schedule(() => {
            this.textureUsed!.setMipRange(1, this.mipMaps.length);
            this.mat!.setProperty('albedoMap', this.textureUsed);
        }, 6, macro.REPEAT_FOREVER, 4.5);

        this.ready = true;
    }
}
