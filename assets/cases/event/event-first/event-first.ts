import { _decorator, Component, Node, instantiate, SystemEventType, EventTouch, Prefab, LabelComponent, ButtonComponent } from 'cc';
import { button } from '../../base/pauseButton';
const { ccclass, property } = _decorator;

@ccclass('eventFirst')
export class eventFirst extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    @property({
        type: Prefab,
    })
    prefabNode = null;

    @property({
        type:LabelComponent
    })
    labelShow: LabelComponent = null;

    @property({
        type: ButtonComponent,
    })
    button: ButtonComponent = null;

    // @property({
    //     type: Node,
    // })
    item : Node = null;

    onLoad () {
        this.item = instantiate(this.prefabNode);
    }

    start () {
        // Your initialization goes here.
    }

    onEnable() {
        this.eventOn();
    }

    eventOn() {
        this.item.on(SystemEventType.TOUCH_START, this.onTouchStart, this);
        this.item.on(SystemEventType.TOUCH_END, this.onTouchEnd, this);
        this.item.on(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
        this.item.on(SystemEventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }

    onDisable() {
        this.item.off(SystemEventType.TOUCH_START, this.onTouchStart, this);
        this.item.off(SystemEventType.TOUCH_END, this.onTouchEnd, this);
        this.item.off(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
        this.item.off(SystemEventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onTouchStart(event: EventTouch){
        this.labelShow.string = `TouchStart: ${event.getLocation()}`;
        console.log(`TouchStart: ${event.getLocation()}`);
    }

    onTouchMove(event: EventTouch){
        this.labelShow.string = `TouchMove: ${event.getLocation()}`;
        console.log(`TouchMove: ${event.getLocation()}`);
    }

    onTouchEnd(event: EventTouch){
        this.labelShow.string = 'TouchEnd';
        console.log('TouchEnd');
    }

    onTouchCancel(event: EventTouch){
        this.labelShow.string = 'TouchCancel';
        console.log('TouchCancel');
    }

    createChild() {
        this.node.addChild(this.item);
        this.button.node.active = false;
    }
}
