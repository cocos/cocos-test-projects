import { _decorator, Component, Node, ButtonComponent, LabelComponent, SystemEvent, SystemEventType, EventTouch, director } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("ListSetUp")
@menu("physics/ListSetUp")
export class ListSetUp extends Component {

    @property
    get SetUp () {
        return false;
    }

    set SetUp (v) {
        this.setUp();
    }

    start () {

        if (this.node.name == 'builtin') {
            if (CC_PHYSICS_CANNON || CC_PHYSICS_AMMO) {
                this.node.active = false;
            } else {
                this.setUp();
            }
        }

        if (this.node.name == 'cannon') {
            if (CC_PHYSICS_BUILTIN || CC_PHYSICS_AMMO) {
                this.node.active = false;
            } else {
                this.setUp();
            }
        }

        if (this.node.name == 'ammo') {
            if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
                this.node.active = false;
            } else {
                this.setUp();
            }
        }
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    setUp () {
        for (let i = 0; i < this.node.children.length; i++) {
            let n = this.node.children[i];
            let btnCom = n.getComponent(ButtonComponent);
            if (btnCom) {
                n.on(SystemEventType.TOUCH_START, this.onTouchStart, btnCom);
            }

            let lbCom = n.getComponentInChildren(LabelComponent);
            if (lbCom) {
                lbCom.string = n.name;
            }
        }
    }

    onTouchStart (event: EventTouch) {
        director.loadScene(this.node.name,
            () => {
                console.log("切换成功");
            }, () => {
                console.log("切换失败");
            });
    }
}
