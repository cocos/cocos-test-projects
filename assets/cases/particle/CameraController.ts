import { _decorator, Component, Node, math, Vec3, Quat, Event } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CameraController")
export class CameraController extends Component {

    @property
    public translateDelta = 1;

    @property
    public rotateDelta = 5;

    private _rotateDelta = 0;

    private _temp_vec3: Vec3 = new Vec3();
    private _temp_quat: Quat = new Quat();
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
        this._rotateDelta = math.toRadian(this.rotateDelta);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    translate (leftRight, backForth, dt) {
        Vec3.set(this._temp_vec3, leftRight * this.translateDelta * dt, 0, backForth * this.translateDelta * dt);
        this.node.translate(this._temp_vec3);
    }

    rotate (longitudinal, perpendicular, dt) {
        Quat.fromEuler(this._temp_quat, perpendicular * this.rotateDelta * dt, longitudinal * this.rotateDelta * dt, 0);
        this.node.rotate(this._temp_quat);
    }

    onPushJoystick (dt: number, customEventData: string) {
        switch (customEventData) {
            case 'F':
                this.translate(0, -1, dt);
                break;
            case 'B':
                this.translate(0, 1, dt);
                break;
            case 'L':
                this.translate(-1, 0, dt);
                break;
            case 'R':
                this.translate(1, 0, dt);
                break;
            case 'U':
                this.rotate(0, 1, dt);
                break;
            case 'D':
                this.rotate(0, -1, dt);
                break;
            case 'RL':
                this.rotate(1, 0, dt);
                break;
            case 'RR':
                this.rotate(-1, 0, dt);
                break;
        }
    }
}
