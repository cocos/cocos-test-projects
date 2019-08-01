import { _decorator, Node } from "cc";
import { ScreenShots } from "./screenshots";
const { ccclass, property, menu } = _decorator;

@ccclass("CaptureToWX")
@menu('RenderTexture/CaptureToWX')
export class CaptureToWX extends ScreenShots {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // create the capture
        this.scheduleOnce(() => {
            this.createSprite();
            this.initImage();
            this.saveFile(this._canvas);
        }, 1);
    }

    saveFile(tempCanvas: HTMLCanvasElement) {
        // This is one of the ways that could save the img to your local.
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            let self = this;
            let data = {
                x: 0,
                y: 0,
                width: tempCanvas.width,
                height: tempCanvas.height,
                // destination file sizes
                destWidth: tempCanvas.width,
                destHeight: tempCanvas.height,
                fileType: 'png',
                quality: 1
            }
            // https://developers.weixin.qq.com/minigame/dev/api/render/canvas/Canvas.toTempFilePathSync.html
            // @ts-ignore
            let _tempFilePath = tempCanvas.toTempFilePathSync(data);
            cc.log(`Capture file success!${_tempFilePath}`);
            // https://developers.weixin.qq.com/minigame/dev/api/media/image/wx.previewImage.html
            // @ts-ignore
            wx.previewImage({
                urls: [_tempFilePath],
                success: (res) => {
                    cc.log('Preview image success.');
                }
            });
        }
    }
}
