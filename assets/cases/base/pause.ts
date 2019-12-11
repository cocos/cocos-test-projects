import { _decorator, Component, Vec3} from "cc";
const { ccclass, property } = _decorator;

@ccclass("newScript")
export class newScript extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    private timer = false;
    private _y = 0;
    start () {
        this._y = this.node.position.y;
    }

    update (deltaTime: number) {
        this.node.position = new Vec3(this.node.position.x,this._y,this.node.position.z);
        if(this._y <= 0){
            this.timer=true;
        }
        if(this._y >= 2) {
            this.timer=false;
        }
        if(this.timer) {
            this._y += 1*deltaTime;
        }
        if(this.timer==false){
            this._y -= 1*deltaTime;
        }
    }
}
