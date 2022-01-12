
import { _decorator, Component, Node, Sprite, Color, Label, input, Input, director, game } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = event_order
 * DateTime = Wed Jan 12 2022 16:55:04 GMT+0800 (中国标准时间)
 * Author = unbrella_man
 * FileBasename = event-order.ts
 * FileBasenameNoExtension = event-order
 * URL = db://assets/cases/event/system-event/event-order.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('event_order')
export class event_order extends Component {
    
    @property(Node)
    btn1!: Node;
    
    @property(Node)
    btn2!: Node;

    @property(Label)
    tip!: Label;

    onLoad () {
        this.btn1.on(Node.EventType.TOUCH_START, this.touchBtn1, this);
        this.btn2.on(Node.EventType.TOUCH_START, this.touchBtn2, this);
        input.on(Input.EventType.TOUCH_START, this.inputTouch, this);
    }

    onDestroy () {
        this.btn1.off(Node.EventType.TOUCH_START, this.touchBtn1, this);
        this.btn2.off(Node.EventType.TOUCH_START, this.touchBtn2, this);
        input.off(Input.EventType.TOUCH_START, this.inputTouch, this);
    }

    inputTouch () {
        this.tip.string = '全局触摸事件';
    }
    
    touchBtn1 () {
        this.btn2.active = true;
        this.tip.string = '绿色节点事件';
    }

    touchBtn2 () {
        this.tip.string = '红色节点事件';
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
