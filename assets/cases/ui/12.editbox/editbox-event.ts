import { _decorator, Component, Label, EditBox } from "cc";
const { ccclass, property, menu} = _decorator;

@ccclass("EditboxEvent")
@menu('UI/EditboxEvent')
export class EditboxEvent extends Component {
    @property(Label)
    public showLabel: Label = null!;

    private _isReturn = false;

    start () {
        // Your initialization goes here.
    }

    editBegan(event: EditBox, custom: string){
        this.showLabel.string = custom;
        this._isReturn = false;
    }

    editEnd(event: EditBox, custom: string) {
        if(this._isReturn){
            return;
        }

        this.showLabel.string = custom;
    }

    editReturn(event: EditBox, custom: string){
        this.showLabel.string = custom;
        this._isReturn = true;
    }

    editInputing(input: string, event: EditBox, custom: string){
        this.showLabel.string = `${custom}: ${input}`;
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
