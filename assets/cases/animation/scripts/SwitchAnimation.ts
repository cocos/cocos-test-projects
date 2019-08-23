import { _decorator, Component, Node, systemEvent, SystemEventType, AnimationComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SwitchAnimation")
export class SwitchAnimation extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        const animationComponent = this.node.getComponent(AnimationComponent);
        const keyToAnimationName = {
            "i": "Idle",
            "w": "Walk",
            "r": "Run",
        };
        systemEvent.on(SystemEventType.KEY_UP, (event) => {
            const { key } = event.rawEvent;
            if (key in keyToAnimationName) {
                animationComponent.play(keyToAnimationName[key]);
            }
        });
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
