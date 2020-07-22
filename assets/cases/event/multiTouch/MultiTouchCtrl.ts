import { _decorator, Component, systemEvent, SystemEventType, EventTouch, ToggleComponent, Node, macro } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MultiTouchCtrl")
export class MultiTouchCtrl extends Component {

    @property(ToggleComponent)
    toggle: ToggleComponent = null;

    @property(Node)
    target: Node = null;

    start () {
        systemEvent.on(SystemEventType.TOUCH_MOVE,this.onTouchMove, this);
        this.changeMulit();
    }

    onDestroy () {
        systemEvent.off(SystemEventType.TOUCH_MOVE,this.onTouchMove, this);
    }

    changeMulit () {
        if (this.toggle.isChecked) {
            macro.ENABLE_MULTI_TOUCH = true;
        } else {
            macro.ENABLE_MULTI_TOUCH = false;
        }
    }

    onTouchMove (touch: Touch, event: EventTouch) {
        const touches = event.getTouches();
        if (macro.ENABLE_MULTI_TOUCH && touches.length > 1) {
            const touch1 = touches[0];
            const touch2 = touches[1];
            const delta1 = touch1.getDelta();
            const delta2 = touch2.getDelta();
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
