import { _decorator, Component, Node, systemEvent, SystemEventType, EventKeyboard, tween, log, Color, Sprite, Toggle, SystemEvent, sys } from 'cc';
const { ccclass, property } = _decorator;

const keyCode2KeyName: Record<number, string> = {
    0: "none",
    6: "back",
    8: "backspace",
    9: "tab",
    13: "enter",
    16: "shiftLeft",
    17: "ctrlLeft",
    18: "altLeft",
    19: "pause",
    20: "capslock",
    27: "escape",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    41: "select",
    45: "insert",
    46: "Delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    96: "num0",
    97: "num1",
    98: "num2",
    99: "num3",
    100: "num4",
    101: "num5",
    102: "num6",
    103: "num7",
    104: "num8",
    105: "num9",
    106: "asterisk",
    107: "plus",
    109: "minus",
    110: "numdel",
    111: "numslash",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    144: "numlock",
    145: "scrolllock",
    186: "semicolon",
    187: "equal",
    188: "comma",
    189: "dash",
    190: "period",
    191: "forwardslash",
    192: "grave",
    219: "openbracket",
    220: "backslash",
    221: "closebracket",
    222: "quote",
    1000: "dpadLeft",
    1001: "dpadRight",
    1003: "dpadUp",
    1004: "dpadDown",
    1005: "dpadCenter",

    // supported on v3.3
    2000: "shiftRight",
    2001: "ctrlRight",
    2002: "altRight",
    2003: "numEnter",
};

@ccclass('KeyboardEvent')
export class KeyboardEvent extends Component {
    private _keyNode2TimeoutId: WeakMap<Node, number | null> = new WeakMap();
    private _keyDownEventType: any = SystemEvent.KeyboardEvent.KEY_DOWN;
    private _keyUpEventType: any = SystemEvent.KeyboardEvent.KEY_UP;

    @property(Toggle)
    public legacyEventToggle!: Toggle;

    @property(Node)
    public noSupport: Node = null!

    onLoad () {
        if (sys.platform === sys.Platform.WIN32 ||
            sys.platform === sys.Platform.MACOS ||
            sys.platform === sys.Platform.DESKTOP_BROWSER ||
            sys.platform === sys.Platform.WECHAT_GAME && !sys.isMobile) {
            this.noSupport.active = false;
        } else {
            this.noSupport.active = true;
            return;
        }
        this.legacyEventToggle.node.on(Toggle.EventType.TOGGLE, this.onToggle, this);
        this.updateEventType();
    }

    onDestroy () {
        this.legacyEventToggle.node.off(Toggle.EventType.TOGGLE, this.onToggle, this);
        systemEvent.off(this._keyDownEventType, this.onKeyboardDown, this);
        systemEvent.off(this._keyUpEventType, this.onKyeboardUp, this);
    }

    updateEventType () {
        systemEvent.off(this._keyDownEventType, this.onKeyboardDown, this);
        systemEvent.off(this._keyUpEventType, this.onKyeboardUp, this);
        if (this.legacyEventToggle.isChecked) {
            this._keyDownEventType = SystemEventType.KEY_DOWN;
            this._keyUpEventType = SystemEventType.KEY_UP;
        } else {
            this._keyDownEventType = SystemEvent.KeyboardEvent.KEY_DOWN;
            this._keyUpEventType = SystemEvent.KeyboardEvent.KEY_UP;
        }
        systemEvent.on(this._keyDownEventType, this.onKeyboardDown, this);
        systemEvent.on(this._keyUpEventType, this.onKyeboardUp, this);
    }

    onToggle (toggle: Toggle) {
        this.updateEventType();
    }
    
    onKeyboardDown (event: EventKeyboard) {
        let keyCode = event.keyCode;
        let keyName = keyCode2KeyName[keyCode];
        console.log('key down: ', keyName);
        let keyNode = this.getChildRecursively(this.node, keyName);
        if (keyNode) {
            this.showKeyNodeWithColor(keyNode, Color.RED);
        }
    }

    onKyeboardUp (event: EventKeyboard) {
        let keyCode = event.keyCode;
        let keyName = keyCode2KeyName[keyCode];
        console.log('key up: ', keyName);
        let keyNode = this.getChildRecursively(this.node, keyName);
        if (keyNode) {
            this.showKeyNodeWithColor(keyNode, Color.BLUE);
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

    showKeyNodeWithColor (node: Node, color: Color) {
        let timeoutId = this._keyNode2TimeoutId.get(node);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        node.getComponent(Sprite)!.color = color;
        node.active = true;
        timeoutId = setTimeout(() => {
            node.active = false;
        }, 200);
        this._keyNode2TimeoutId.set(node, timeoutId);
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
