
import { _decorator, Component, Node, EventMouse, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PointerSwallow
 * DateTime = Thu Nov 04 2021 17:02:41 GMT+0800 (中国标准时间)
 * Author = unbrella_man
 * FileBasename = pointer-swallow.ts
 * FileBasenameNoExtension = pointer-swallow
 * URL = db://assets/cases/event/system-event/pointer-swallow.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
 @ccclass('DontBeSwallowed')
 export class DontBeSwallowed extends Component {
     onLoad () {
         this.node.on(Node.EventType.MOUSE_DOWN, this.dontBeSwallowed, this);
         this.node.on(Node.EventType.MOUSE_MOVE, this.dontBeSwallowed, this);
         this.node.on(Node.EventType.MOUSE_UP, this.dontBeSwallowed, this);
         this.node.on(Node.EventType.MOUSE_UP, this.dontBeSwallowed, this);
         this.node.on(Node.EventType.MOUSE_WHEEL, this.dontBeSwallowed, this);
         this.node.on(Node.EventType.TOUCH_START, this.dontBeSwallowed, this);
         this.node.on(Node.EventType.TOUCH_MOVE, this.dontBeSwallowed, this);
         this.node.on(Node.EventType.TOUCH_END, this.dontBeSwallowed, this);
         this.node.on(Node.EventType.TOUCH_CANCEL, this.dontBeSwallowed, this);
     }
 
     onDestroy () {
         this.node.off(Node.EventType.MOUSE_DOWN, this.dontBeSwallowed, this);
         this.node.off(Node.EventType.MOUSE_MOVE, this.dontBeSwallowed, this);
         this.node.off(Node.EventType.MOUSE_UP, this.dontBeSwallowed, this);
         this.node.off(Node.EventType.MOUSE_UP, this.dontBeSwallowed, this);
         this.node.off(Node.EventType.MOUSE_WHEEL, this.dontBeSwallowed, this);
         this.node.off(Node.EventType.TOUCH_START, this.dontBeSwallowed, this);
         this.node.off(Node.EventType.TOUCH_MOVE, this.dontBeSwallowed, this);
         this.node.off(Node.EventType.TOUCH_END, this.dontBeSwallowed, this);
         this.node.off(Node.EventType.TOUCH_CANCEL, this.dontBeSwallowed, this);
     }
 
     dontBeSwallowed (event: EventMouse | EventTouch) {
         event.swallowEvent = false;
     }
 }

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
