import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ShowTips")
export class ShowTips extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    private tips=null;
    private ifshow=true;

    showtip(){
        if(this.ifshow==false){
            this.tips.setPosition(0,1000,0);
        }
        if(this.ifshow){
            this.tips.setPosition(0,0,0);
        }
        this.ifshow=!this.ifshow;
    }

    start () {
        // Your initialization goes here.
        this.tips = this.node.getChildByName('tips');
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
