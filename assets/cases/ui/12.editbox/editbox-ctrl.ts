import { _decorator, Component, Node, EditBox } from "cc";
const { ccclass, property, menu } = _decorator;

@ccclass("EditboxCtrl")
@menu('UI/EditboxCtrl')
export class EditboxCtrl extends Component {

    @property(EditBox)
    public editBox1: EditBox = null!;
    @property(EditBox)
    public editBox2: EditBox = null!;
    @property(EditBox)
    public editBox3: EditBox = null!;

    start () {
        // Your initialization goes here.
    }

    setFocus (event: EditBox, custom: string) {
        if(custom === '1'){
            this.editBox1.setFocus();
        } else if (custom === '2') {
            this.editBox1.setFocus();
        } else if (custom === '3') {
            this.editBox3.setFocus();
        }
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
