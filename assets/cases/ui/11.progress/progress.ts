import { _decorator, Component, Node, Sprite, ProgressBar } from "cc";
const { ccclass, property } = _decorator;

@ccclass("progress")
export class progress extends Component {

    @property({type:ProgressBar})
    public sprite: ProgressBar = null!;

    @property({ type: ProgressBar })
    public ProgressBar: ProgressBar = null!;

    @property({ type: ProgressBar })
    public reProgressBar: ProgressBar = null!;

    private timer = 0;

    start () {
        // Your initialization goes here.
    }

    pro(num:number){
        this.sprite.getComponent(ProgressBar)!.progress = num;
        this.ProgressBar.getComponent(ProgressBar)!.progress = num;
        this.reProgressBar.getComponent(ProgressBar)!.progress = num;
    }

    update (deltaTime: number) {
        this.timer += 0.1 * deltaTime;
        if (this.timer > 1) {
            this.timer = 0;
        }

        this.pro(this.timer);
    }
}
