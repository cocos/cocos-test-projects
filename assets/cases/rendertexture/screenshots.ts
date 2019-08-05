import { _decorator, Component, Node, RenderTexture, SpriteComponent, ImageAsset, SpriteFrame } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("ScreenShots")
@menu('RenderTexture/ScreenShots')
export class ScreenShots extends Component {
    @property(RenderTexture)
    renderTex: RenderTexture = null;
    @property(SpriteComponent)
    sprite: SpriteComponent = null

    _canvas: HTMLCanvasElement = null;
    _ctx: CanvasRenderingContext2D = null;

    start () {
        // Your initialization goes here.
        this.scheduleOnce(() => {
            this.createSprite();
            const img = this.initImage();
            this.showSprite(img);
        }, 1);
    }

    initImage() {
        // return the type and dataUrl
        var dataURL = this._canvas.toDataURL("image/png");
        var img = document.createElement("img");
        img.src = dataURL;
        return img;
    }

    createSprite() {
        let width = this.renderTex.width;
        let height = this.renderTex.height;
        if (!this._canvas) {
            this._canvas = document.createElement('canvas');
            this._ctx = this._canvas.getContext('2d');

            this._canvas.width = width;
            this._canvas.height = height;
        }

        let ctx = this._ctx;
        let data = this.renderTex.readPixels();
        // write the render data
        let rowBytes = width * 4;
        for (let row = 0; row < height; row++) {
            let srow = height - 1 - row;
            let imageData = ctx.createImageData(width, 1);
            let start = srow * width * 4;
            for (let i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }

            ctx.putImageData(imageData, 0, row);
        }
    }

    showSprite(img: HTMLImageElement) {
        const imageAsset = new ImageAsset(this._canvas);
        const spriteframe = SpriteFrame.create({
            image: imageAsset,
        });

        this.sprite.spriteFrame = spriteframe;
    }
}
