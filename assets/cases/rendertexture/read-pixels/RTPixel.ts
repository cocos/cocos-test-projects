
import { _decorator, Component, Node, RenderTexture, Texture2D, SpriteFrame, Sprite } from 'cc';
import { RTCapture } from './RTCapture';
const { ccclass, property, menu } = _decorator;

/**
 * Predefined variables
 * Name = RTPixel
 * DateTime = Mon Sep 06 2021 11:31:06 GMT+0800 (中国标准时间)
 * Author = zhakesi
 * FileBasename = RTPixel.ts
 * FileBasenameNoExtension = RTPixel
 * URL = db://assets/RTPixel.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('RTPixel')
@menu('RenderTexture/RTPixel')
export class RTPixel extends Component {
    @property(Sprite)
    sprite: Sprite = null;

    private dstTexture: Texture2D;
    private sp : SpriteFrame;

    start () {
        const spriteframe = this.sprite.spriteFrame;
        this.sp = new SpriteFrame();
        this.sp.reset({
            originalSize: spriteframe.getOriginalSize(),
            rect: spriteframe.getRect(),
            offset: spriteframe.getOffset(),
            isRotate: spriteframe.isRotated(),
            borderTop: spriteframe.insetTop,
            borderLeft: spriteframe.insetLeft,
            borderBottom: spriteframe.insetBottom,
            borderRight: spriteframe.insetRight,
        });
        this.dstTexture = new Texture2D();
        this.dstTexture.reset({
            width: 256,
            height: 256,
            format: Texture2D.PixelFormat.RGBA8888,
            mipmapLevel: 0
        });
    }

    update (deltaTime: number) {
        let src = RTCapture._renderTex;
        if (src) {
            let pbuffer = src.readPixels();
            this.dstTexture.uploadData(pbuffer);
        }
        this.sp.texture = this.dstTexture;
        this.sprite.spriteFrame = this.sp;
        this.sprite.updateMaterial();
    }
    onDestroy () {
        if (this.dstTexture) {
            this.dstTexture.destroy();
            this.dstTexture = null;
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
