import { _decorator, Component, Node, SpriteComponent, ProgressBarComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("progress")
export class progress extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property({type:ProgressBarComponent})
    sprite=null;

    @property({type:ProgressBarComponent})
    ProgressBar=null;

    @property({type:ProgressBarComponent})
    reProgressBar=null;

    private timer=0;

    start () {
        // Your initialization goes here.
    }

    pro(num:number){
        this.sprite.getComponent(ProgressBarComponent).progress=num;
        this.ProgressBar.getComponent(ProgressBarComponent).progress=num;
        this.reProgressBar.getComponent(ProgressBarComponent).progress=num;
    }

    update (deltaTime: number) {
        this.timer += 0.1*deltaTime;
        if(this.timer>1){
            this.timer=0;
        }

        this.pro(this.timer);
    }
}
