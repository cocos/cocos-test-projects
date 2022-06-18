import { _decorator, Component, director, gfx, Node, Color, Texture2D, Label, Material, ImageAsset, PixelFormat, assert} from 'cc';
const { ccclass, property } = _decorator;

function toArray (out: Uint8Array, v: Color, ofs = 0) {
    out[ofs + 0] = v.r;
    out[ofs + 1] = v.g;
    out[ofs + 2] = v.b;
    out[ofs + 3] = v.a;
    return out;
}


function getImageData(image : HTMLImageElement) {
    const ctx = Object.assign(document.createElement('canvas'), {
        width: image.width, 
        height: image.height,
    }).getContext('2d');
    ctx!.clearRect(0, 0, image.width, image.height);

    ctx!.drawImage(image, 0, 0);

    const rawData = ctx!.getImageData(0, 0, image.width, image.height);
    return rawData.data;
}

@ccclass('CompressedTexture')
export class CompressedTexture extends Component {

    @property({
        type: ImageAsset
    })
    image : ImageAsset | null = null;

    @property({
        type: Material
    })
    mat: Material[] = [];

    oriSize = 512;

    mipmaps : number[] = [0, 1, 8, 9];

    texture0 : Texture2D | null = null;
    texture1 : Texture2D | null = null;
    texture2 : Texture2D | null = null;
    texture3 : Texture2D | null = null;
    texture4 : Texture2D | null = null;
    texture5 : Texture2D | null = null;
    texture6 : Texture2D | null = null;
    texture7 : Texture2D | null = null;

    start() {
        const gfxDevice = director.root!.device;
        if (!gfxDevice) {
            return;
        }

        if (!this.image) {
            return;
        }

        this.createTextures();

        let data = this.image.data;
        this.copyBuffersToTextures(data!);

        this.mat[0].setProperty('albedoMap', this.texture0);
        this.mat[1].setProperty('albedoMap', this.texture1);
        this.mat[2].setProperty('albedoMap', this.texture2);
        this.mat[3].setProperty('albedoMap', this.texture3);
        this.mat[4].setProperty('albedoMap', this.texture4);
        this.mat[5].setProperty('albedoMap', this.texture5);
        this.mat[6].setProperty('albedoMap', this.texture6);
        this.mat[7].setProperty('albedoMap', this.texture7);

    }


