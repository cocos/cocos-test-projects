
import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('KeyboardEvent')
export class KeyboardEvent extends Component {
    onLoad () {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyboardDown, this);
    }

    onDestroy () {
        systemEvent.off(SystemEventType.KEYBOARD_DOWN, this.onKeyboardDown, this);
    }
    
    onKeyboardDown (event: EventKeyboard) {
        console.log('down', event.keyCode);
        let a = this.getChildRecursively(this.node, event.keyCode.toString());
        console.log('pptest', a);

        if (a) {
            a.active = true;
            this.scheduleOnce(() => {
                if (a) {
                    a.active = false;
                }
            }, 0.2);
        }
    }

    getChildRecursively (currentNode: Node, name: string): Node | null {
        let childs = currentNode.children;
        for (let child of childs) {
            if (child.name === name) {
                return child;
            } else {
                let result = this.getChildRecursively(child, name);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
