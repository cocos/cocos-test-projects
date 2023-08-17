import { _decorator, Camera, Component, HALF_PI, math, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('camera_ctl')
export class camera_ctl extends Component {

    @property(Camera)
    camera: Camera | null = null;

    time = 0;

    static factor = Math.PI / 6.0;

    start() {
        this.time = 0;
    }

    update(deltaTime: number) {
        this.time += deltaTime;
        if (this.camera) {
            this.camera.node.setPosition(0, 0, Math.cos(this.time * camera_ctl.factor - HALF_PI) * 10);
        }
        this.time = math.repeat(this.time, camera_ctl.factor);
    }
}


