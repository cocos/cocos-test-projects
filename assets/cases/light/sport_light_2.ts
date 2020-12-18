import { _decorator, Component, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('sport_light_2')
export class sport_light_1 extends Component {
    private _nowA = new Vec3();
    private _time = 0;

    start () {
        // Your initialization goes here.
        this._nowA = this.node.eulerAngles;
    }

     update (deltaTime: number) {
        // Your update function goes here.
        this._time += 0.01;
        this._nowA.x = ((Math.cos(this._time) + 1.0) * 0.5) * -90.0 - 90.0;
        this.node.setRotationFromEuler(this._nowA.x, this._nowA.y, this._nowA.z);
     }
}
