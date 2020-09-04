import { _decorator, Component, Node, Vec3, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('sport_light_1')
export class sport_light_1 extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    private _nowA = new Vec3();
    private _time = 0;

    start () {
        // Your initialization goes here.
        this._nowA = this.node.eulerAngles;
    }

     update (deltaTime: number) {
        // Your update function goes here.
        this._time +=0.01;
        this._nowA.x = ((Math.sin(this._time) + 1.0) * 0.5) * -90.0; 
        this.node.setRotationFromEuler(this._nowA.x, this._nowA.y, this._nowA.z);
     }
}
