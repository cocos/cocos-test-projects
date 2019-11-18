import { _decorator, Component, Node, systemEvent, SystemEventType, AnimationComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SwitchAnimation")
export class SwitchAnimation extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    private num = 0;
    private animationComponent

    switch(){
        if(this.num == 0){
            this.animationComponent.play("Walk");
        }
        if(this.num == 1){
            this.animationComponent.play("Run");
        }
        if(this.num == 2){
            this.animationComponent.play("Idle");
            this.num = -1;
        }
        this.num ++;
    }
    start () {
        this.animationComponent = this.node.getComponent(AnimationComponent);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
