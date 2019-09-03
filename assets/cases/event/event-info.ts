import { _decorator, Component, Node, systemEvent, SystemEventType, LabelComponent, Touch, EventMouse } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("EventInfo")
@menu('Event/EventInfo')
export class EventInfo extends Component {
    @property(LabelComponent)
    label: LabelComponent = null;
    @property(LabelComponent)
    top: LabelComponent = null;

    start () {
        this.top.string = `屏幕尺寸: ${cc.view.getCanvasSize()} \n UI 尺寸: ${cc.view.getVisibleSize()}`;

        systemEvent.on(SystemEventType.TOUCH_START, this._touchStart, this);
        systemEvent.on(SystemEventType.TOUCH_MOVE, this._touchMove, this);
        systemEvent.on(SystemEventType.TOUCH_END, this._touchEnd, this);

        systemEvent.on(SystemEventType.MOUSE_MOVE, this._mouseMove, this);
        systemEvent.on(SystemEventType.MOUSE_UP, this._mouseUp, this);
    }

    onDestroy(){
        systemEvent.off(SystemEventType.TOUCH_START, this._touchStart, this);
        systemEvent.off(SystemEventType.TOUCH_MOVE, this._touchMove, this);
        systemEvent.off(SystemEventType.TOUCH_END, this._touchEnd, this);

        systemEvent.off(SystemEventType.MOUSE_MOVE, this._mouseMove, this);
        systemEvent.off(SystemEventType.MOUSE_UP, this._mouseUp, this);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
    _touchStart(touch: Touch) {
        let content = `touch startLocation:  ${touch.getStartLocation()} \n`;
        content += `UI touch startLocation:  ${touch.getUIStartLocation()} \n`
        this.label.string = content;
    }

    _touchMove(event: Touch){
        let content = '';
        content += 'touch pre location: ' + event.getPreviousLocation() + '\n';
        content += 'touch location: ' + event.getLocation() + '\n';
        content += 'touch delta: ' + event.getDelta() + '\n';
        content += 'touch location in view: ' + event.getLocationInView() + '\n';
        content += 'UI touch pre location: ' + event.getUIPreviousLocation() + '\n';
        content += 'UI touch location: ' + event.getUILocation() + '\n';
        content += 'UI touch delta: ' + event.getUIDelta() + '\n';
        this.label.string = content;
    }

    _touchEnd(){
        this.label.string = 'End';
    }

    _mouseMove(event: EventMouse){
        let content = '';
        content += 'mouse pre location: ' + event.getPreviousLocation() + '\n';
        content += 'mouse location: ' + event.getLocation() + '\n';
        content += 'mouse delta: ' + event.getDelta() + '\n';
        content += 'mouse location in view: ' + event.getLocationInView() + '\n';
        content += 'UI mouse pre location: ' + event.getUIPreviousLocation() + '\n';
        content += 'UI mouse location: ' + event.getUILocation() + '\n';
        content += 'UI mouse delta: ' + event.getUIDelta() + '\n';
        this.label.string = content;
    }

    _mouseUp() {
        this.label.string = 'End';
    }
}
