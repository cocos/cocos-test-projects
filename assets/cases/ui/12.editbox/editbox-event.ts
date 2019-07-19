import { _decorator, Component, LabelComponent, EditBoxComponent } from "cc";
const { ccclass, property, menu} = _decorator;

@ccclass("EditboxEvent")
@menu('UI/EditboxEvent')
export class EditboxEvent extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(LabelComponent)
    showLabel = null;

    _isReturn = false;

    start () {
        // Your initialization goes here.
    }

    editBegan(event, custom){
        this.showLabel.string = custom;
        this._isReturn = false;
    }

    editEnd(event, custom) {
        if(this._isReturn){
            return;
        }

        this.showLabel.string = custom;
    }

    editReturn(event, custom){
        this.showLabel.string = custom;
        this._isReturn = true;
    }

    editInputing(input, event, custom){
        this.showLabel.string = `${custom}: ${input}`;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
