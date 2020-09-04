import { _decorator, Component, systemEvent, SystemEventType, EventTouch, ToggleComponent, Node, macro, Touch, Vec2 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MultiTouchCtrl")
export class MultiTouchCtrl extends Component {

    @property(ToggleComponent)
    toggle: ToggleComponent = null;

    @property(Node)
    target: Node = null;

    start () {
        systemEvent.on(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
        this.changeMulti();
    }

    onDestroy () {
        systemEvent.off(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    changeMulti () {
        if (this.toggle.isChecked) {
            macro.ENABLE_MULTI_TOUCH = true;
        } else {
            macro.ENABLE_MULTI_TOUCH = false;
        }
    }

    onTouchMove (touch: Touch, event: EventTouch) {
        const touches = event.getAllTouches();
        const changedTouches = event.getTouches();
        if (macro.ENABLE_MULTI_TOUCH && touches.length > 1) {
            let touch1: Touch = null;
            let touch2: Touch = null;
            const delta2 = new Vec2();
            if (changedTouches.length > 1) {
                touch1 = touches[0];
                touch2 = touches[1];
                touch2.getDelta(delta2);

            } else {
                touch1 = touch;
                const diffID = touch1.getID();
                let str = '';
                for (let i = 0; i < touches.length; i++) {
                    const element = touches[i];
                    str += `${element.getID()} - `;
                    if (element.getID() !== diffID){
                        touch2 = element;
                        break;
                    }
                }
            }


            const delta1 = touch1.getDelta();
            const touchPoint1 = touch1.getLocation();
            const touchPoint2 = touch2.getLocation();
            const distance = touchPoint1.subtract(touchPoint2);
            const delta = delta1.subtract(delta2);
            if (Math.abs(distance.x) > Math.abs(distance.y)) {
                this.target.setScale((distance.x + delta.x) / distance.x * this.target.getScale().x, this.target.getScale().y, 1);
            }
            else {
                this.target.setScale(this.target.getScale().x, (distance.y + delta.y) / distance.y * this.target.getScale().y, 1);
            }
        }
    }
}
