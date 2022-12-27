import {  EventTouch, Touch, Input, BaseNode } from 'cc';

//模拟触摸开始
export function simulateTouchStart(x:number, y:number,node?:BaseNode){
    let changeTouch=[]
    let touch = new Touch(x, y);
    changeTouch.push(touch)
    let event = new EventTouch(changeTouch, true, Input.EventType.TOUCH_START, changeTouch);
    event.touch = touch;
    node!.dispatchEvent(event);
}

//模拟结束
export function simulateTouchEnd(node?:BaseNode){
    let event = new EventTouch([], true, Input.EventType.TOUCH_END, []);
    node!.dispatchEvent(event);
}