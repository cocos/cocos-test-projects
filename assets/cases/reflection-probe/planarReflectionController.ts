import { _decorator, Component, Quat} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('cameraController')
export class planarReflectionController extends Component {
 
    private _quat: Quat = new Quat();//爱心旋转
    start() {
    }
    update(deltaTime: number) {
        Quat.fromEuler(this._quat, 0, 60 * deltaTime, 0);
        this.node.rotate(this._quat);
    }
}

