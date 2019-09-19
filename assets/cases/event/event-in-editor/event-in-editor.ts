import { _decorator, Component, Node, LabelComponent, SystemEventType } from "cc";
const { ccclass, property, menu, executeInEditMode } = _decorator;

@ccclass("EventInEditor")
@menu('Event/EventInEditor')
@executeInEditMode
export class EventInEditor extends Component {
    @property(LabelComponent)
    label: LabelComponent = null;

    onEnable () {
        this.node.on(Node.EventType.CHILD_ADDED, this._chidlAdd, this);
        this.node.on(Node.EventType.CHILD_REMOVED, this._chidlRemove, this);

        this.node.on(Node.EventType.TRANSFORM_CHANGED, this._transformChanged, this);
        this.node.on(Node.EventType.ANCHOR_CHANGED, this._anchorChanged, this);
        this.node.on(Node.EventType.SIZE_CHANGED, this._sizeChanged, this);
    }

    onDisable(){
        this.node.off(Node.EventType.CHILD_ADDED, this._chidlAdd, this);
        this.node.off(Node.EventType.CHILD_REMOVED, this._chidlRemove, this);

        this.node.off(Node.EventType.TRANSFORM_CHANGED, this._transformChanged, this);
        this.node.off(Node.EventType.ANCHOR_CHANGED, this._anchorChanged, this);
        this.node.off(Node.EventType.SIZE_CHANGED, this._sizeChanged, this);
    }

    _chidlAdd(event){
        this.label.string = 'child-add';
    }

    _chidlRemove(event) {
        this.label.string = 'child-remove';
    }

    _transformChanged(event) {
        this.label.string = 'transform-changed';
    }

    _anchorChanged(event) {
        this.label.string = 'anchor-changed';
    }

    _sizeChanged(event) {
        this.label.string = 'size-add';
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
