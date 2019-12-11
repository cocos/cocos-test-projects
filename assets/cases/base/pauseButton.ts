import { _decorator, Component, Node, game, LabelComponent, systemEvent, SystemEvent, macro } from "cc";
const { ccclass, property } = _decorator;

@ccclass("button")
export class button extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    @property({
        type: LabelComponent,
    })
    Label = null;
    private timer =false;
    start () {  
        // Your initialization goes here.
    }

    onPause () {
        this.timer=true;
    }
    onResume () {
        this.timer = false
        this.Label.node.active = false;
        game.resume();
    }
    update (deltaTime: number) {
        if (this.timer) {
            this.Label.node.active = true;
            game.pause();
        }
    }
}
