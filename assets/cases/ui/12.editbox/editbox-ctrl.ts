import { _decorator, Component, Node, EditBox, screen, macro } from "cc";
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
        screen.on("orientation-change", (orientation) => {
            if (orientation === macro.ORIENTATION_LANDSCAPE_LEFT || orientation === macro.ORIENTATION_LANDSCAPE_RIGHT) {
                console.log("orientation-change landscape", orientation);
            } else {
                console.log("orientation-change portrait", orientation);
            }
        });
    }

    setFocus (event: EditBox, custom: string) {
        if(custom === '1'){
            this.editBox1.setFocus();
        } else if (custom === '2') {
            this.editBox2.setFocus();
        } else if (custom === '3') {
            this.editBox3.setFocus();
        }
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
