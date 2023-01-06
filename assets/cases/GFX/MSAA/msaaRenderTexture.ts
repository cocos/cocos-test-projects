import { _decorator, Component, Node, RenderTexture, CameraComponent, Camera, gfx, Renderer } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {

    @property(RenderTexture)
    qualityRT: RenderTexture = null!;

    @property(RenderTexture)
    balanceRT: RenderTexture = null!;

    @property(RenderTexture)
    peformanceRT: RenderTexture = null!;

    @property(RenderTexture)
    rawRT: RenderTexture = null!;

    @property(Camera)
    qualityCam: Camera = null!;

    @property(Camera)
    balanceCam: Camera = null!;

    @property(Camera)
    peformanceCam: Camera = null!;

    @property(Camera)
    rawCam: Camera = null!;

    start () {
        if (gfx.deviceManager.gfxDevice.gfxAPI === gfx.API.WEBGL) {
            console.log("This scene is not supported on WebGL, All camera fallback to non-MSAA.");
        }

        this.qualityRT.reset({
            name: 'quality',
            width: this.qualityRT.width,
            height: this.qualityRT.height,
            sampleCount: gfx.SampleCount.MULTIPLE_QUALITY
        });
        this.qualityRT.window!.attachCamera(this.qualityCam.camera);

        this.balanceRT.reset({
            name: 'balance',
            width: this.balanceRT.width,
            height: this.balanceRT.height,
            sampleCount: gfx.SampleCount.MULTIPLE_BALANCE
        });
        this.balanceRT.window!.attachCamera(this.balanceCam.camera);

        this.peformanceRT.reset({
            name: 'performance',
            width: this.peformanceRT.width,
            height: this.peformanceRT.height,
            sampleCount: gfx.SampleCount.MULTIPLE_PERFORMANCE
        });
        this.peformanceRT.window!.attachCamera(this.peformanceCam.camera);

        this.rawRT.reset({
            name: 'raw',
            width: this.rawRT.width,
            height: this.rawRT.height,
            sampleCount: gfx.SampleCount.ONE
        });
        this.rawRT.window!.attachCamera(this.rawCam.camera);
    }

    update (deltaTime: number) {

    }
}


