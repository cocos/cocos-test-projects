import { _decorator, Component, Node, Texture2D, ImageAsset, Material, TextureCube, Color, director, math, gfx} from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = NewComponent
 * DateTime = Wed Nov 03 2021 17:08:13 GMT+0800 (中国标准时间)
 * Author = undefined
 * FileBasename = NewComponent.ts
 * FileBasenameNoExtension = NewComponent
 * URL = db://assets/cases/terrain/NewComponent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

function toArray (out: Uint8Array, v: Color, ofs = 0) {
    out[ofs + 0] = v.r;
    out[ofs + 1] = v.g;
    out[ofs + 2] = v.b;
    out[ofs + 3] = v.a;
    return out;
}

@ccclass('complexScript')
export class complexScript extends Component {

    @property({slide: true, range: [0, 1024] })
    width: number = 512;
    @property({slide: true, range: [0, 1024] })
    height: number = 512;

    buffers: Uint8Array[] = [];

    textureCube: TextureCube | null = null;
    mipLevel : number = 1;

    start () {
        this.mipLevel = 1; //math.bits.log2(math.bits.min(this.width, this.height));

        const front : Color = new Color(255, 255, 255, 255);
        const back : Color = new Color(0, 0, 0, 255);
        const left : Color = new Color(0, 255, 255, 255);
        const right : Color = new Color(255, 0, 0, 255);
        const top : Color = new Color(255, 255, 0, 255);
        const bottom : Color = new Color(0, 0, 255, 255);

        let w = 0; let h = 0;

        this.textureCube = new TextureCube();

        const bufferViews: Uint8Array[] = [];
        const regions: gfx.BufferTextureCopy[] = [];
        const fullRegion = new gfx.BufferTextureCopy();

        this.textureCube.reset({
            width: this.width,
            height: this.height,
            format: Texture2D.PixelFormat.RGBA8888,
            mipmapLevel: this.mipLevel,
        });

        for (let i = 0; i < this.mipLevel; i++) {
            w = this.width >> i;
            h = this.height >> i;

            const imgSize = w * h;
            const bufferSize = imgSize * 4;

            this.buffers[i] = new Uint8Array(bufferSize * 6);

            bufferViews.push(new Uint8Array(this.buffers[i].buffer, 0 * bufferSize, bufferSize));
            bufferViews.push(new Uint8Array(this.buffers[i].buffer, 1 * bufferSize, bufferSize));
            bufferViews.push(new Uint8Array(this.buffers[i].buffer, 2 * bufferSize, bufferSize));
            bufferViews.push(new Uint8Array(this.buffers[i].buffer, 3 * bufferSize, bufferSize));
            bufferViews.push(new Uint8Array(this.buffers[i].buffer, 4 * bufferSize, bufferSize));
            bufferViews.push(new Uint8Array(this.buffers[i].buffer, 5 * bufferSize, bufferSize));

            const region = new gfx.BufferTextureCopy();
            region.texExtent.width = w;
            region.texExtent.height = h;
            region.texSubres.mipLevel = 0;
            region.texSubres.baseArrayLayer = 0;
            region.texSubres.layerCount = 6;

            regions.push(region);

            for (let j = 0; j < imgSize; j++) {
                // toArray(bufferViews[i * 6], front, j * 4);
                // toArray(bufferViews[i * 6 + 1], back, j * 4);

                // toArray(bufferViews[i * 6 + 2], left, j * 4);
                // toArray(bufferViews[i * 6 + 3], right, j * 4);

                // toArray(bufferViews[i * 6 + 4], top, j * 4);
                // toArray(bufferViews[i * 6 + 5], bottom, j * 4);

                toArray(this.buffers[i], front, bufferSize * 0 + j * 4);
                toArray(this.buffers[i], back, bufferSize * 1 + j * 4);

                toArray(this.buffers[i], left, bufferSize * 2 + j * 4);
                toArray(this.buffers[i], right, bufferSize * 3 + j * 4);

                toArray(this.buffers[i], top, bufferSize * 4 + j * 4);
                toArray(this.buffers[i], bottom, bufferSize * 5 + j * 4);
            }
        }

        director.root!.device.copyBuffersToTexture(bufferViews, this.textureCube.getGFXTexture()!, regions);

        this.scheduleOnce(() => {
            director.getScene()!.globals.skybox.envmap = this.textureCube;
        }, 1);
    }
}
