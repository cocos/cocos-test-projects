import { _decorator, Component, Texture2D, TextureCube, Material, Color, gfx, director, math, ImageAsset, macro } from 'cc';
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

 interface ITextureCubeMipmap {
    front: ImageAsset;
    back: ImageAsset;
    left: ImageAsset;
    right: ImageAsset;
    top: ImageAsset;
    bottom: ImageAsset;
}

@ccclass('setMipRange_cubemap')
export class setMipRange_cubemap extends Component {

    @property(ImageAsset)
    mipmaps: ImageAsset[] = [];

    @property(Material)
    cubeMat: Material | null = null;

    cubeTexture: TextureCube = null!;

    ready = false;

    start () {
        const mipCount = this.mipmaps.length;

        this.cubeTexture = new TextureCube();

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
        this.cubeTexture!.setMipRange(0, mipCount);
        this.cubeMat!.setProperty('cubeMap', this.cubeTexture);

        this.schedule(() => {
            this.cubeTexture!.setMipRange(0, mipCount);
            this.cubeMat!.setProperty('cubeMap', this.cubeTexture);
        }, 6, macro.REPEAT_FOREVER, 0);

        this.schedule(() => {
            this.cubeTexture!.setMipRange(1, mipCount);
            this.cubeMat!.setProperty('cubeMap', this.cubeTexture);
        }, 6, macro.REPEAT_FOREVER, 3);
        this.ready = true;
    }
}
