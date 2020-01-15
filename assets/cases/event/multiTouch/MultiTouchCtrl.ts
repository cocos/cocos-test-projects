import { _decorator, Component, systemEvent, SystemEventType, EventTouch, LabelComponent, ToggleComponent, Node, macro } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MultiTouchCtrl")
export class MultiTouchCtrl extends Component {

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(LabelComponent)
    labelShow: LabelComponent = null;

    @property(ToggleComponent)
    toggle: ToggleComponent = null;

    start () {
        // Your initialization goes here.
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
        systemEvent.on(SystemEventType.TOUCH_END, this.onTouchEnd, this);
        systemEvent.on(SystemEventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onDestroy() {
        systemEvent.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
        systemEvent.off(SystemEventType.TOUCH_END, this.onTouchEnd, this);
        systemEvent.off(SystemEventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onTouchStart(touch: Touch, event: EventTouch) {
        let touches = event.getTouches();

        for(let i = 0; i < touches.length; i++ ) {
            let touch = touches[i];
            this.labelShow.string += `TouchStart: ${touch.getLocation()} \n`;
        }
    }

    onTouchEnd(touch: Touch, event: EventTouch) {
        this.labelShow.string = 'TouchEnd';
    }

    changeMulit() {
        this.labelShow.string = '';
        if (this.toggle.isChecked) {
            macro.ENABLE_MULTI_TOUCH = true;
        } else {
            macro.ENABLE_MULTI_TOUCH = false;
        }
    }
}
