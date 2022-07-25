import { _decorator, Component, Node, input, Input, Label, Touch, EventMouse, view, EventTouch } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("EventInfo")
@menu('Event/EventInfo')
export class EventInfo extends Component {
    @property(Label)
    public label: Label = null!;
    @property(Label)
    public top: Label = null!;

    start () {
        this.top.string = `屏幕尺寸: ${view.getCanvasSize()} \n UI 尺寸: ${view.getVisibleSize()}`;

        input.on(Input.EventType.TOUCH_START, this._touchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this._touchMove, this);
        input.on(Input.EventType.TOUCH_END, this._touchEnd, this);

        input.on(Input.EventType.MOUSE_MOVE, this._mouseMove, this);
        input.on(Input.EventType.MOUSE_UP, this._mouseUp, this);
    }

    onDestroy(){
        input.off(Input.EventType.TOUCH_START, this._touchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this._touchMove, this);
        input.off(Input.EventType.TOUCH_END, this._touchEnd, this);

        input.off(Input.EventType.MOUSE_MOVE, this._mouseMove, this);
        input.off(Input.EventType.MOUSE_UP, this._mouseUp, this);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
    _touchStart(event: EventTouch) {
        const touch = event.touch!;
        let content = `touch startLocation:  ${touch.getStartLocation()} \n`;
        content += `UI touch startLocation:  ${touch.getUIStartLocation()} \n`
        this.label.string = content;
    }

    _touchMove(event: EventTouch){
        const touch = event.touch!;
        let content = '';
        content += 'touch pre location: ' + touch.getPreviousLocation() + '\n';
        content += 'touch location: ' + touch.getLocation() + '\n';
        content += 'touch delta: ' + touch.getDelta() + '\n';
        content += 'touch location in view: ' + touch.getLocationInView() + '\n';
        content += 'UI touch pre location: ' + touch.getUIPreviousLocation() + '\n';
        content += 'UI touch location: ' + touch.getUILocation() + '\n';
        content += 'UI touch delta: ' + touch.getUIDelta() + '\n';
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
