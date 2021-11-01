
import { _decorator, Component, Node, Color, Texture2D, Label, Material, ImageAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MipmapCheck')
export class MipmapCheck extends Component {
    @property({
        type: ImageAsset
    })
    mipMaps: ImageAsset[] = [];

    @property({
        type: Material
    })
    mat: Material | null = null;

    @property({
        type: Node
    })
    cameraNode: Node | null = null;

    @property({
        type: Label
    })
    showTip: Label | null = null;

    @property
    cameraSpeed = 2;

    yMin = 15;
    yMax = 200;
    currY = this.yMin;
    moveCount = 0;

    memeryBefore = 0;
    memeryAfter = 0;

    textureUsed: Texture2D | null = null;

    allDone = false;
    ready = false;

    start () {
        this.scheduleOnce(() => {
            this.memeryBefore = cc.director.root.device.memoryStatus.textureSize;
            this.textureUsed = new Texture2D();
            this.textureUsed.mipmaps = this.mipMaps;
            this.textureUsed.setMipFilter(2);
            this.mat!.setProperty('albedoMap', this.textureUsed);
            this.ready = true;
        }, 1);
    }



    checkMemory () {
        this.memeryAfter = cc.director.root.device.memoryStatus.textureSize;
        if (this.memeryAfter === this.memeryBefore) {
            this.showTip!.string = 'Memory Check Pass!';
        } else {
            this.showTip!.string = 'Memory Check Fail!';
            this.showTip!.color = Color.RED;
        }
        this.allDone = true;
    }

    update (deltaTime: number) {
        if (this.allDone || !this.ready) {
            return;
        }
        if (!this.textureUsed) {
            this.checkMemory();
            return;
        }
        if (this.moveCount >= 2) {
            this.textureUsed?.destroy();
            this.textureUsed = null;
            return;
        }
        if (this.currY > this.yMax) {
            this.cameraSpeed = -this.cameraSpeed;
        } else if (this.currY < this.yMin) {
            this.cameraSpeed = -this.cameraSpeed;
            this.moveCount++;
        }
        this.currY += this.cameraSpeed;
        this.cameraNode!.setPosition(0, this.currY, 0);
    }
}
