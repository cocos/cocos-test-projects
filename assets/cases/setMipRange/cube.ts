import { _decorator, Component, Texture2D, TextureCube, Material, Color, gfx, director, math, ImageAsset, macro } from 'cc';
const { ccclass, property } = _decorator;

 interface ITextureCubeMipmap {
    front: ImageAsset;
    back: ImageAsset;
    left: ImageAsset;
    right: ImageAsset;
    top: ImageAsset;
    bottom: ImageAsset;
}

@ccclass('cubeMap')
export class cubeMap extends Component {

    @property(ImageAsset)
    mipmaps: ImageAsset[] = [];

    @property(Material)
    cubeMat: Material | null = null;

    cubeTexture: TextureCube = null!;

    ready = false;

    start () {
        const mipCount = this.mipmaps.length;

        this.cubeTexture = new TextureCube();

        this.cubeTexture.reset({
            width: this.mipmaps[0].width,
            height: this.mipmaps[0].height,
            format: Texture2D.PixelFormat.RGBA8888,
            mipmapLevel: mipCount,
        });

        let images: ITextureCubeMipmap[] = [];
        for (let i = 0; i < mipCount; i++) {
            images.push({
                front : this.mipmaps[i],
                back : this.mipmaps[i],
                left : this.mipmaps[i],
                right : this.mipmaps[i],
                top : this.mipmaps[i],
                bottom : this.mipmaps[i],
            });
        }

        this.cubeTexture.mipmaps = images;
        this.cubeTexture.setMipFilter(2);

        this.schedule(() => {
            this.cubeTexture!.setMipRange(0, mipCount);
            this.cubeMat!.setProperty('cubeMap', this.cubeTexture);
        }, 6, macro.REPEAT_FOREVER, 1.5);

        this.schedule(() => {
            this.cubeTexture!.setMipRange(1, mipCount);
            this.cubeMat!.setProperty('cubeMap', this.cubeTexture);
        }, 6, macro.REPEAT_FOREVER, 4.5);
        this.ready = true;
    }
}
