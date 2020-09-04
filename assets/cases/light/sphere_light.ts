import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('typescript')
export class typescript extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    private _nowP = new Vec3(0.0, 0.0, 0.0);
    private _startP = 0.0;
    private _low = 2.0;
    private _height = 3.51;
    private _time = 0;

    start () {
        // Your initialization goes here.
        this._nowP = this.node.position;
        this._startP = Math.asin((this._nowP.y - this._low) / (this._height - this._low));
    }

    update (deltaTime: number) {        
        this._time +=0.01;
        this._nowP.y = ((Math.sin(this._time - this._startP) + 1.0) * 2.0) * (this._height - this._low) + this._low ;
        this.node.setPosition(this._nowP); 
    }
}
