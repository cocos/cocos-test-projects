import { _decorator, Component, Node, Texture2D, ImageAsset, Material, Color, gfx, director, math } from 'cc';
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

@ccclass('cubemap')
export class cubemap extends Component {

    @property(Material)
    mat: Material | null = null;

    texture: Texture2D = null!;

    ready = false;

    start () {

        const front : Color = new Color(255, 255, 255, 255);
        const back : Color = new Color(0, 0, 0, 255);
        const left : Color = new Color(0, 255, 255, 255);
        const right : Color = new Color(255, 0, 0, 255);
        const top : Color = new Color(255, 255, 0, 255);
        const bottom : Color = new Color(0, 0, 255, 255);

        let width = 512;
        let height = 512;

        const mipLevel = math.bits.log2(math.bits.min(width, height));
        const buffers : Uint8Array[] = [];

        let bufferSize = 0;
        let imgSize = 0;
        let stride = 0;
        let pos = 0;
        let offset = 0;
        let blockOffset = 0;

        const fullRegion = new  gfx.BufferTextureCopy();

        this.texture = new Texture2D();
        this.texture.reset({
            width: width * 3,
            height: height * 2,
            format: Texture2D.PixelFormat.RGBA8888,
            mipmapLevel: mipLevel,
        });

        for (let i = 0; i < mipLevel; i++) {

            imgSize = width * height * 6;
            bufferSize = imgSize * 4;
            buffers.push(new Uint8Array(bufferSize));
            stride = width * 3;
            blockOffset = width * height * 3;

            for (let k = 0; k < height; k++) {
                for (let j = 0; j < width; j++) {
                    pos = j * 4;

                    offset = stride * k + width * 0;
                    toArray(buffers[i], front, pos + offset * 4);
                    offset = stride * k + width * 1;
                    toArray(buffers[i], back, pos + offset * 4);
                    offset = stride * k + width * 2;
                    toArray(buffers[i], left, pos + offset * 4);

                    offset = blockOffset + stride * k + width * 0;
                    toArray(buffers[i], right, pos + offset * 4);
                    offset = blockOffset + stride * k + width * 1;
                    toArray(buffers[i], top, pos + offset * 4);
                    offset = blockOffset + stride * k + width * 2;
                    toArray(buffers[i], bottom, pos + offset * 4);
                }
            }

            fullRegion.buffOffset = (blockOffset + width) * 4;

            fullRegion.buffStride = stride;
            fullRegion.buffTexHeight = height * 2;

            fullRegion.texOffset.x = width;
            fullRegion.texOffset.y = height;
            fullRegion.texExtent.width = width * 2;
            fullRegion.texExtent.height = height * 1;

            fullRegion.texSubres.mipLevel = i;

            director.root!.device.copyBuffersToTexture([buffers[i]], this.texture.getGFXTexture()!, [fullRegion]);

            width = width >> 1;
            height = height >> 1;
        }

        this.scheduleOnce(() => {
            this.mat!.setProperty('albedoMap', this.texture);
            this.ready = true;
        }, 1);
    }
}
