import { _decorator, Component, Vec3} from "cc";
const { ccclass, property } = _decorator;

@ccclass("newScript")
export class newScript extends Component {

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
        if(deltaTime > 1) {
            // hack for first frame
            deltaTime = 1;
        }
        if(this.timer) {
            this._y += 1*deltaTime;
        }
        if(this.timer==false){
            this._y -= 1*deltaTime;
        }
    }
}