    copyBuffersToTextures(buffer: HTMLCanvasElement | HTMLImageElement | ArrayBufferView | ImageBitmap) {
        const format = this.texture0!.getGFXTexture()!.format;

        let copyRegion0 : gfx.BufferTextureCopy = new gfx.BufferTextureCopy();
        let copyRegion1 : gfx.BufferTextureCopy = new gfx.BufferTextureCopy();
        let copyRegion2 : gfx.BufferTextureCopy = new gfx.BufferTextureCopy();
        let copyRegion3 : gfx.BufferTextureCopy = new gfx.BufferTextureCopy();
        let copyRegion4 : gfx.BufferTextureCopy = new gfx.BufferTextureCopy();
        let copyRegion5 : gfx.BufferTextureCopy = new gfx.BufferTextureCopy();
        let copyRegion6 : gfx.BufferTextureCopy = new gfx.BufferTextureCopy();
        let copyRegion7 : gfx.BufferTextureCopy = new gfx.BufferTextureCopy();

        let offset = 0;
        // 512 256 128 64 32 16 8 4 2 1
        // 0   1   2   3  4  5  6 7 8 9

        copyRegion0.buffOffset = offset;
        copyRegion0.buffStride = 768;
        copyRegion0.buffTexHeight = 512;
        copyRegion0.texExtent = new gfx.Extent(512, 512, 1);
        copyRegion0.texOffset = new gfx.Offset(0, 0, 0);
        copyRegion0.texSubres = new gfx.TextureSubresLayers(0, 0, 1);

        offset += gfx.FormatSize(format, 512, 1, 1);
        copyRegion1.buffOffset = offset;
        copyRegion1.buffStride = 768;
        copyRegion1.buffTexHeight = 512;
        copyRegion1.texExtent = new gfx.Extent(256, 256, 1);
        copyRegion1.texOffset = new gfx.Offset(0, 0, 0);
        copyRegion1.texSubres = new gfx.TextureSubresLayers(0, 0, 1);

        copyRegion2.buffOffset = offset;
        copyRegion2.buffStride = 768;
        copyRegion2.buffTexHeight = 512;
        copyRegion2.texExtent = new gfx.Extent(200, 200, 1);
        copyRegion2.texOffset = new gfx.Offset(0, 0, 0);
        copyRegion2.texSubres = new gfx.TextureSubresLayers(0, 0, 1);

        offset += gfx.FormatSize(format, 768, 256 + 128 + 64 + 32, 1);
        copyRegion3.buffOffset = offset;
        copyRegion3.buffStride = 768;
        copyRegion3.buffTexHeight = 512;
        copyRegion3.texExtent = new gfx.Extent(16, 16, 1);
        copyRegion3.texOffset = new gfx.Offset(0, 0, 0);
        copyRegion3.texSubres = new gfx.TextureSubresLayers(0, 0, 1);

        offset = 0;
        copyRegion4.buffOffset = offset;
        copyRegion4.buffStride = 768;
        copyRegion4.buffTexHeight = 512;
        copyRegion4.texExtent = new gfx.Extent(2, 2, 1);
        copyRegion4.texOffset = new gfx.Offset(0, 0, 0);
        copyRegion4.texSubres = new gfx.TextureSubresLayers(0, 0, 1);

        offset = 0;
        copyRegion5.buffOffset = offset;
        copyRegion5.buffStride = 768;
        copyRegion5.buffTexHeight = 512;
        copyRegion5.texExtent = new gfx.Extent(1, 1, 1);
        copyRegion5.texOffset = new gfx.Offset(0, 0, 0);
        copyRegion5.texSubres = new gfx.TextureSubresLayers(0, 0, 1);

        offset = gfx.FormatSize(format, 768, 256, 1);
        copyRegion6.buffOffset = offset;
        copyRegion6.buffStride = 768;
        copyRegion6.buffTexHeight = 612;
        copyRegion6.texExtent = new gfx.Extent(210, 1, 1);
        copyRegion6.texOffset = new gfx.Offset(0, 0, 0);
        copyRegion6.texSubres = new gfx.TextureSubresLayers(0, 0, 1);

        offset = gfx.FormatSize(format, 768, 256, 1);
        copyRegion7.buffOffset = offset;
        copyRegion7.buffStride = 768;
        copyRegion7.buffTexHeight = 512;
        copyRegion7.texExtent = new gfx.Extent(1, 127, 1);
        copyRegion7.texOffset = new gfx.Offset(0, 0, 0);
        copyRegion7.texSubres = new gfx.TextureSubresLayers(0, 0, 1);

        if (ArrayBuffer.isView(buffer)) {
            const data = buffer;
            director.root?.device.copyBuffersToTexture([data], this.texture0!.getGFXTexture()!, [copyRegion0]);
            director.root?.device.copyBuffersToTexture([data], this.texture1!.getGFXTexture()!, [copyRegion1]);
            director.root?.device.copyBuffersToTexture([data], this.texture2!.getGFXTexture()!, [copyRegion2]);
            director.root?.device.copyBuffersToTexture([data], this.texture3!.getGFXTexture()!, [copyRegion3]);
            director.root?.device.copyBuffersToTexture([data], this.texture4!.getGFXTexture()!, [copyRegion4]);
            director.root?.device.copyBuffersToTexture([data], this.texture5!.getGFXTexture()!, [copyRegion5]);
            director.root?.device.copyBuffersToTexture([data], this.texture6!.getGFXTexture()!, [copyRegion6]);
            director.root?.device.copyBuffersToTexture([data], this.texture7!.getGFXTexture()!, [copyRegion7]);
        } else if (buffer instanceof HTMLImageElement) {
            if (director.root?.device.gfxAPI! < gfx.API.WEBGL) {
                const data = buffer;
                director.root?.device.copyTexImagesToTexture([data], this.texture0!.getGFXTexture()!, [copyRegion0]);
                director.root?.device.copyTexImagesToTexture([data], this.texture1!.getGFXTexture()!, [copyRegion1]);
                director.root?.device.copyTexImagesToTexture([data], this.texture2!.getGFXTexture()!, [copyRegion2]);
                director.root?.device.copyTexImagesToTexture([data], this.texture3!.getGFXTexture()!, [copyRegion3]);
                director.root?.device.copyTexImagesToTexture([data], this.texture4!.getGFXTexture()!, [copyRegion4]);
                director.root?.device.copyTexImagesToTexture([data], this.texture5!.getGFXTexture()!, [copyRegion5]);
                director.root?.device.copyTexImagesToTexture([data], this.texture6!.getGFXTexture()!, [copyRegion6]);
                director.root?.device.copyTexImagesToTexture([data], this.texture7!.getGFXTexture()!, [copyRegion7]);
            } else {
                const data = getImageData(buffer);
                director.root?.device.copyBuffersToTexture([data], this.texture0!.getGFXTexture()!, [copyRegion0]);
                director.root?.device.copyBuffersToTexture([data], this.texture1!.getGFXTexture()!, [copyRegion1]);
                director.root?.device.copyBuffersToTexture([data], this.texture2!.getGFXTexture()!, [copyRegion2]);
                director.root?.device.copyBuffersToTexture([data], this.texture3!.getGFXTexture()!, [copyRegion3]);
                director.root?.device.copyBuffersToTexture([data], this.texture4!.getGFXTexture()!, [copyRegion4]);
                director.root?.device.copyBuffersToTexture([data], this.texture5!.getGFXTexture()!, [copyRegion5]);
                director.root?.device.copyBuffersToTexture([data], this.texture6!.getGFXTexture()!, [copyRegion6]);
                director.root?.device.copyBuffersToTexture([data], this.texture7!.getGFXTexture()!, [copyRegion7]);
            }
        } else {
            assert(false);
        }
    }

    createTextures() {
            this.texture0 = new Texture2D();
            this.texture0.reset({
                width: 512,
                height: 512,
                format: this.image!.format,
                mipmapLevel: 1,
            });
    
            this.texture1 = new Texture2D();
            this.texture1.reset({
                width: 256,
                height: 256,
                format: this.image!.format,
                mipmapLevel: 1,
            });
    
            this.texture2 = new Texture2D();
            this.texture2.reset({
                width: 200,
                height: 200,
                format: this.image!.format,
                mipmapLevel: 1,
            });
    
            this.texture3 = new Texture2D();
            this.texture3.reset({
                width: 16,
                height: 16,
                format: this.image!.format,
                mipmapLevel: 1,
            });

            this.texture4 = new Texture2D();
            this.texture4.reset({
                width: 2,
                height: 2,
                format: this.image!.format,
                mipmapLevel: 1,
            });

            this.texture5 = new Texture2D();
            this.texture5.reset({
                width: 1,
                height: 1,
                format: this.image!.format,
                mipmapLevel: 1,
            });

            this.texture6 = new Texture2D();
            this.texture6.reset({
                width: 210,
                height: 1,
                format: this.image!.format,
                mipmapLevel: 1,
            });

            this.texture7 = new Texture2D();
            this.texture7.reset({
                width: 1,
                height: 127,
                format: this.image!.format,
                mipmapLevel: 1,
            });
    }
}


