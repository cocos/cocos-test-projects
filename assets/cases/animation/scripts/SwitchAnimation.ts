import { _decorator, Component, Animation, Slider } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SwitchAnimation")
export class SwitchAnimation extends Component {

    private num = 0;
    private animationComponent!: Animation;
    private _duration = 0.3;

    @property
    public minDuration = 0.0;

    @property
    public maxDuration = 1.0;

    switch(){
        if(this.num == 0){
            this.animationComponent.crossFade("Walk", this._duration);
        }
        if(this.num == 1){
            this.animationComponent.crossFade("Run", this._duration);
        }
        if(this.num == 2){
            this.animationComponent.crossFade("Idle", this._duration);
            this.num = -1;
        }
        this.num ++;
    }

    onDurationEditBoxChange(slider: Slider) {
        this._duration = (this.maxDuration - this.minDuration) * slider.progress;
    }

    start () {
        this.animationComponent = this.node.getComponent(Animation)!;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
