import { EventTouch, Touch, Input, Node, EventMouse, NodeEventType, SystemEvent, SystemEventType, Toggle, EventHandler, Slider, Button } from 'cc';

//模拟触摸开始
export function simulateTouchStart(x: number, y: number, node?: Node) {
    const changedTouches: Touch[] = [];
    let event = new EventTouch(changedTouches, true, Input.EventType.TOUCH_START, changedTouches);
    event.touch = new Touch(x, y, 0);
    if (node) {
        event.target = event.currentTarget = node;
        changedTouches.push(event.touch);
        node!.dispatchEvent(event);
    }
    return event;
}

//双指触摸
export function simulateMultiTouch(startX: number, startY: number, moveX: number, moveY: number) {
    let changeTouch: Touch[] = [];
    let startTouch = new Touch(startX, startY);
    changeTouch.push(startTouch);
    let moveTouch = new Touch(moveX, moveY);
    changeTouch.push(moveTouch);
    let event = new EventTouch(changeTouch, true, Input.EventType.TOUCH_START, changeTouch);
    if (!event.touch) {
        event.touch = moveTouch;
    };
    return event;
}


//模拟移动
export function simulateTouchMove(node?: Node, x: number = 0, y: number = 0) {
    const changedTouches: Touch[] = [];
    let event = new EventTouch(changedTouches, true, Input.EventType.TOUCH_MOVE, []);
    event.touch = new Touch(x, y, 0);
    if (node) {
        event.target = event.currentTarget = node;
        changedTouches.push(event.touch);
        node!.dispatchEvent(event);
    }
    return event;
}

//模拟结束
export function simulateTouchEnd(node?: Node, x: number = 0, y: number = 0) {
    const changedTouches: Touch[] = [];
    let event = new EventTouch(changedTouches, true, Input.EventType.TOUCH_END, []);
    event.touch = new Touch(x, y, 0);
    if (node) {
        event.target = event.currentTarget = node;
        changedTouches.push(event.touch);
        node!.dispatchEvent(event);
    }
    return event;
}

//鼠标事件
export function simulateMouseEvent(eventType: SystemEventType | NodeEventType, x: number, y: number) {
    const event = new EventMouse(eventType, false);
    event.setLocation(x, y);
    return event;
}


export module UISimulate {
    export function clickButton(button: Button) {
        EventHandler.emitEvents(button.clickEvents, button);
        button.node.emit(Button.EventType.CLICK, button);
    }

    export function changeToggle(toggle: Toggle, isChecked?: boolean ) {
        toggle.isChecked = (isChecked === undefined) ? !toggle.isChecked : isChecked;
        EventHandler.emitEvents(toggle.checkEvents, toggle);
        toggle.node.emit(Toggle.EventType.TOGGLE, toggle);
    }

    export function changeSlider(slider: Slider, progress: number ) {
        slider.progress = progress;
        EventHandler.emitEvents(slider.slideEvents, slider);
        slider.node.emit('slide', slider);
    }
}